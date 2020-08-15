import React from 'react'
import { Link } from '@reach/router'
import classNames from 'classnames'

const NavItem = ({ to, name, icon }) => {

	const isActive = ({isCurrent}) => {
		return isCurrent
			? { className: classNames('navItem', name, 'active')}
			: {className: classNames('navItem', name)}
	}

	return (
		<Link to={to} getProps={isActive}  >
			<div className='navIcon'><ion-icon name={`ios-${icon}`} /></div>
			<div className='navHeading'><li>{name}</li></div>
		</Link>
	)
}

export default NavItem