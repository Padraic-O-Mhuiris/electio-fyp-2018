import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux";

import store from "./redux/store/configureStore";

import AppContainer from './AppContainer'

import './styles/main.min.css'
import 'bulma-extensions/dist/bulma-extensions.min.css';



ReactDOM.render(
  <Provider store={store}>
    <AppContainer />    
  </Provider>,
  document.getElementById('root')
);
