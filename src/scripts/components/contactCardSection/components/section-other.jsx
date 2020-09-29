import React, {useEffect, useState} from 'react'
import Entry from '../../entry/entry'
import AddEntry from '../../addEntry/addEntry'
import { Other as other } from '../../../helpers/classConstructors/contact'

export default function Other ({data, editMode, onChangeCallback}) {
	const [others, setOthers] = useState(data)

	useEffect(() => setOthers(data), [data])

	const addNewEntry = () => onChangeCallback('other', [...others, new other])
	const removeEntry = index => onChangeCallback('other', others.filter((other, i) => index !== i))

	function updateOthers(value, index, item) {
		setOthers(prevState => {
			const nextState = [...prevState]
			nextState[index][item] = value
			return nextState
		})
		onChangeCallback('other', others)
	}


	// TODO - ALso handle for insta and linked in handles, and for in case they put in full url
	function createLink (type, value) {
		let link = ''
		switch (type) {
			case 'Twitter':
				link = `http://twitter.com/${value}`
				break
			case 'Instagram':
				link = `http://www.instagram.com/${value}`
				break
			case 'website':
				link = `${value}`
				break
			case 'LinkedIn':
				link = ''
				break
			case 'other':
				break
			default:
				break
		}

		if (!link.startsWith('http')) { link = `http://${link}` }
		return <a href={link} target='_blank'>{value}</a>
	}



	function generatePlaceholder(type) {
		switch (type) {
			case 'Twitter':
				return '@'
			case 'Facebook':
				return "/profile"
			case 'Instagram':
				return '@insta?'
			case 'website':
				return 'www.example.com'
			case 'LinkedIn':
				return '.....linkedin'
			case 'other':
				return ''
		}
	}



	const mainInput = (i, other) => {
		return editMode
			? <input className='data' name='data' type='string' value={other.data} onChange={(e) => updateOthers(e.target.value, i, 'data')} placeholder={generatePlaceholder(other.type)} />
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
					setDropdownOption: (e) => updateOthers(e.target.value, index, 'type'),
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
