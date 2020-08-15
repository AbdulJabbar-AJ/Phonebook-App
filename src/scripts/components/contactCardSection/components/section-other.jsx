import React from 'react'

export default function Other (props) {
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

		if (!link.startsWith('http')) {
			link = `http://${link}`
		}

		return <a href={link} target='_blank'>{value}</a>
	}

	const others = props.other
	let i = -1
	const other = others && others[0] ? (
		<div className='cardSection'>
			<div className='heading'>Other</div>
			{others.map(other => {
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