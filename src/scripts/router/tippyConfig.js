import React from 'react'
import SettingsView from '../views/sections/settingsView'
import {roundArrow} from 'tippy.js'


export default {
	content: <SettingsView/>,
	className: 'settingsTippy',
	trigger: 'click',
	arrow: roundArrow,
	interactive: true,
	animation: 'fade',
	duration: [400, 1000]
}