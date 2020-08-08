import React from 'react'
import ReactDOM from 'react-dom'
// import 'babel-polyfill' ??? Needed??
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './scripts/redux/reducers'
import View from './scripts/components/navbar'
import { windowResize } from './scripts/redux/actions'
import './main.scss'
import tippyScripts from './styles/scripts/tippy.js'

const store = createStore(rootReducer)
const root = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <View />
  </Provider>
  , root
)

window.addEventListener('resize', () => {
  if (window.innerWidth < 560) {
    store.dispatch(windowResize('small'))
  } else store.dispatch(windowResize('large'))
})

tippyScripts()


// async function runData () {
//   const response = await fetch('http://www.mocky.io/v2/581335f71000004204abaf83')
//   const result = await response.json()
//   result.contacts.forEach((item) => {
//     console.log(item)
//   })
//   console.log(result)
// }
//
// runData()
