import React from 'react'

export default function Address(props) {
	const addrs = props.address
	let i = -1
	const address = addrs && addrs[0] ? (
		<div className='cardSection address'>
			<div className='heading'>Address</div>
			{addrs.map(addr => {
				i++
				let _1 = ''
				let _2 = ''
				if (addr.city && addr.county) { _1 = ', ' }
				if (addr.postcode && addr.country) { _2 = ', ' }

				return (
					<div className='entry' key={i} >
						<div className='type'>{addr.type}</div>
						<div className='data'>
							<div>{addr.line1}</div>
							<div>{addr.line2}</div>
							<div>{addr.city} {_1} {addr.county}</div>
							<div>{addr.postcode} {_2} {addr.country}</div>
						</div>
						<div >
							<img id={`googleMaps${i}`} src='' />
						</div>
					</div>
				)
			})}
		</div>
	) : ''
	return address
}
