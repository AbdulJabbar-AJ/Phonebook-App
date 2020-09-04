import React, { useState } from 'react'
import { connect } from 'react-redux'
import CardSection from '../contactCardSection/contactCard-section'
import Button from '../button/button'
import { addFavourite, removeFavourite } from './../favouritesList/favouritesListActions'
// import 'babel-polyfill'
// import { showContact, hideContact, hideFav, showFav, hideGroupMem, addFavourite, removeFavourite, reduceGroups, editContact } from '../../redux/actions'

// import close from '../../../media/icons/close.svg'
import edit from '../../../media/icons/edit.svg'
import favTrue from '../../../media/icons/star.svg'
import favFalse from '../../../media/icons/star-outline.svg'
import trash from '../../../media/icons/trash.svg'
// import Edit from './edit'
// import style from '../mapStyle'
// import back from '../../../media/img/icons/back.svg'

function ContactCard({contact, favourites, addFavourite, removeFavourite}) {
	const [editMode, setEditMode] = useState(false);

	console.log(editMode)

// 	const { con, type, favs, favourite, rmFav, activeFav, activeContact, activeGroupMem,
// 		windowWidth, showFav, contacts, hideFav, hideContact, hideGroupMem, displayBy, editCon,
// 		beingEdited } = props

	const checkFav = id => favourites.map(fav => fav.contactId).includes(id)
	const toggleStar = id => checkFav(id) ? favTrue : favFalse


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

// 	const first = con.name[displayBy]
// 	const last = displayBy === 'first' ? con.name.last : con.name.first
	const first = contact.name.first
	const last = contact.name.last


// 	const closeBtn = windowWidth === 'large' ? '' : (
// 		<img className='btn-close' src={back} onClick={() => closeContactCard(type)} />
// 	)

// 	// const blur = this.props.windowWidth === 'large' ? '' : (
// 	//   <div className='blur' />
// 	// )


	const title = contact.name.first || contact.name.last ? (
		<div className='title'>
			{/*{closeBtn}*/}
			<div className='fullName'>{contact.name.prefix} {first} {last}</div>
			<div className='company'>{contact.name.company}</div>
		</div>
	) : (
		<div className='title'>
			{/*{closeBtn}*/}
			<div className='fullName'>{contact.name.company}</div>
		</div>
	)

	const edits = editMode ? (
		<div className='edits'>
			<Button {...{type: 'text', text: 'done', classname: 'btn-done', noBg: true, onClickCallback: () => setEditMode(!editMode)}}/>
			<Button {...{type: 'text', text: 'cancel', classname: 'btn-cancel', noBg: true, onClickCallback: () => setEditMode(!editMode)}}/>
			<Button {...{type: 'icon', icon: trash, classname: 'btn-trash', noBg: true, onClickCallback: () => setEditMode(!editMode)}}/>
		</div>
	) : (
		<div className='edits'>
			<Button {...{type: 'icon', icon: edit, classname: 'btn-edit', noBg: true, onClickCallback: () => setEditMode(!editMode)}}/>
			<Button {...{type: 'icon', icon: toggleStar(contact.id), classname: 'btn-fav', noBg: true, onClickCallback: () => toggleFav(contact.id)}}/>
		</div>
	)



	return (
		<div className='contactCard'>
			{title}
			<div className='details'>
				<CardSection {...{type: 'phone', data: contact.phone, editMode}}/>
				<CardSection {...{type: 'email', data: contact.email, editMode}}/>
				<CardSection {...{type: 'address', data: contact.address, editMode}}/>
				<CardSection {...{type: 'dates', data: contact.dates, editMode}}/>
				<CardSection {...{type: 'other', data: contact.other, editMode}}/>
				<CardSection {...{type: 'notes', data: contact.notes, editMode}}/>
			</div>
			{edits}
		</div>
	)
}



const mapStateToProps = ({contactsList, favouritesList}) => ({
	contact: contactsList.activeContact,
	favourites: favouritesList.favs
})
// contacts: state.contacts,
// favs: state.favs,
// groups: state.groups,
// activeFav: state.activeFavourite,
// activeGroupMem: state.activeGroupMember,
// beingEdited: state.beingEdited,
// displayBy: state.displayBy,
// windowWidth: state.windowWidth

const mapDispatchToProps = {
	addFavourite, removeFavourite,
}
// hideContact: () => dispatch(hideContact()),
// showContact: contact => dispatch(showContact(contact)),
// hideFav: () => dispatch(hideFav()),
// showFav: contact => dispatch(showFav(contact)),
// hideGroupMem: () => dispatch(hideGroupMem()),
// favourite: id => dispatch(addFavourite(id)),
// rmFav: id => dispatch(removeFavourite(id)),
// reduceGroups: id => dispatch(reduceGroups(id)),
// editCon: id => dispatch(editContact(id))

export default connect(mapStateToProps, mapDispatchToProps)(ContactCard)

