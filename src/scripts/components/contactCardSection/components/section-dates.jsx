import React, {useEffect, useState} from 'react'
import Entry from '../../entry/entry'
import AddEntry from '../../addEntry/addEntry'
import { date } from '../../../helpers/contacts'

export default function Dates ({data, editMode, onChangeCallback}) {
	const [dates, setDates] = useState(data)

	useEffect(() => setDates(data), [data])
	useEffect(() => onChangeCallback('dates', dates), [dates])

	const removeEntry = index => setDates(prevState => prevState.filter((date, i) => index !== i))
	const addNewEntry = () => setDates(prevState => [...prevState, date])

	function updateDates(value, index, item) {
		setDates(prevState => {
			const updated = [...prevState]
			item !== 'type' ? updated[index].date[item] = value : updated[index][item] = value
			return updated
		})
	}

	const months =
		['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

	const years = []
	for (let i = 1900; i <= 2100; i++) {
		years.push(i)
	}

	// VERY IMPORTANT, THESE NEEDS TO BE DISPLAYED DEPENDING ON DAYS IN THAT MONTH.
	// FEBRUARY ALSO NEEDS TO TAKE IN TO ACCOUNT WHICH YEARS ARE LEAP YEARS
	const days = []
	for (let i = 1; i <= 31; i++) {
		days.push(i)
	}

	// TODO - WHAT THESE REALLY NEED TO BE ARE DROPDOWNS WITH TEXTFIELDS
	// HTML5 DATALIST WILL NOT WORK BECAUSE THEY ARE NOT FLEXIBLE ENOUGH AT ALL
	const mainInput = (i, date) => {
		return !editMode
			? <div className='data'>{date[0]} {date[1]} {date[2]}</div>
			: <div className='data'>
				<select defaultValue={date[0]} onChange={(e) => updateDates(Number(e.target.value), i, 0)} >
					{days.map((day, index) => <option value={day} key={index}>{day}</option>)}
				</select>

				<select defaultValue={date[1]} onChange={(e) => updateDates(e.target.value, i, 1)} >
					{months.map((month, index) => <option value={month} key={index}>{month}</option>)}
				</select>

				<select defaultValue={date[2]} onChange={(e) => updateDates(Number(e.target.value), i, 2)} >
					{years.map((year, index) => <option value={year} key={index}>{year}</option>)}
				</select>
			</div>
	}

	return (
		<div className='cardSection dates'>
			<div className='heading'>Dates</div>
			{dates.map((date, index) => {
				return <Entry {...{
					key: index,
					index,
					type: 'dates',
					editMode,
					options: ['birthday', 'anniversary', 'other'],
					option: date.type,
					setDropdownOption: (event) => updateDates(event.target.value, index, 'type'),
					mainInput: mainInput(index, date.date),
					hasPrimary: false,
					dataLength: data.length,
					removeEntryCallback: () => removeEntry(index)
				}}/>
			})}
			{editMode ? <AddEntry {...{addNewEntry}} /> : null}
		</div>
	)
}