import React, {useEffect, useState} from 'react'
import Entry from '../../entry/entry'
import AddEntry from '../../addEntry/addEntry'
import validate from '../../../helpers/validate'

export default function Phone ({data, editMode, onChangeCallback}) {
	const [numbers, setNumbers] = useState(data)
	const [primary, setPrimary] = useState(data.findIndex(number => number.primary === true))

	useEffect(() => setNumbers(data), [data])
	useEffect(() => onChangeCallback('phone', numbers), [numbers])

	const removeEntry = index => setNumbers(prevState => prevState.filter((number, i) => index !== i))

	function updateNumbers(value, index, item) {
		setNumbers(prevState => {
			const updated = [...prevState]
			updated[index][item] = value
			return updated
		})
	}

	function updatePrimary(index) {
		updateNumbers(false, primary, 'primary')
		setPrimary(index)
		updateNumbers(true, index, 'primary')
	}

	function addNewEntry() {
		const newDataSet = {type: 'home', number: '', primary: false}
		setNumbers(prevState => [...prevState, newDataSet])
	}

	const mainInput = (i, number) => {
		return editMode
			? <input className='data' name='data' type='string' defaultValue={number} onKeyPress={(e) => validate.phone(e)} onKeyUp={(e) => updateNumbers(e.target.value, i, 'number')} placeholder='0123456789'/>
			: <div className='data'>{number}</div>
	}

	return (
		<div className='cardSection phone'>
			<div className='heading'>Phone
				{editMode ? <small>Primary</small> : null}
			</div>
			{numbers.map((number, index) => {
				return <Entry {...{
					key: index,
					index,
					type: 'phone',
					editMode,
					options: ['home', 'work', 'mobile'],
					option: number.type,
					setDropdownOption: (event) => updateNumbers(event.target.value, index, 'type'),
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