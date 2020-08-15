import React from 'react'

export default function Dates(props) {
	const dates = props.dates
	let i = -1
	const date = dates && dates[0] ? (
		<div className='cardSection'>
			<div className='heading'>Dates</div>
			{dates.map(date => {
				i++
				return (
					<div className='entry' key={i} >
						<div className='type'>{date.type}</div>
						<div className='data'>{date.date[0]} {date.date[1]} {date.date[2]}</div>
					</div>
				)
			})}
		</div>
	) : ''
	return date
}
