import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { deepCloneObject } from '../../helpers/clone'
import CardSection from '../contactCardSection/contactCardSection'
import Button from '../button/button'
import { addFavourite, removeFavourite } from '../favouritesList/favouritesListActions'
import { updateContact, deleteContact } from '../contactsList/contactsListActions'

import edit from '../../../media/icons/edit.svg'
import favTrue from '../../../media/icons/star.svg'
import favFalse from '../../../media/icons/star-outline.svg'
import trash from '../../../media/icons/trash.svg'
// import close from '../../../media/icons/close.svg'
// import Edit from './edit'
// import style from '../mapStyle'
// import back from '../../../media/img/icons/back.svg'

// NEED TO SCROLL TO TOP OF CONTACT WHEN SWITCHING BETWEEN CONTACTS

function ContactCard({contact, favourites, addFavourite, removeFavourite, showContactCallback, updateContact, deleteContact, newContact, newId, closeNewContact}) {
	const initialDetails = deepCloneObject(contact)
	const [editMode, setEditMode] = useState(false)
	const [contactDetails, setContactDetails] = useState(initialDetails)


	useEffect(() => {
		setContactDetails(deepCloneObject(contact))
		setEditMode(false)
	}, [contact])

	// useEffect(() => {
	// 	const abc = {
	// 		id: newId,
	// 		name: {first: '', last: ''},
	// 		phone: [],
	// 		email: [],
	// 		address: [],
	// 		dates: [],
	// 		other: [],
	// 		notes: ''
	// 	}
	//
	// 	if (newContact) {
	// 		setContactDetails(deepCloneObject(abc))
	// 		setEditMode(true)
	// 	}
	//
	// }, [newContact])

	const onChangeCallback = (section, data) => setContactDetails(prevState => ({ ...prevState, [section]: data }))
	const flipEditMode = () => setEditMode(!editMode)
	const checkFav = id => favourites.some(favId => favId === id)
	const toggleStar = id => checkFav(id) ? favTrue : favFalse

	function saveChange(id) {
		updateContact(id, contactDetails)
		showContactCallback(id)
		flipEditMode()
	}

	function cancelChange() {
		setContactDetails(initialDetails)
		flipEditMode()
	}

	function removeContact(id) {
		deleteContact(id)
		flipEditMode()
		// NEED TO MAKE SURE IT SELECTS A DIFFERENT CONTACT AFTER DELETING
		// BUT IF VIEW IS NARROW, WANT TO JUST REVERT BACK TO CONTACTSLIST
		// SO MAKE A closeContact FUNCTION WHICH WILL GO BACK TO LIST IF NARROW OR ACTIVATE FIRST ITEM IF WIDE
	}

	function toggleFav(id) {
		let next

		if (favourites.length === 0) {
			addFavourite(id)
		} else if (checkFav(id)) {
			removeFavourite(id)
		} else addFavourite(id)

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

// 	function closeContactCard(type) {
// 		switch (type) {
// 			case 'Contact':
// 				return hideContact()
// 			case 'Favourite':
// 				return hideFav()
// 			case 'GroupMem':
// 				return hideGroupMem()
// 		}
// 	}
//
// 	function idTypeCheck(type) {
// 		switch (type) {
// 			case 'Contact':
// 				return activeContact.id
// 			case 'Favourite':
// 				return activeFav.id
// 			case 'GroupMem':
// 				return activeGroupMem.id
// 		}
// 	}
//
// // 	async showMap (address, index) {}

// 	const closeBtn = windowWidth === 'large' ? '' : (
// 		<img className='btn-close' src={back} onClick={() => closeContactCard(type)} />
// 	)

// 	// const blur = this.props.windowWidth === 'large' ? '' : (
// 	//   <div className='blur' />
// 	// )

	// 	const first = con.name[displayBy]
	// 	const last = displayBy === 'first' ? con.name.last : con.name.first
	const first = contact.name.first
	const last = contact.name.last

	// This must come from the contact and not contactDetails because I don't want it to change until changes have been submitted
	const title = (
		<div className='title'>
			{/*{closeBtn}*/}
			{first || last ? <div className='fullName'>{contact.name.prefix} {first} {last}</div> : null}
			<div className='company'>{contact.name.company}</div>
		</div>
	)

	// const title = first || name ? (
	// 	<div className='title'>
	// 		{/*{closeBtn}*/}
	// 		<div className='fullName'>{name.prefix} {first} {last}</div>
	// 		<div className='company'>{name.company}</div>
	// 	</div>
	// ) : (
	// 	<div className='title'>
	// 		{/*{closeBtn}*/}
	// 		<div className='fullName'>{name.company}</div>
	// 	</div>
	// )

	const edits = editMode ? (
		<div className='edits'>
			<Button {...{type: 'text', text: 'done', classname: 'btn-done', noBg: true, onClickCallback: () => saveChange(contact.id)}}/>
			<Button {...{type: 'text', text: 'cancel', classname: 'btn-cancel', noBg: true, onClickCallback: cancelChange}}/>
			<Button {...{type: 'icon', icon: trash, classname: 'btn-trash', noBg: true, onClickCallback: () => removeContact(contact.id)}}/>
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



const mapStateToProps = ({favouritesList}) => ({
	favourites: favouritesList.favourites
})
// contacts: state.contacts,
// groups: state.groups,
// activeFav: state.activeFavourite,
// activeGroupMem: state.activeGroupMember,
// displayBy: state.displayBy,
// windowWidth: state.windowWidth

const mapDispatchToProps = {
	addFavourite, removeFavourite, updateContact, deleteContact
}
// hideContact: () => dispatch(hideContact()),
// hideFav: () => dispatch(hideFav()),
// hideGroupMem: () => dispatch(hideGroupMem()),
// favourite: id => dispatch(addFavourite(id)),
// rmFav: id => dispatch(removeFavourite(id)),
// reduceGroups: id => dispatch(reduceGroups(id)),
// editCon: id => dispatch(editContact(id))

export default connect(mapStateToProps, mapDispatchToProps)(ContactCard)
