import React from 'react'

export default function Notes (props) {
	return (
		<div className='cardSection'>
			<div className='heading'>Notes</div>
			<div className='note' >{props.notes}</div>
		</div>
	)
}
