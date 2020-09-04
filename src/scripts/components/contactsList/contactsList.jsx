import React from 'react'
import { connect } from 'react-redux'
import { showContact } from './contactsListActions'

const ContactsList = ({contacts, filteredContacts, sortBy, showContact}) => {
	return (
		<div className='contactsList'>
			{ contacts.map(contact => <div key={contact.id} onClick={() => showContact(contact)} >{contact.name.first} {contact.name.last}</div>) }
		</div>
	)
}


const mapStateToProps = state => ({
	contacts: state.contactsList.contacts
})

const mapDispatchToProps = {
	showContact
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList)
