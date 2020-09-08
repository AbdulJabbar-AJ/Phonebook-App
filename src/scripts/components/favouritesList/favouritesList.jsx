import React, {useState} from 'react'
import { connect } from 'react-redux'
import { showFavourite, removeFavourite } from './favouritesListActions'
import ContactListItem from '../contactsList/components/contactsListItem'
import Button from '../button/button'
import remove from '../../../media/icons/remove-circle.svg'

const FavouritesList = ({contacts, favourites, activeFavourite, showFavourite, removeFavourite}) => {
	const [editFavs, setEditFavs] = useState(false)

	const flipEditFavs = () => setEditFavs(!editFavs)
	const isActive = contact => activeFavourite === contact.id

	return (
		<div className='favouritesList'>
			{favourites.map(favourite => {
				const contact = contacts.find(contact => contact.id === favourite)
				return (
					<div key={contact.id} className='favContact'>
						{editFavs ? <Button {...{type: 'icon', icon: remove, classname: 'removeEntry', onClickCallback: () => removeFavourite(contact.id), noBg: true}} /> : null}
						<ContactListItem {...{key: contact.id, contact, isActive: isActive(contact), onClickCallback: () => showFavourite(contact.id)}} />
					</div>
					)
			})}
			<Button {...{type: 'text', text: editFavs ? 'done' : 'edit', classname: 'btn-editFavs', onClickCallback: flipEditFavs, textPadding: 'medium'}} />
		</div>
	)
}


const mapStateToProps = ({contactsList, favouritesList}) => ({
	contacts: contactsList.contacts,
	favourites: favouritesList.favourites,
	activeFavourite: favouritesList.activeFavourite
})
const mapDispatchToProps = {
	showFavourite, removeFavourite
}

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesList)
