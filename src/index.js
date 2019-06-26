import React from 'react'
import ReactDOM from 'react-dom'
import { Game } from "./Game/Game"
import './index.css'
ReactDOM.render(<Game rows={5} cols={5}></Game>,document.querySelector('#root'));