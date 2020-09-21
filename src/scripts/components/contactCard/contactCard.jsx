import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { deepCloneObject } from '../../helpers/clone'
import CardSection from '../contactCardSection/contactCardSection'
import Button from '../button/button'
import { addFavourite, removeFavourite } from '../favouritesList/favouritesListActions'
import {updateContact, deleteContact, addContact, showContact} from '../contactsList/contactsListActions'
import edit from '../../../media/icons/edit.svg'
import favTrue from '../../../media/icons/star.svg'
import favFalse from '../../../media/icons/star-outline.svg'
import trash from '../../../media/icons/trash.svg'

// TODO - NEED TO SCROLL TO TOP OF CONTACT WHEN SWITCHING BETWEEN CONTACTS
// TODO - Make edit mode redux store, so can switch between tabs

function ContactCard({contact, favourites, addFavourite, removeFavourite, displayBy, updateContact, deleteContact, addContact, showContact, isNewContact, cancelNewContact}) {
	const initialDetails = deepCloneObject(contact)
	const [editMode, setEditMode] = useState(false)
	const [contactDetails, setContactDetails] = useState(initialDetails)

	useEffect(() => {
		setContactDetails(deepCloneObject(contact))
		setEditMode(false)
	}, [contact])

	useEffect(() => {
		if (isNewContact) {
			setEditMode(true)
		}
	}, [isNewContact])


	// TODO - SUPER IMPORTANT TO AVOID TONNES OF BUGS AND RUNTIME ERRORS // VALIDATE CONTACT DETAILS HERE TO MAKE SURE FOR MINIMUM OF NAME
	const onChangeCallback = (section, data) => setContactDetails(prevState => ({ ...prevState, [section]: data }))
	const flipEditMode = () => setEditMode(!editMode)
	const checkFav = id => favourites.some(favId => favId === id)
	const toggleStar = id => checkFav(id) ? favTrue : favFalse


	// TODO - After starting a new contact, while in edit mode, if you press '+' again, it gets out of editMode, and subsequent clicks of '+' do nothing
	// TODO - Same thing happens if you save and then try and click '+' again
	// Validation checks for contactCard will only partially fix this I think
	function saveChange(id) {
		if (isNewContact) {
			addContact(contactDetails)
		} else {
			updateContact(id, contactDetails)
		}
		flipEditMode()
	}

	function cancelChange() {
		isNewContact ? cancelNewContact() : setContactDetails(initialDetails)
		flipEditMode()
	}

	function removeContact(id) {
		deleteContact(id)
		flipEditMode()
		// TODO - NEED TO MAKE SURE THE CONTACT DELETES FROM EVERYWHERE, CONTACTS, FAVOURITES, ALL GROUPS!!!!!!!!
		// TODO - NEED TO MAKE SURE IT SELECTS A DIFFERENT CONTACT AFTER DELETING
		// BUT IF VIEW IS NARROW, WANT TO JUST REVERT BACK TO CONTACTSLIST
		// BUT IF VIEW IS NARROW, WANT TO JUST REVERT BACK TO CONTACTSLIST
		// SO MAKE A closeContact FUNCTION WHICH WILL GO BACK TO LIST IF NARROW OR ACTIVATE FIRST ITEM IF WIDE
	}

	function toggleFav(id) {
		if (favourites.length === 0) {
			addFavourite(id)
		} else if (checkFav(id)) {
			removeFavourite(id)
		} else addFavourite(id)


		// TODO - Change favourite is contact deleted
		// let next
		// if (activeFav && activeFav.id === id) {
		// 	if (favs.length > 1) {
		// 		if (favs[0].conId === id) {
		// 			next = favs[1].conId
		// 		} else {
		// 			next = favs[0].conId
		// 		}
		// 		if (windowWidth !== 'small') {
		// 			showFav(contacts.find(con => con.id === next))
		// 		} else hideFav()
		// 	} else hideFav()
		// }
	}

// 	function checkGroup(id, group) {
// 		for (let i = 0; i < group.length; i++) {
// 			if (group.members.includes(id)) {
// 				return true
// 			}
// 		}
// 	}

	// This must come from props not state, as we don't want it to update on change of edit fields
	const first = isNewContact ? 'New Contact' : contact.name[displayBy]
	const last = displayBy === 'first' ? contact.name.last : contact.name.first
	const title = (
		<div className='title'>
			{/*{closeBtn}*/}
			{first || last
				? <div className='fullName'>{contact.name.prefix}{first}{displayBy === 'last' && first && last ? ', ' : ' '}{last}</div>
				: null
			}
			<div className='company'>{contact.name.company}</div>
		</div>
	)

	const edits = editMode ? (
		<div className='edits'>
			<Button {...{type: 'text', text: 'done', classname: 'btn-done', noBg: true, onClickCallback: () => saveChange(contact.id)}}/>
			<Button {...{type: 'text', text: 'cancel', classname: 'btn-cancel', noBg: true, onClickCallback: cancelChange}}/>
			{ !isNewContact ? <Button {...{type: 'icon', icon: trash, classname: 'btn-trash', noBg: true, onClickCallback: () => removeContact(contact.id)}}/> : null }
		</div>
	) : (
		<div className='edits'>
			<Button {...{type: 'icon', icon: edit, classname: 'btn-edit', noBg: true, onClickCallback: () => setEditMode(!editMode)}}/>
			<Button {...{type: 'icon', icon: toggleStar(contact.id), classname: 'btn-fav', noBg: true, onClickCallback: () => toggleFav(contact.id)}}/>
		</div>
	)

	const { name, phone, email, address, dates, other, notes } = contactDetails

	return (
		<div className='contactCard'>
			{title}
			<div className='details'>
				{editMode ? <CardSection {...{type: 'name', data: name, editMode, onChangeCallback }}/> : null}
				<CardSection {...{type: 'phone', data: phone, editMode, onChangeCallback }}/>
				<CardSection {...{type: 'email', data: email, editMode, onChangeCallback}}/>
				<CardSection {...{type: 'address', data: address, editMode, onChangeCallback}}/>
				<CardSection {...{type: 'dates', data: dates, editMode, onChangeCallback}}/>
				<CardSection {...{type: 'other', data: other, editMode, onChangeCallback}}/>
				<CardSection {...{type: 'notes', data: notes, editMode, onChangeCallback}}/>
			</div>
			{edits}
		</div>
	)
}


const mapStateToProps = ({favouritesList, contactsList}) => ({
	favourites: favouritesList.favourites,
	displayBy: contactsList.displayBy
})

const mapDispatchToProps = {
	addFavourite, removeFavourite, updateContact, deleteContact, addContact, showContact
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactCard)
