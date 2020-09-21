import React, {useEffect, useState} from 'react'
import Entry from '../../entry/entry'
import AddEntry from '../../addEntry/addEntry'
import { email } from '../../../helpers/contacts'
import validate from '../../../helpers/validate'

export default function Email ({data, editMode, onChangeCallback}) {
	const [emails, setEmails] = useState(data)
	const [primary, setPrimary] = useState(data.findIndex(email => email.primary === true))

	useEffect(() => setEmails(data), [data])
	useEffect(() => onChangeCallback('email', emails), [emails])

	const removeEntry = index => setEmails(prevState => prevState.filter((email, i) => index !== i))
	const addNewEntry = () => setEmails(prevState => [...prevState, email])


	function updateEmails(value, index, item) {
		setEmails(prevState => {
			const updated = [...prevState]
			updated[index][item] = value
			return updated
		})
	}

	function updatePrimary(index) {
		updateEmails(false, primary, 'primary')
		setPrimary(index)
		updateEmails(true, index, 'primary')
	}

	const mainInput = (i, email) => {
		return editMode
			? <input className='data' name='data' type='string' defaultValue={email} onKeyPress={(e) => validate.email(e)} onKeyUp={(e) => updateEmails(e.target.value, i, 'address')} placeholder='example@email.com' />
			: <div className='data'>{email}</div>
	}

	return (
		<div className='cardSection email'>
			<div className='heading'>Email
				{editMode ? <small>Primary</small> : null}
			</div>
			{emails.map((email, index) => {
				return <Entry {...{
					key: index,
					index,
					type: 'email',
					editMode,
					options: ['home', 'work', 'other'],
					option: email.type,
					setDropdownOption: (event) => updateEmails(event.target.value, index, 'type'),
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