import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import './bootstrap'

import App from './containers/App'

const rootElement = document.getElementById("root")
const render = () => ReactDOM.render( <App />, rootElement )

render();