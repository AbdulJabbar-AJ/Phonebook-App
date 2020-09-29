import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {showFavourite, addFavourite, removeFavourite} from './favouritesListActions'
import ContactListItem from '../contactsList/components/contactsListItem'
import Button from '../button/button'
import remove from '../../../media/icons/remove-circle.svg'
import BlankMessage from '../blankMessage/blankMessage'

const FavouritesList = ({contacts, favourites, activeFavourite, showFavourite, removeFavourite, showFavouriteCallback}) => {
	const [editFavs, setEditFavs] = useState(false)

	useEffect(() => {
		if (favourites.length === 0) {
			if (editFavs) {
				flipEditFavs()
				showFavourite({})
			}
		}
	},[favourites])

	const flipEditFavs = () => setEditFavs(!editFavs)
	const isActive = id => activeFavourite === id


	return (
		<div className='favouritesList'>
			{favourites.length === 0 ? <BlankMessage message='No Favourite Contacts'/> : null}
			{favourites.map(favourite => {
				const contact = contacts.find(contact => contact.id === favourite)
				return (
					<div key={contact.id} className='favContact'>
						{editFavs ? <Button {...{type: 'icon', icon: remove, classname: 'removeEntry', onClickCallback: () => removeFavourite(contact.id), noBg: true}} /> : null}
						<ContactListItem {...{key: contact.id, contact, isActive: isActive(contact.id), onClickCallback: () => showFavouriteCallback(contact.id)}} />
					</div>
					)
			})}
			{favourites.length > 0 ? <Button {...{type: 'text', text: editFavs ? 'done' : 'edit', classname: 'btn-editFavs', onClickCallback: flipEditFavs, textPadding: 'medium'}} /> : null }
		</div>
	)
}

const mapStateToProps = ({contactsList, favouritesList}) => ({
	contacts: contactsList.contacts,
	favourites: favouritesList.favourites,
})
const mapDispatchToProps = {
	showFavourite, addFavourite, removeFavourite
}

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesList)
