import React from 'react'
import { Link } from '@reach/router'
import { ReactSVG } from 'react-svg'
import classNames from 'classnames'

// NOTE, getProps is a Reach Router thing
const NavItem = ({to, name, icon}) => {
	const isActive = ({isCurrent}) => ({ className: classNames('navItem', name, {active: isCurrent}) })

	return (
		<Link to={to} getProps={isActive}>
			<ReactSVG src={icon} className={'navIcon'}/>
			<div className='navHeading'><li>{name}</li></div>
		</Link>
	)
}

export default NavItem
