import React from 'react'

export default function Notes ({data}) {
	const notes = data && data.length > 0 ? (
		<div className='cardSection'>
			<div className='heading'>Notes</div>
			<div className='note' >{data}</div>
		</div>
	) : null

	return notes
}
