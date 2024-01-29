import React from "react";
import { BrowserRouter, HashRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'

const App = () => {
  return (
    <HashRouter>
        <AppRouter />
    </HashRouter>
  )
}

export default App