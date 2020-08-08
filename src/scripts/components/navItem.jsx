import React from 'react'

const NavItem = ({ name, icon }) => {
	return (
		<div className={`navItem ${name}`}>
			<div className='navIcon'><ion-icon name={`ios-${icon}`} /></div>
			<div className='navHeading'><li>{name}</li></div>
		</div>
	)
}

export default NavItem