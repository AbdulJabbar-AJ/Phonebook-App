import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { addContact, showContact, setContact } from '../../components/contactsList/contactsListActions'
import View from '../view'
import ContactsList from '../../components/contactsList/contactsList'
import ContactCard from '../../components/contactCard/contactCard'
import SearchBar from '../../components/searchBar/searchBar'
import Button from '../../components/button/button'
import close from '../../../media/icons/close.svg'
import Contact from '../../helpers/classConstructors/contact'
import BlankMessage from '../../components/blankMessage/blankMessage'
import classNames from 'classnames'

// // NOTE
// activeContact from redux -> props is id of activeContact, otherwise ''
// contact from component state is the contact object with all data

const ContactsView = ({contacts, activeContact, topContact, showContact, narrowView, contactObject, setContact}) => {
	const [isNewContact, setIsNewContact] = useState(false)
	const [slideLeft, setSlideLeft] = useState(false)

	const contactExists = id => contacts.some(contact => contact.id === id)
	useEffect(showCard, [narrowView, topContact, activeContact, isNewContact, contacts])

	function showCard() {
		if (!isNewContact) {
			if (!activeContact) {
				if (!narrowView && topContact !== '' && contacts.some(contact => contact.id === topContact)) {
					setContact(contacts.find(contact => contact.id === topContact))
				} else {
					setContact({})
				}
			} else if (contactExists(activeContact)) {
		 		setContact(contacts.find(contact => contact.id === activeContact))
			} else {
				showContact('')
			}
		}
	}

	function activateContact(id) {
		showContact(id)
		setIsNewContact(false)
		setSlideLeft(true)
		setTimeout(() => setSlideLeft(false),1000)
	}

	function newContact() {
		setIsNewContact(true)
		setContact(new Contact())
	}

	const heading = (
		<div className='sidePanel-heading contactsView-sidePanelHeading'>
			<div className='heading'>Contacts</div>
			<Button type='icon' classname='addContact-btn' icon={close} onClickCallback={newContact} />
			<SearchBar/>
		</div>
	)

	const side = <div className='sidePanel'><ContactsList {...{contacts, activeContact: contactObject, showContactCallback: activateContact}} /></div>

	console.log(contactObject)
	const main = contactObject.hasOwnProperty('id')
		? <div className={classNames('mainPanel', {slideLeft})}><ContactCard {...{contact: contactObject, isNewContact, setIsNewContact, closeContactCallback: () => showContact('')}}/></div>
		: <BlankMessage message='No Contact Selected'/>

	return <View {...{ classname: 'contactsView', heading, splitView: true, panels: {side, main}, narrowView }}/>
}

const mapStateToProps = ({contactsList, view}) => ({
	narrowView: view.narrowView,
	contacts: contactsList.contacts,
	activeContact: contactsList.activeContact,
	topContact: contactsList.topContact,
	contactObject: contactsList.contactObject
})
const mapDispatchToProps = { addContact, showContact, setContact }
export default connect(mapStateToProps, mapDispatchToProps)(ContactsView)
