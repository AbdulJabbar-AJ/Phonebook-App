import React, {useState} from 'react'
import { connect } from 'react-redux'
import { addContact, showContact } from '../../components/contactsList/contactsListActions'
import View from '../view'
import ContactsList from '../../components/contactsList/contactsList'
import ContactCard from '../../components/contactCard/contactCard'
import SearchBar from '../../components/searchBar/searchBar'
import Button from '../../components/button/button'
import close from '../../../media/icons/close.svg'

// const abc = JSON.parse('{"id":99,"name":{"first":"$leta","last":"Level","company":"Some Company Ltd"},"phone":[{"number":"+442032960159","type":"home","primary":false},{"number":"1111","type":"mobile","primary":true},{"number":"2222","type":"work","primary":false}],"email":[{"address":"test@mail.com","type":"home","primary":false},{"address":"test@mail.com","type":"work","primary":true},{"address":"test@mail.com","type":"other","primary":false}],"address":[{"type":"home","line1":"10 London Wall","line2":"","city":"London","postcode":"EC2M 6SA","country":"UK"},{"type":"work","line1":"Baa Baa Baa","line2":"Felonius Gru","city":"Minion","postcode":"6RU M00n","country":"Illumination"}],"dates":[{"date":[1,"Jan",1950],"type":"birthday"},{"date":[2,"Feb",2000],"type":"anniversary"}],"other":[{"data":"@DespicableMe","type":"Twitter"},{"data":"facebook.com/DespicableMe","type":"Facebook"},{"data":"www.despicable.me","type":"website"}],"notes":"This is a note."}')

const ContactsView = ({contacts, activeContact, showContact}) => {
	const [newContact, setNewContact] = useState(false)
	const contact = contacts.find(contact => contact.id === activeContact)

	const addContactCallback = () => setNewContact(true)
	// Have a helper which defines a contact class so I can call new Contact() - But also make each section of the contact and independent export, so I can call it within addEntry

	const heading = (
		<div className='sidePanel-heading contactsView-sidePanelHeading'>
			<div className='heading'>Contacts</div>
			<Button type='icon' classname='addContact-btn' icon={close} onClickCallback={addContactCallback} />
			<SearchBar/>
		</div>
	)

	const side = <div className='sidePanel'><ContactsList /></div>
	const main = <div className='mainPanel'><ContactCard {...{contact, newContact, newId: contacts.length +  1, closeNewContact: () => setNewContact(false), showContactCallback: showContact}}/></div>

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
