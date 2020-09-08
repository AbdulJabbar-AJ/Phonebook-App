import React from 'react'
import { connect } from 'react-redux'
import { showFavourite } from './favouritesListActions'

const FavouritesList = ({contacts, favourites, showFavourite, displayBy}) => {
	return (
		<div className='favouritesList'>
			{favourites.map(favourite => {
				const contact = contacts.find(contact => contact.id === favourite)
				return <div key={contact.id} onClick={() => showFavourite(contact.id)}>{contact.name.first} {contact.name.last}</div>
			})}
		</div>
	)
}


const mapStateToProps = ({contactsList, favouritesList}) => ({
	contacts: contactsList.contacts,
	favourites: favouritesList.favourites,
})
const mapDispatchToProps = {
	showFavourite
}

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesList)
