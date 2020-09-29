import React from 'react'

export default function Primary({name, value, editMode, changePrimary}) {
	if (!editMode) {
		return value ? <div className='primary priIndicator'><small>Primary</small></div> : null
	} else {
		return <input className='primary' name={name} type='radio' checked={value} onChange={changePrimary}/>
	}
}