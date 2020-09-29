import React, { useState } from 'react'
import Button from './button'
import offIcon from '../../../media/icons/toggle/toggleOff.svg'
import $25 from '../../../media/icons/toggle/toggle25.svg'
import $50 from '../../../media/icons/toggle/toggle50.svg'
import $75 from '../../../media/icons/toggle/toggle75.svg'
import onIcon from '../../../media/icons/toggle/toggleOn.svg'

export default function Toggle({initialState, onClickCallback}) {
	const [icon, setIcon] = useState(initialState ? onIcon : offIcon)
	const [on, setOn] = useState(initialState)

	function changeState(icon, on) {
		setIcon(icon)
		setOn(on)
	}

	function switchIcon() {
		onClickCallback()
		if (on) {
			setTimeout(() => changeState($75, false), 0)
			setTimeout(() => changeState($50, false), 30)
			setTimeout(() => changeState($25, false), 60)
			setTimeout(() => changeState(offIcon, false), 90)
		} else {
			setTimeout(() => changeState($25, true), 0)
			setTimeout(() => changeState($50, true), 30)
			setTimeout(() => changeState($75, true), 60)
			setTimeout(() => changeState(onIcon, true), 90)
		}
	}



	return <Button type='toggle' icon={icon} classname='toggle' onClickCallback={switchIcon} />
}

// InitialState: // OFF = false = Left // ON = true = right //

// Example
// <Toggle {...{initialState: isOn(sortBy), onClickCallback: switchSortBy}} />