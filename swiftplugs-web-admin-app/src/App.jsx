import React from 'react'
import {BrowserRouter as Router} from "react-router-dom"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AppRoutes from './AppRoutes'
import languages from "./common/languages/languages";
import { useSelector } from 'react-redux';
import isMobile from "./common/utils/isMobile";
import {selectedTheme} from "./common/customHooks/useTheme/slices/useThemeSlice";


function App() {
 const isDarkMode = useSelector(selectedTheme)

  return (
    <Router>
      <AppRoutes  languages={languages} isMobile={isMobile} isDarkMode={isDarkMode}/>
    </Router>
  )
}

export default App
