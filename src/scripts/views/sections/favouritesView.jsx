import React from 'react'
import { connect } from 'react-redux'
import { removeFavourite, showFavourite } from '../../components/favouritesList/favouritesListActions'
import View from '../view'
import FavouritesList from '../../components/favouritesList/favouritesList'
import ContactCard from '../../components/contactCard/contactCard'
import BlankMessage from '../../components/blankMessage/blankMessage'

// TODO - Move to next favourite it current removed

const FavouritesView = ({contacts, favourites, activeFavourite}) => {
	const contact = contacts.find(contact => contact.id === activeFavourite || false)

	const heading = (
		<div className='sidePanel-heading sidePanel-heading favouritesView-sidePanelHeading'>
			<div className='heading'>Favourites</div>
		</div>
	)

	const side = <div className='sidePanel'><FavouritesList/></div>
	const main = <div className='mainPanel'>{contact ? <ContactCard {...{contact}}/> : <BlankMessage message='No Favourite selected'/>}</div>

	return <View classname='favouritesView' heading={heading} splitView={true} panels={{side, main}}/>
}

const mapStateToProps = ({contactsList, favouritesList}) => ({
	contacts: contactsList.contacts,
	favourites: favouritesList.favourites,
	activeFavourite: favouritesList.activeFavourite
})

const mapDispatchToProps = { removeFavourite, showFavourite }

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesView)
