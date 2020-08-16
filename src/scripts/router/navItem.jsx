import React, {useState} from 'react'
import { Link } from '@reach/router'
import { ReactSVG } from 'react-svg'
import classNames from 'classnames'

const NavItem = ({ to, name, icon }) => {
	const isActive = ({isCurrent}) => {
		return isCurrent
			? { className: classNames('navItem', name, 'active')}
			: {className: classNames('navItem', name)}
	}

	return (
		<Link to={to} getProps={isActive}>
			<ReactSVG src={icon} className={'navIcon'}/>
			<div className='navHeading'><li>{name}</li></div>
		</Link>
	)
}

export default NavItem

// NOTE, the getProps is a Reach Router thing


