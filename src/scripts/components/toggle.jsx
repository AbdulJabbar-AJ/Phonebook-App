import React, {useState} from 'react'
import off from '../../media/icons/toggle/toggleOff.svg'
import $25 from '../../media/icons/toggle/toggle25.svg'
import $50 from '../../media/icons/toggle/toggle50.svg'
import $75 from '../../media/icons/toggle/toggle75.svg'
import on from '../../media/icons/toggle/toggleOn.svg'

//  GOING TO NEED SOME SORT OF CALLBACK FUNCTION, BECAUSE INITIALLY IT NEEDS TO INITIALISE TO A CERTAIN VALUE, AND THEN IT NEEDS TO RECEIVE ONCLICK CALLBACKS FROM THE PARENT COMPONENT

const Toggle = ({ on, size }) => {
	const [icon, setIcon] = useState(on ? on : off)

	const toggleOn = () => {
		setTimeout(() => setIcon(<img src={$25} width='22px' />), 0)
		setTimeout(() => setIcon(<img src={$50} width='22px' />), 30)
		setTimeout(() => setIcon(<img src={$75} width='22px' />), 60)
		setTimeout(() => setIcon(<img src={on} width='22px' />), 90)
	}

	const toggleOff = () => {
		setTimeout(() => setIcon(<img src={$75} width='22px' />), 0)
		setTimeout(() => setIcon(<img src={$50} width='22px' />), 30)
		setTimeout(() => setIcon(<img src={$25} width='22px' />), 60)
		setTimeout(() => setIcon(<img src={off} width='22px' />), 90)
	}

	return (<img src={icon} width='22px' >)
}

export default Toggle



