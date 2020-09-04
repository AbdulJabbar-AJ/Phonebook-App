import React from 'react'

export default function Phone ({data, editMode}) {
	if (!editMode) {
		let i = -1

		return (
			data && data[0] ? (
				<div className='cardSection'>
					<div className='heading'>Notes</div>
					{data.map(num => {
							i++
						let primary = num.primary && data[1] ? <div className='primary priIndicator'><small>Primary</small></div> : null
						return (
							<div className='entry' key={i}>
								<div className='type'>{num.type}</div>
								<div className='data'>{num.number}</div>
								{primary}
							</div>
						)
					})}
				</div>
			) : null
		)
	} else {
		return (
			<div>EDIT MODE</div>
		)
	}
}