import React, {useEffect, useState} from 'react'

export default function Name ({data, editMode, onChangeCallback}) {
	const [name, setName] = useState(data)

	useEffect(() => setName(data), [data])
	useEffect(() => onChangeCallback('name', name), [name])
	const updateName = (value, item) => setName(prevState => ({...prevState, [item]: value}))

	// TODO - EMERGENCY - name title does not update on submit
	return (
		<div className='cardSection name'>
			<div className='heading'>Name</div>
			<div className='entry'>
				<label className='type'>Title</label>
				<input className='data' id='prefix' type='text' defaultValue={name.prefix} onKeyUp={(e) => updateName(e.target.value, 'prefix')} placeholder='Miss Mr Dr'/>
			</div>
			<div className='entry'>
				<label className='type'>First Name</label>
				<input className='data' id='first' type='text' defaultValue={name.first} onKeyUp={(e) => updateName(e.target.value, 'first')} placeholder=''/>
			</div>
			<div className='entry'>
				<label className='type'>Last Name</label>
				<input className='data' id='last' type='text' defaultValue={name.last} onKeyUp={(e) => updateName(e.target.value, 'last')} placeholder=''/>
			</div>
			<div className='entry'>
				<label className='type'>Company</label>
				<input className='data' id='company' type='text' defaultValue={name.company} onKeyUp={(e) => updateName(e.target.value, 'company')} placeholder=''/>
			</div>
		</div>
	)
}