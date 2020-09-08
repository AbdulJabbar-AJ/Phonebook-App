import React from 'react'
import { connect } from 'react-redux'
import { removeFavourite, showFavourite } from '../../components/favouritesList/favouritesListActions'
import View from '../view'
import FavouritesList from '../../components/favouritesList/favouritesList'
import ContactCard from '../../components/contactCard/contactCard'
import Button from '../../components/button/button'

const FavouritesView = ({contacts, favourites, activeFavourite}) => {
	const contact = contacts.find(contact => contact.id === activeFavourite)

	const heading = (
		<div className='sidePanel-heading favouritesView-sidePanelHeading'>
			<div className='heading'>Favourites</div>
		</div>
	)

	const side = <div className='sidePanel'><FavouritesList /></div>
	const main = <div className='mainPanel'><ContactCard {...{contact, showContactCallback: showFavourite}}/></div>

	return <View classname='contactsView' heading={heading} splitView={true} panels={{side, main}}/>
}

// con, type, favs, favourite, rmFav, activeFav, activeContact, activeGroupMem,
// 	windowWidth, showFav, contacts, hideFav, hideContact, hideGroupMem, displayBy, editCon,
// 	beingEdited

const mapStateToProps = ({contactsList, favouritesList}) => ({
	contacts: contactsList.contacts,
	favourites: favouritesList.favourites,
	activeFavourite: favouritesList.activeFavourite
})

const mapDispatchToProps = { removeFavourite, showFavourite }

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesView)
