import React from 'react'
import classNames from 'classnames'

const Button = ({type, icon, text, classname, onClickCallback, noBg, textPadding}) => {
	const btnClass = classNames({
		btn: true,
		noBg: noBg || type === 'toggle',
		[type + 'Btn']: true,
		[textPadding]: textPadding,
		[classname]: classname,
	})

	return (
		<div className={btnClass} onClick={onClickCallback} >
			{type === 'icon' || type === 'toggle' ? <img src={icon} alt=""/> : null }
			{type === 'text' ? <span className='btn-text'>{text}</span> : null }
		</div>
	)
}

export default Button



// type = toggle / text / icon

// Icon
// REQUIRED: icon (img), onClickCallback (fn)
// OPTIONAL: classname (text), noBg (bool)
// // EXAMPLE
// // <Button type='icon' classname='addContact-btn' icon={close} onClickCallback={onClickCallback} />


// Text
// REQUIRED: text (text), onClickCallback, textSidePadding (text)(wide/medium/narrow)
// OPTIONAL: classname (text), noBg (bool)
// // EXAMPLE
// // <Button type='text' text='done' textPadding='medium' onClickCallback={onClickCallback} />
// // <Button type='text' text='done' noBg={true} onClickCallback={onClickCallback} />



// Toggle
// REQUIRED: icon (image), onClickCallback (fn)
// OPTIONAL: classname (text), noBg (bool)
//
// // FUll EXAMPLE
// // import Toggle from '../helpers/toggle.js'
// //
// // INSIDE COMPONENT:
// // const [ toggleState, setToggleState ] = useState(false)
// // const [ toggleIcon, setToggleIcon ] = useState(off)
// //
// // const toggleCallback = () => {
// // 	setToggleState(!toggleState)
// // 	Toggle(toggleState, setToggleIcon)
// // }
// //
// // const toggleIcon = toggleState ? on : off
// //
// // return (
// // 	<div>
// // 		<Button type='toggle' icon={toggleIcon} onClickCallback={toggleCallback} />
// // 	</div>
// // )
