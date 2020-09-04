import React from 'react'

export default function Email({data}) {
	let i = -1

	const email = data && data[0] ? (
		<div className='cardSection'>
			<div className='heading'>Email</div>
			{data.map(email => {
				i++
				let primary = email.primary && data[1] ? <div className='primary priIndicator'><small>Primary</small></div> : null
				return (
					<div className='entry' key={i} >
						<div className='type'>{email.type}</div>
						<div className='data'>{email.address}</div>
						{primary}
					</div>
				)
			})}
		</div>
	) : null
	return email
}
