import React from 'react'
import View from '../view'
import ContactsList from '../../components/contactsList/contactsList'
import { addContact, showContact } from '../../components/contactsList/contactsListActions'
import { connect } from 'react-redux'
import close from '../../../media/icons/close.svg'
import SearchBar from '../../components/searchBar/searchBar'
import Button from '../../components/button/button'
import ContactCard from '../../components/contactCard/contactCard'

// // CONTACTCARD AND CONTACTLIST AND CONTACTCARDSECTION HAVE BEEN IMPORTED FROM OTHER PROJECT, DON'T THINK THEY ARE ENTIRELY COMPATIBLE WITH WHAT I AM TRYING TO DO HERE //

const ContactsView = ({contacts, activeContact}) => {
	const addContactCallback = () => {
		// addContact(new Contact())
	}

	const heading = (() => (
		<div className='sidePanel-heading contactsView-sidePanelHeading'>
			<div className='heading'>Contacts</div>
			<Button type='icon' classname='addContact-btn' icon={close} onClickCallback={addContactCallback} />
			<SearchBar/>
		</div>
	))()

	const side = (() => <div className='sidePanel'><ContactsList /></div>)()

	const main = (() => (
		<div className='mainPanel'>
			{activeContact ? <ContactCard/> : <div>No contact selected</div>} {/*Content may be different for screen sized*/}
		</div>
	))()

	return <View classname='contactsView' heading={heading} splitView={true} panels={{side, main}}/>
}

// con, type, favs, favourite, rmFav, activeFav, activeContact, activeGroupMem,
// 	windowWidth, showFav, contacts, hideFav, hideContact, hideGroupMem, displayBy, editCon,
// 	beingEdited

const mapStateToProps = ({contactsList}) => ({
	contacts: contactsList.contacts,
	activeContact: contactsList.activeContact
})

const mapDispatchToProps = {
	addContact,
	showContact
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsView)
