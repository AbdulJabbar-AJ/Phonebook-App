import React, {useEffect, useState} from 'react'
import Entry from '../../entry/entry'
import AddEntry from '../../addEntry/addEntry'

export default function Address ({data, editMode, onChangeCallback}) {
	const [addresses, setAddresses] = useState(data)

	useEffect(() => setAddresses(data), [data])
	useEffect(() => onChangeCallback('address', addresses), [addresses])

	const removeEntry = index => setAddresses(prevState => prevState.filter((other, i) => index !== i))

	function updateAddresses(value, index, item) {
		setAddresses(prevState => {
			const updated = [...prevState]
			updated[index][item] = value
			return updated
		})
	}

	function addNewEntry() {
		const newDataSet = { type: 'home', line1: '', line2: '', city: '', county: '', country: '', postcode: '' }
		setAddresses(prevState => [...prevState, newDataSet])
	}

	const mainInput = (i, address) => {
		let _1 = ''; if (address.city && address.county) { _1 = ', ' }
		let _2 = ''; if (address.postcode && address.country) { _2 = ', ' }
		return editMode ? (
			<div className='data' onKeyUp={(e) => updateAddresses(e.target.value, i, e.target.name )}>
				<input name='line1' type='text' defaultValue={address.line1} placeholder='Line 1' />
				<input name='line2' type='text' defaultValue={address.line2} placeholder='Line 2' />
				<input name='city' type='text' defaultValue={address.city} placeholder='City/Town' />
				<input name='county' type='text' defaultValue={address.county} placeholder='County' />
				<input name='postcode' type='text' defaultValue={address.postcode} placeholder='Post Code' />
				<input name='country' type='text' defaultValue={address.country} placeholder='Country' />
			</div>
			) : (
				<div className='data'>
					<div>{address.line1}</div>
					<div>{address.line2}</div>
					<div>{address.city} {_1} {address.county}</div>
					<div>{address.postcode} {_2} {address.country}</div>
					{/*<div >*/}
					{/*	<img id={`googleMaps${i}`} src='' />*/}
					{/*</div>*/}
				</div>
		)
	}

	return (
		<div className='cardSection address'>
			<div className='heading'>Address</div>
			{addresses.map((address, index) => {
				return <Entry {...{
					key: index,
					index,
					type: 'address',
					editMode,
					options: ['home', 'work', 'business', 'other'],
					option: address.type,
					setDropdownOption: (event) => updateAddresses(event.target.value, index, 'type'),
					mainInput: mainInput(index, address),
					hasPrimary: false,
					dataLength: data.length,
					removeEntryCallback: () => removeEntry(index)
				}}/>
			})}
			{editMode ? <AddEntry {...{addNewEntry}} /> : null}
		</div>
	)
}
