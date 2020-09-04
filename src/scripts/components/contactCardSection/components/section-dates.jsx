import React from 'react'

export default function Dates({data}) {
	let i = -1

	const date = data && data[0] ? (
		<div className='cardSection'>
			<div className='heading'>Dates</div>
			{data.map(date => {
				i++
				return (
					<div className='entry' key={i} >
						<div className='type'>{date.type}</div>
						<div className='data'>{date.date[0]} {date.date[1]} {date.date[2]}</div>
					</div>
				)
			})}
		</div>
	) : null
	return date
}
