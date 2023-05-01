import React from "react";
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import Header from "./components/Header";
import { Provider } from "react-redux";
import {store} from './store'

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </BrowserRouter>
  )
}

export default App