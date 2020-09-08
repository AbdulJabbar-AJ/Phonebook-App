import React from 'react'

export default function Primary({name, dataLength, value, editMode, changePrimary}) {
	if (!editMode) {
		return dataLength > 1 && value ? <div className='primary priIndicator'><small>Primary</small></div> : null
	} else {
		return <input className='primary' name={name} type='radio' defaultChecked={value} onChange={changePrimary}/>
	}
}