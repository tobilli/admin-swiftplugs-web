import { defineConfig, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react-swc'
import htmlPurge from "vite-plugin-purgecss"
import { createHtmlPlugin } from "vite-plugin-html"
import dotenv from "dotenv";

dotenv.config();
const proxy = {
  "/api": {
    target: process.env.VITE_APP_BACKEND_SERVICE_API,
    changeOrigin: true,
    secure: true,
    configure: (proxy, _options) => {
      proxy.on("error", (err, _req, _res) => { });

      proxy.on("proxyReq", async (proxyReq, _req, _res) => { });
      proxy.on("proxyRes", (proxyRes, _req, _res) => { });
    },
  },
};


const env = { "import.meta.env.PORT": JSON.stringify(process.env.PORT), }

const plugins =[{
  name: "treat-js-files-as-jsx",
  async transform(code, id){
    if(!id.match(/src\/.*\.js$/)) return null;

    return transformWithEsbuild(code, id, {
      loader: "jsx",
      jsx:"automatic",
    });
  },
},
react(),
htmlPurge(),
createHtmlPlugin({
  entry:"./src/index.js",
  template:"./index.html",
  minify: true,
  collapseWhitespace:true,
  keepClosingSlash: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
}),];



export default defineConfig({
  appType: "spa",
  define: env,
  build: {
    target: "esnext",
    outDir: "./dist",
  },
  server:{
    proxy,
    port: process.env.PORT,
    strictPort: true,
    host:'0.0.0.0'
  },
  preview:{
    proxy,
    port: process.env.PORT,
  },
  plugins,
  optimizeDeps:{
    force: true,
    esbuildOptions:{
      loader:{
        ".js":"jsx",
      },
    },
  }

})
