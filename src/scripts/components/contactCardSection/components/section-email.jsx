import React from 'react'

export default function Email(props) {
	const emails = props.email
	let i = -1
	const email = emails && emails[0] ? (
		<div className='cardSection'>
			<div className='heading'>Email</div>
			{emails.map(email => {
				i++
				let primary = email.primary && emails[1] ? <div className='primary priIndicator'><small>Primary</small></div> : ''
				return (
					<div className='entry' key={i} >
						<div className='type'>{email.type}</div>
						<div className='data'>{email.address}</div>
						{primary}
					</div>
				)
			})}
		</div>
	) : ''
	return email
}
