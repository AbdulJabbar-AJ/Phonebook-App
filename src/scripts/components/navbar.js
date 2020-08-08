import React from 'react'
import { Router, Link } from '@reach/router'
import NavItem from './navItem'
import Favourites from './views/favourites'
import Contacts from './views/contacts'
import Groups from './views/groups'
import Settings from './views/settings'
import Tippy from '@tippy.js/react'

// Settings tooltip
const SettingsTooltip = () => (
	<a><Tippy content={<Settings />} arrow arrowType='round' animation='fade' interactive trigger='click' >
		<div className='navItem settings'>
			<div className='navIcon'><ion-icon name='ios-switch' /></div>
			<div className='navHeading'><li>settings</li></div>
		</div>
	</Tippy></a>
)


// Navbar & Router
const View = () => (
	<div className="page">
		<div className="navbar">
			<Link to='/'><NavItem name='contacts' icon='person'/></Link>
			<Link to='/favourites'><NavItem name='favourites' icon='star-outline'/></Link>
			<Link to='/groups'><NavItem name='groups' icon='people'/></Link>
			<SettingsTooltip />
		</div>

		<Router>
			<Contacts path='/'/>
			<Favourites path='/favourites'/>
			<Groups path='/groups'/>
		</Router>

	</div>
)

export default View
