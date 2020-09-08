import React, {useEffect, useState} from 'react'
import Entry from '../../entry/entry'
import AddEntry from '../../addEntry/addEntry'

export default function Other ({data, editMode, onChangeCallback}) {
	const [others, setOthers] = useState(data)

	useEffect(() => setOthers(data), [data])
	useEffect(() => onChangeCallback('other', others), [others])

	const removeEntry = index => setOthers(prevState => prevState.filter((other, i) => index !== i))

	function updateOthers(value, index, item) {
		setOthers(prevState => {
			const updated = [...prevState]
			updated[index][item] = value
			return updated
		})
	}

	function addNewEntry() {
		const newDataSet = { data: '', type: 'other'}
		setOthers(prevState => [...prevState, newDataSet])
	}


	// ALso handle for insta and linked in handles, and for in case they put in full url
	function createLink (type, value) {
		let link
		switch (type) {
			case 'Twitter':
				link = `http://twitter.com/${value}`
				break
			case 'Instagram':
				link = `http://www.instagram.com/${value}`
				break
			default:
				link = `${value}`
		}

		if (!link.startsWith('http')) { link = `http://${link}` }
		return <a href={link} target='_blank'>{value}</a>
	}

	const mainInput = (i, other) => {
		return editMode
			? <input className='data' name='data' type='string' defaultValue={other.data} onKeyUp={(e) => updateOthers(e.target.value, i, 'data')} placeholder='Enter social media handle or URL'/>
			: <div className='data'>{createLink(other.type, other.data)}</div>
	}

	return (
		<div className='cardSection other'>
			<div className='heading'>Other</div>
			{others.map((other, index) => {
				return <Entry {...{
					key: index,
					index,
					type: 'other',
					editMode,
					options: ['Twitter', 'Facebook', 'Instagram', 'website', 'LinkedIn', 'other'],
					option: other.type,
					setDropdownOption: (event) => updateOthers(event.target.value, index, 'type'),
					mainInput: mainInput(index, other),
					hasPrimary: false,
					dataLength: data.length,
					removeEntryCallback: () => removeEntry(index)
				}}/>
			})}
			{editMode ? <AddEntry {...{addNewEntry}} /> : null}
		</div>
	)
}
