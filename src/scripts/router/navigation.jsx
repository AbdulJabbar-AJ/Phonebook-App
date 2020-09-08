import React from 'react'
import {Router} from '@reach/router'
import NavItem from './navItem'
import Contacts from '../views/sections/contactsView'
import Favourites from '../views/sections/favouritesView'
import Groups from '../views/sections/groupsView'
import SettingsTippy from './settingsTippy'
import contactsIcon from '../../media/icons/person-circle-outline.svg'
import favouritesIcon from '../../media/icons/star-outline.svg'
import groupsIcon from '../../media/icons/people-circle-outline.svg'


const Page = () => {
	return (
		<div className="page">
			<div className="navbar">
				<NavItem to='/' name='contacts' icon={contactsIcon}/>
				<NavItem to='/favourites' name='favourites' icon={favouritesIcon}/>
				<NavItem to='/groups' name='groups' icon={groupsIcon}/>
				<SettingsTippy/>
			</div>

			<Router className="viewContainer">
				<Contacts path='/'/>
				<Favourites path='/favourites'/>
				<Groups path='/groups'/>
			</Router>
		</div>
	)
}

export default Page