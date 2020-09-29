import React, {useEffect, useState} from 'react'
import Entry from '../../entry/entry'
import AddEntry from '../../addEntry/addEntry'
import { Email as email } from '../../../helpers/classConstructors/contact'
import validate from '../../../helpers/validate'

export default function Email ({data, editMode, onChangeCallback}) {
	const [emails, setEmails] = useState(data)
	const [primary, setPrimary] = useState(-1)

	useEffect(() => {
		setEmails(data)
		setPrimary(data.findIndex(email => email.primary === true))
	}, [data])


	const addNewEntry = () => onChangeCallback('email', [...emails, new email])
	// const removeEntry = index => onChangeCallback('phone', numbers.filter((number, i) => i !== index))
	const removeEntry = index => onChangeCallback('email', emails.filter((email, i) => i !== index))


	function updateEmails(value, index, item) {
		setEmails(prevState => {
			const nextState = [...prevState]
			nextState[index][item] = value
			return nextState
		})
		onChangeCallback('email', emails)
	}

	function updatePrimary(index) {
		primary !== -1 && updateEmails(false, primary, 'primary')
		updateEmails(true, index, 'primary')
	}

	const mainInput = (i, email) => {
		return editMode
			? <input className='data' name='data' type='string' value={email} onKeyPress={validate.email} onChange={(e) => updateEmails(e.target.value, i, 'address')} placeholder='example@email.com' />
			: <div className='data'>{email}</div>
	}

	return (
		<div className='cardSection email'>
			<div className='heading'>Email
				{editMode && emails.length > 1 ? <small>Primary</small> : null}
			</div>
			{emails.map((email, index) => {
				return <Entry {...{
					key: index,
					index,
					type: 'email',
					editMode,
					options: ['home', 'work', 'other'],
					option: email.type,
					setDropdownOption: (e) => updateEmails(e.target.value, index, 'type'),
					mainInput: mainInput(index, email.address),
					hasPrimary: true,
					isPrimary: email.primary,
					changePrimary: () => updatePrimary(index),
					dataLength: data.length,
					removeEntryCallback: () => removeEntry(index)
				}}/>
			})}
			{editMode ? <AddEntry {...{addNewEntry}} /> : null}
		</div>
	)
}
