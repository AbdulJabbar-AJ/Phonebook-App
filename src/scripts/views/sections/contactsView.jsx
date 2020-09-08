import React from 'react'
import { connect } from 'react-redux'
import { addContact, showContact } from '../../components/contactsList/contactsListActions'
import View from '../view'
import ContactsList from '../../components/contactsList/contactsList'
import ContactCard from '../../components/contactCard/contactCard'
import SearchBar from '../../components/searchBar/searchBar'
import Button from '../../components/button/button'
import close from '../../../media/icons/close.svg'


const ContactsView = ({contacts, activeContact}) => {
	const contact = contacts.find(contact => contact.id === activeContact)

	const addContactCallback = () => {
		// addContact(new Contact())
		// Have a helper which defines a contact class so I can call new Contact() - But also make each section of the contact and independent export, so I can call it within addEntry
	}

	const heading = (
		<div className='sidePanel-heading contactsView-sidePanelHeading'>
			<div className='heading'>Contacts</div>
			<Button type='icon' classname='addContact-btn' icon={close} onClickCallback={addContactCallback} />
			<SearchBar/>
		</div>
	)

	const side = <div className='sidePanel'><ContactsList /></div>
	const main = <div className='mainPanel'><ContactCard {...{contact, showContactCallback: showContact}}/></div>

	return <View classname='contactsView' heading={heading} splitView={true} panels={{side, main}}/>
}

// con, type, favs, favourite, rmFav, activeFav, activeContact, activeGroupMem,
// 	windowWidth, showFav, contacts, hideFav, hideContact, hideGroupMem, displayBy, editCon,
// 	beingEdited

const mapStateToProps = ({contactsList}) => ({
	contacts: contactsList.contacts,
	activeContact: contactsList.activeContact
})

const mapDispatchToProps = { addContact, showContact }

export default connect(mapStateToProps, mapDispatchToProps)(ContactsView)
