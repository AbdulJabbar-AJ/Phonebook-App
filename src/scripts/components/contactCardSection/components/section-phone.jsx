import React, {useEffect, useState} from 'react'
import Entry from '../../entry/entry'
import AddEntry from '../../addEntry/addEntry'
import { Phone as phone } from '../../../helpers/classConstructors/contact'
import validate from '../../../helpers/validate'

// NOTE: using 'value' not 'defaultValue', as the latter does not re-render on new props/state // same for name, same for notes
// This is an issue when creating a new contact, which has one phone entry by default
// Therefore, onChangeCallback called manually after specific events instead of useEffect for [numbers], to prevent infinite render loop

export default function Phone ({data, editMode, onChangeCallback}) {
	const [numbers, setNumbers] = useState([...data]) // TODO - this was [] before, does it cause any issues?
	const [primary, setPrimary] = useState(-1)

	useEffect(() => {
		setNumbers(data)
		setPrimary(data.findIndex(number => number.primary === true)) // returns -1 if none found
	}, [data])

	const addNewEntry = () => onChangeCallback('phone', [...numbers, new phone])
	const removeEntry = index => onChangeCallback('phone', numbers.filter((number, i) => i !== index))

	function updateNumbers(value, index, item) {
		setNumbers(prevState => {
			const nextState = [...prevState]
			nextState[index][item] = value
			return nextState
		})
		onChangeCallback('phone', numbers)
	}

	function updatePrimary(index) {
		primary !== -1 && updateNumbers(false, primary, 'primary')
		updateNumbers(true, index, 'primary')
	}

	const mainInput = (i, number) => {
		return editMode
			? <input className='data' name='data' type='string' value={number} onChange={(e) => updateNumbers(e.target.value, i, 'number')} onKeyPress={validate.phone} placeholder='0123456789'/>
			: <div className='data'>{number}</div>
	}

	return (
		<div className='cardSection phone'>
			<div className='heading'>Phone
				{editMode && numbers.length > 1 ? <small>Primary</small> : null}
			</div>
			{numbers.map((number, index) => {
				return <Entry {...{
					key: index,
					index,
					type: 'phone',
					editMode,
					options: ['home', 'work', 'mobile'],
					option: number.type,
					setDropdownOption: (e) => updateNumbers(e.target.value, index, 'type'),
					mainInput: mainInput(index, number.number),
					hasPrimary: true,
					isPrimary: number.primary,
					changePrimary: () => updatePrimary(index),
					dataLength: data.length,
					removeEntryCallback: () => removeEntry(index)
				}}/>
			})}
			{editMode ? <AddEntry {...{addNewEntry}} /> : null}
		</div>
	)
}
