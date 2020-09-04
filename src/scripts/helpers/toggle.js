// import React, {useState} from 'react'
import offIcon from '../../media/icons/toggle/toggleOff.svg'
import $25 from '../../media/icons/toggle/toggle25.svg'
import $50 from '../../media/icons/toggle/toggle50.svg'
import $75 from '../../media/icons/toggle/toggle75.svg'
import onIcon from '../../media/icons/toggle/toggleOn.svg'

//  GOING TO NEED SOME SORT OF CALLBACK FUNCTION, BECAUSE INITIALLY IT NEEDS TO INITIALISE TO A CERTAIN VALUE, AND THEN IT NEEDS TO RECEIVE ONCLICK CALLBACKS FROM THE PARENT COMPONENT

// const Toggle = ({ on, setIconCallback }) => {
// 	const [icon, setIcon] = useState(on ? onIcon : offIcon)
//
// 	const toggleOn = () => {
// 		setTimeout(() => setIcon(<img src={$25} width='22px' />), 0)
// 		setTimeout(() => setIcon(<img src={$50} width='22px' />), 30)
// 		setTimeout(() => setIcon(<img src={$75} width='22px' />), 60)
// 		setTimeout(() => setIcon(<img src={onIcon} width='22px' />), 90)
// 	}
//
// 	const toggleOff = () => {
// 		setTimeout(() => setIcon(<img src={$75} width='22px' />), 0)
// 		setTimeout(() => setIcon(<img src={$50} width='22px' />), 30)
// 		setTimeout(() => setIcon(<img src={$25} width='22px' />), 60)
// 		setTimeout(() => setIcon(<img src={offIcon} width='22px' />), 90)
// 	}
//
// 	return icon
// }
//
// export default Toggle

export default function toggle(on, setIconCallback) {
	if (on) {
		setTimeout(() => setIconCallback($75), 0)
		setTimeout(() => setIconCallback($50), 30)
		setTimeout(() => setIconCallback($25), 60)
		setTimeout(() => setIconCallback(offIcon), 90)
	} else {
		setTimeout(() => setIconCallback($25), 0)
		setTimeout(() => setIconCallback($50), 30)
		setTimeout(() => setIconCallback($75), 60)
		setTimeout(() => setIconCallback(onIcon), 90)
	}
}



