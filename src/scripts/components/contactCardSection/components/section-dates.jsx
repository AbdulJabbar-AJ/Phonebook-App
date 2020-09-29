import React, {useEffect, useState} from 'react'
import Entry from '../../entry/entry'
import AddEntry from '../../addEntry/addEntry'
import { Date } from '../../../helpers/classConstructors/contact'

export default function Dates ({data, editMode, onChangeCallback}) {
	const [dates, setDates] = useState(data)

	useEffect(() => setDates(data), [data])

	const addNewEntry = () => onChangeCallback('dates', [...dates, new Date])
	const removeEntry = index => onChangeCallback('dates', dates.filter((date, i) => index !== i))

	function updateDates(value, index, item) {
		setDates(prevState => {
			const nextState = [...prevState]
			item !== 'type' ? nextState[index].date[item] = value : nextState[index][item] = value
			return nextState
		})
		onChangeCallback('dates', dates)
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

	// TODO - NAP - WHAT THESE REALLY NEED TO BE ARE DROPDOWNS WITH TEXTFIELDS
	// HTML5 DATALIST WILL NOT WORK BECAUSE THEY ARE NOT FLEXIBLE ENOUGH AT ALL
	const mainInput = (i, date) => {
		return !editMode
			? <div className='data'>{date[0]} {date[1]} {date[2]}</div>
			: <div className='data'>
				<select value={date[0]} onChange={(e) => updateDates(Number(e.target.value), i, 0)} >
					{days.map((day, index) => <option value={day} key={index}>{day}</option>)}
				</select>

				<select value={date[1]} onChange={(e) => updateDates(e.target.value, i, 1)} >
					{months.map((month, index) => <option value={month} key={index}>{month}</option>)}
				</select>

				<select value={date[2]} onChange={(e) => updateDates(Number(e.target.value), i, 2)} >
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
					setDropdownOption: (e) => updateDates(e.target.value, index, 'type'),
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