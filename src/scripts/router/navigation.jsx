import React, {useState} from 'react'
import { Router , Link } from '@reach/router'
import NavItem from './components/navItem'
import Contacts from '../views/contacts/contacts'
import Favourites from '../views/favourites/favourites'
import Groups from '../views/groups/groups'
import Settings from '../views/settings/settings'
import Tippy from '@tippy.js/react'

// Settings tooltip
// TODO
// Extract out
const SettingsTooltip = () => (
	<a><Tippy content={<Settings />} arrow arrowType='round' animation='fade' interactive trigger='click' >
		<div className='navItem settings'>
			<div className='navIcon'><ion-icon name='ios-switch' /></div>
			<div className='navHeading'><li>settings</li></div>
		</div>
	</Tippy></a>
)


// Navbar & Router
const Page = () => (
	<div className="page">
		<div className="navbar">
			<NavItem to='/' name='contacts' icon='person'/>
			{/*<NavItem to='/favourites' name='favourites' icon='star-outline'/>*/}
			{/*<NavItem to='/groups' name='groups' icon='people'/>*/}
			{/*<SettingsTooltip />*/}

		</div>

		<Router className='viewContainer'>
			<Contacts path='/'/>
			{/*<Favourites path='/favourites'/>*/}
			{/*<Groups path='/groups'/>*/}
		</Router>
	</div>
)


export default Page
