import React from 'react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/svg-arrow.css';
import 'tippy.js/dist/tippy.css';
import tippyProps from './tippyConfig'
import {ReactSVG} from 'react-svg'
import settingsIcon from '../../media/icons/settings.svg'

const SettingsTippy = () => {
	return (
		<Tippy {...{...tippyProps}} >
			<a className='navItem settings'>
				<ReactSVG src={settingsIcon} className={'navIcon'}/>
				<div className='navHeading'><li>Settings</li></div>
			</a>
		</Tippy>
	)
}

export default SettingsTippy