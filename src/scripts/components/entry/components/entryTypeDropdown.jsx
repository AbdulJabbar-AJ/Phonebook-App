import React from 'react'

export default function EntryTypeDropdown({editMode, options, value, onChangeCallback}) {
	return !editMode
		? <div className='type'>{value}</div>
		: (
			<select className='type' name='type' defaultValue={value} onChange={onChangeCallback}>
				{options.map(option => <option key={option} value={option}>{option}</option>)}
			</select>
		)
}
