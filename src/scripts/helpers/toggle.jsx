import React, {useState} from 'react'
import Button from '../components/button/button'
import offIcon from '../../media/icons/toggle/toggleOff.svg'
import colour25 from '../../media/icons/toggle/colour/toggle25.svg'
import colour50 from '../../media/icons/toggle/colour/toggle50.svg'
import colour75 from '../../media/icons/toggle/colour/toggle75.svg'
import colourOnIcon from '../../media/icons/toggle/greyscale/toggleOn.svg'
import grey25 from '../../media/icons/toggle/greyscale/toggle25.svg'
import grey50 from '../../media/icons/toggle/greyscale/toggle50.svg'
import grey75 from '../../media/icons/toggle/greyscale/toggle75.svg'
import greyOnIcon from '../../media/icons/toggle/greyscale/toggleOn.svg'

export default function Toggle({initialState, colour, onClickCallback}) {
	const $25 = colour ? colour25 : grey25
	const $50 = colour ? colour50 : grey50
	const $75 = colour ? colour75 : grey75
	const onIcon = colour ? colourOnIcon : greyOnIcon

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
// colour: Boolean

// Example
// <Toggle {...{initialState: isOn(sortBy), colour: false, onClickCallback: switchSortBy}} />