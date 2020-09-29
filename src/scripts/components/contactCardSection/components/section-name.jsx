import React, {useEffect, useState} from 'react'

export default function Name ({data, onChangeCallback, validationMessage}) {
	const [name, setName] = useState(data)

	useEffect(() => setName(data), [data])
	useEffect(() => onChangeCallback('name', name), [name])
	const updateName = (value, item) => setName(prevState => ({...prevState, [item]: value}))

	const createInput = (inputName, placeholder) => {
		return <input className='data' id={inputName} type='text' value={name[inputName]} onChange={(e) => updateName(e.target.value, `${inputName}`)} placeholder={placeholder}/>
	}

	return (
		<div className='cardSection name'>
			<div className='heading'>Name{validationMessage ? <span className="validationMessage">{validationMessage}</span> : null}</div>
			<div className='entry'>
				<label className='type'>Title</label>
				{createInput('prefix', 'Miss Mr Dr')}
			</div>
			<div className='entry'>
				<label className='type'>First Name</label>
				{createInput('first')}
			</div>
			<div className='entry'>
				<label className='type'>Last Name</label>
				{createInput('last')}
			</div>
			<div className='entry'>
				<label className='type'>Company</label>
				{createInput('company')}
			</div>
		</div>
	)
}