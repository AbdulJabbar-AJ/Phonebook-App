import React from 'react'

export default function Other ({data}) {
	function createLink (type, value) {
		let link

		switch (type) {
			case 'Twitter':
				link = `http://twitter.com/${value}`
				break
			case 'Instagram':
				link = `http://www.instagram.com/${value}`
				break
			default:
				link = `${value}`
		}

		if (!link.startsWith('http')) { link = `http://${link}` }

		return <a href={link} target='_blank'>{value}</a>
	}

	let i = -1
	const other = data && data[0] ? (
		<div className='cardSection'>
			<div className='heading'>Other</div>
			{data.map(other => {
				i++
				return (
					<div className='entry' key={i} >
						<div className='type'>{other.type}</div>
						<div className='data'>{createLink(other.type, other.data)}</div>
					</div>
				)
			})}
		</div>
	) : ''
	return other
}
