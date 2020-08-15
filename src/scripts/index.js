import React from 'react'
import { render } from 'react-dom'
import 'babel-polyfill'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './redux/rootReducer'
import Page from './router/navigation'
import '../styles/main.scss'
import { windowResize } from './redux/actions'
// import tippyScript from './tippy.js'


const store = createStore(rootReducer)
const root = document.getElementById('root')
render(<Provider store={store}><Page/></Provider>, root)




// TODO
// Move these to helpers/tools or somewhere else
function resizeBG() {
	// image 1280 * 960 => 1280/960 = 1.33' (4:3)
	// less is wider

	if (window.innerWidth/window.innerHeight > 4/3) {
		root.style.backgroundRepeat = 'repeat-x'
		root.style.backgroundSize = 'contain'
	} else root.removeAttribute('style')
}


// CAUSING ISSUES WITH MAIN VIEW SIZE AND POSSIBLE SCOLL
// window.addEventListener('resize', () => {
// 	if (window.innerWidth < 560) {
// 		store.dispatch(windowResize('small'))
// 	} else store.dispatch(windowResize('large'))
//
// 	resizeBG()
// })

window.onload = () => {
	resizeBG()
}

// tippyScripts()
