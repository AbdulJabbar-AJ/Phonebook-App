import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {showFavourite, addFavourite, removeFavourite, setDummyFavs} from './favouritesListActions'
import ContactListItem from '../contactsList/components/contactsListItem'
import Button from '../button/button'
import remove from '../../../media/icons/remove-circle.svg'
import BlankMessage from '../blankMessage/blankMessage'

const FavouritesList = ({contacts, favourites, activeFavourite, showFavourite, addFavourite, removeFavourite, dummyFavsSet, setDummyFavs}) => {
	const [editFavs, setEditFavs] = useState(false)
	const [noFavs, setNoFavs] = useState(favourites.length === 0)

	// Dummy Init Favs
	useEffect(() => {
		if (!dummyFavsSet) {
			for (let i = 3; i < 8; i++) {
				addFavourite(contacts[i].id)
			}
			setDummyFavs()
		}
	}, [])

	useEffect(() => {
		if (favourites.length === 0) {
			setNoFavs(true)
			if (editFavs) {
				flipEditFavs()
				showFavourite('')
			}
		} else {
			setNoFavs(false)
			activeFavourite === '' || !favourites.includes(activeFavourite) ? showFavourite(favourites[0]) : null
		}
	},[favourites])

	const flipEditFavs = () => setEditFavs(!editFavs)
	const isActive = contact => activeFavourite === contact.id

	return (
		<div className='favouritesList'>
			{noFavs ? <BlankMessage message='No Favourite Contacts'/> : null}
			{favourites.map(favourite => {
				const contact = contacts.find(contact => contact.id === favourite)
				return (
					<div key={contact.id} className='favContact'>
						{editFavs ? <Button {...{type: 'icon', icon: remove, classname: 'removeEntry', onClickCallback: () => removeFavourite(contact.id), noBg: true}} /> : null}
						<ContactListItem {...{key: contact.id, contact, isActive: isActive(contact), onClickCallback: () => showFavourite(contact.id)}} />
					</div>
					)
			})}
			{!noFavs ? <Button {...{type: 'text', text: editFavs ? 'done' : 'edit', classname: 'btn-editFavs', onClickCallback: flipEditFavs, textPadding: 'medium'}} /> : null }
		</div>
	)
}

const mapStateToProps = ({contactsList, favouritesList}) => ({
	contacts: contactsList.contacts,
	favourites: favouritesList.favourites,
	activeFavourite: favouritesList.activeFavourite,
	dummyFavsSet: favouritesList.dummyFavsSet
})
const mapDispatchToProps = {
	showFavourite, addFavourite, removeFavourite, setDummyFavs
}

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesList)
