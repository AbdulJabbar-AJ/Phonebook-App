import React from 'react'
import EntryTypeDropdown from './components/entryTypeDropdown'
import Primary from './components/primary'
import Button from '../button/button'
import remove from '../../../media/icons/remove-circle.svg'

export default function Entry(props) {
	const { type, editMode, options, option, setDropdownOption, mainInput, hasPrimary, isPrimary, changePrimary, dataLength, removeEntryCallback } = props

	return (
		<div className='entry'>
			{editMode ? <Button {...{type: 'icon', icon: remove, classname: 'removeEntry', onClickCallback: removeEntryCallback, noBg: true}} /> : null}
			<EntryTypeDropdown {...{editMode, options, value: option, onChangeCallback: setDropdownOption}} />
			{mainInput}
			{hasPrimary ? <Primary {...{name: type, dataLength, value: isPrimary, editMode, changePrimary}} /> : null}
		</div>
	)
}
