import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { addContact, showContact } from '../../components/contactsList/contactsListActions'
import View from '../view'
import ContactsList from '../../components/contactsList/contactsList'
import ContactCard from '../../components/contactCard/contactCard'
import SearchBar from '../../components/searchBar/searchBar'
import Button from '../../components/button/button'
import close from '../../../media/icons/close.svg'
import Contact from '../../helpers/contacts'
import BlankMessage from '../../components/blankMessage/blankMessage'

// TODO - need to make sure active contact on load is the top contact

const ContactsView = ({contacts, activeContact, showContact}) => {
	const showActiveContact = () => contacts.find(contact => contact.id === activeContact)
	const [contact, setContact] = useState(showActiveContact)
	const [isNewContact, setIsNewContact] = useState(false)

	useEffect(() => setContact(showActiveContact()), [activeContact])
	useEffect(() => setContact(showActiveContact()), [contacts])

	const addContactCallback = () => {
		setIsNewContact(true)
		setContact(new Contact(contacts.length +  1))
	}

	const cancelNewContact = () => {
		setIsNewContact(false)
		setContact(showActiveContact())
	}

	const heading = (
		<div className='sidePanel-heading contactsView-sidePanelHeading'>
			<div className='heading'>Contacts</div>
			<Button type='icon' classname='addContact-btn' icon={close} onClickCallback={addContactCallback} />
			<SearchBar/>
		</div>
	)

	// newContact, newId: contacts.length +  1, closeNewContact: () => setNewContact(false),
	const side = <div className='sidePanel'><ContactsList {...{contacts, activeContact, showContactCallback: showContact}} /></div>
	const main = <div className='mainPanel'>{activeContact !== '' && contact ? <ContactCard {...{contact, isNewContact, cancelNewContact}}/> : <BlankMessage message='No Contact Selected'/> }</div>
	return <View classname='contactsView' heading={heading} splitView={true} panels={{side, main}}/>
}

const mapStateToProps = ({contactsList}) => ({
	contacts: contactsList.contacts,
	activeContact: contactsList.activeContact
})
const mapDispatchToProps = { addContact, showContact }
export default connect(mapStateToProps, mapDispatchToProps)(ContactsView)
