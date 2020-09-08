import React from 'react'
import { render } from 'react-dom'
import 'babel-polyfill'
import stateProvider from './redux/store'
import Page from './router/navigation'
import '../styles/main.scss'
import './helpers/globalHelpers'

const root = document.getElementById('root')

render(stateProvider(<Page/>), root)

