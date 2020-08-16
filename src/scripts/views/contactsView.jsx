import React from 'react'
import View from './view'

const ContactsView = () => {
	const heading = (() => (
		<div className='sidePanel-heading'>
			<div>CONTACTS</div>
			<div>SEARCHBAR</div>
			<div>ADD CONTACT</div>
		</div>
	))()

	const side = (() => (
		<div className='sidePanel'>Contacts Side Panel</div>
	))()

	const main = (() => (
		<div className='mainPanel'>
			<div>CONTACTS VIEWCONTACTS VIEWCONTACTS VIEWCONTACTS VIEWCONTACTS VIEWCONTACTS VIEWCONTACTS VIEWCONTACTS VIEWCONTACTS VIEWCONTACTS VIEWCONTACTS VIEWCONTACTS VIEWCONTACTS VIEWCONTACTS VIEWCONTACTS VIEWCONTACTS VIEWCONTACTS VIEWCONTACTS VIEWCONTACTS VIEWCONTACTS VIEWCONTACTS VIEW<div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div><div>CONTACTS VIEW</div></div>
			<div>LAST ITEM</div>
		</div>
	))()

	return (
		<View classname='contactsView' heading={heading} splitView={true} panels={{side, main}}/>
	)
}

export default ContactsView