import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { Toaster } from 'react-hot-toast';



ReactDOM.createRoot(document.querySelector("#app")).render(
    <Provider store={store}>
        <Toaster toastOptions={{ duration: 4000 }} />
      {/* <ShopContextProvider> */}
      <App />
      {/* </ShopContextProvider> */}
    </Provider>

)