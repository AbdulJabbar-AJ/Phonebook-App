import React from 'react'

export default function Phone (props) {
	const numbers = props.phone
	let i = -1
	const phone = numbers && numbers[0] ? (
		<div className='cardSection'>
			<div className='heading'>Phone</div>
			{numbers.map(num => {
				i++
				let primary = num.primary && numbers[1] ? <div className='primary priIndicator'><small>Primary</small></div> : ''
				return (
					<div className='entry' key={i} >
						<div className='type'>{num.type}</div>
						<div className='data'>{num.number}</div>
						{primary}
					</div>
				)
			})}
		</div>
	) : ''
	return phone
}