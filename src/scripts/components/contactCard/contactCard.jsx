import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { deepCloneObject } from '../../helpers/clone'
import CardSection from '../contactCardSection/contactCardSection'
import Button from '../button/button'
import { removeDeletedGroupMember, showGroupContact } from '../groupsList/groupsListActions'
import { addFavourite, removeFavourite } from '../favouritesList/favouritesListActions'
import { updateContact, deleteContact, addContact, showContact } from '../contactsList/contactsListActions'
import validate from '../../helpers/validate'
import edit from '../../../media/icons/edit.svg'
import favTrue from '../../../media/icons/favTrue.svg'
import favFalse from '../../../media/icons/favFalse.svg'
import trash from '../../../media/icons/trash.svg'
import close from '../../../media/icons/close.svg'

// TODO - NAP - Make edit mode redux store, so can switch between tabs

function ContactCard(props) {
	const { contact, favourites, addFavourite, removeFavourite, displayBy, updateContact, deleteContact, closeContactCallback,
		addContact, showContact, isNewContact, setIsNewContact, removeDeletedGroupMember, narrowView, activeGroupContact, showGroupContact
	} = props

	const initialDetails = deepCloneObject(contact)
	const [editMode, setEditMode] = useState(false)
	const [contactDetails, setContactDetails] = useState(initialDetails)
	const [validationMessage, setValidationMessage] = useState('')
	const cardRef = useRef(null)

	useEffect(() => {
		setContactDetails(deepCloneObject(contact))
		isNewContact ? setEditMode(true) : setEditMode(false)
		cardRef.current.scroll({top: 0})
	}, [contact])

	const onChangeCallback = (section, data) => setContactDetails(prevState => ({ ...prevState, [section]: data }))
	const checkFav = id => favourites.some(favId => favId === id)
	const toggleStar = id => checkFav(id) ? favTrue : favFalse

	function saveChange(id) {
		if (validate.name(contactDetails.name)) {
			if (isNewContact) {
				addContact(contactDetails)
				setIsNewContact(false)
				showContact(id)
			} else {
				updateContact(id, contactDetails)
			}
			setEditMode(!editMode)
		} else {
			setValidationMessage('You must enter at least a first, last, or company name')
			setTimeout(() => setValidationMessage(''), 5000)
			cardRef.current.scroll({top: 0})
		}
	}

	function cancelChange() {
		isNewContact ? setIsNewContact(false) : setContactDetails(initialDetails)
		setEditMode(!editMode)
	}

	function removeContact(id) {
		deleteContact(id)
		removeFavourite(id)
		removeDeletedGroupMember(id)
		id === activeGroupContact && showGroupContact('')
		setEditMode(!editMode)
	}

	function toggleFav(id) {
		if (favourites.length === 0) {
			addFavourite(id)
		} else if (checkFav(id)) {
			removeFavourite(id)
		} else addFavourite(id)

	}

	// This must come from props not state, as we don't want it to update on change of edit fields
	const first = isNewContact ? 'New Contact' : contact.name[displayBy]
	const last = displayBy === 'first' ? contact.name.last : contact.name.first
	const { prefix, company } = contact.name
	const closeBtn = narrowView && !isNewContact ? <Button type='icon' classname='btn-close' icon={close} noBg={false} onClickCallback={closeContactCallback} /> : null
	const title = (
		<div className='title'>
			{closeBtn}
			{first || last
				? <div className='fullName'>{prefix ? `${prefix} ` : null}{first}{displayBy === 'last' && first && last ? ', ' : ' '}{last}</div>
				: null
			}
			<div className='company'>{company}</div>
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
			<div className='details' ref={cardRef}>
				{editMode ? <CardSection {...{type: 'name', data: name, editMode, onChangeCallback, validationMessage, narrowView}}/> : null}
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


const mapStateToProps = ({favouritesList, contactsList, view, groupsList}) => ({
	favourites: favouritesList.favourites,
	displayBy: contactsList.displayBy,
	narrowView: view.narrowView,
	activeGroupContact: groupsList.activeGroupContact,
})

const mapDispatchToProps = {
	addFavourite, removeFavourite, updateContact, deleteContact, addContact, showContact, removeDeletedGroupMember, showGroupContact
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactCard)
