import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { removeFavourite, showFavourite, setFavourite } from '../../components/favouritesList/favouritesListActions'
import View from '../view'
import FavouritesList from '../../components/favouritesList/favouritesList'
import ContactCard from '../../components/contactCard/contactCard'
import BlankMessage from '../../components/blankMessage/blankMessage'
import classNames from 'classnames'

const FavouritesView = ({contacts, favourites, activeFavourite, showFavourite, narrowView, setFavourite, favouriteObject}) => {
	const [slideLeft, setSlideLeft] = useState(false)
	useEffect(showCard, [narrowView, activeFavourite, favourites])

	function showCard() {
		if (!activeFavourite) {
			if (!narrowView && favourites.length > 0) {
				setFavourite(contacts.find(contact => contact.id === favourites[0]))
			} else {
				setFavourite({})
			}
		} else if (favourites.includes(activeFavourite)) {
			setFavourite(contacts.find(contact => contact.id === activeFavourite))
		} else {
			showFavourite('')
		}
	}

	function activateFavourite(id) {
		showFavourite(id)
		setSlideLeft(true)
		setTimeout(() => setSlideLeft(false),1000)
	}

	const heading = (
		<div className='sidePanel-heading sidePanel-heading favouritesView-sidePanelHeading'>
			<div className='heading'>Favourites</div>
		</div>
	)

	const side = <div className='sidePanel'><FavouritesList activeFavourite={favouriteObject.id} showFavouriteCallback={activateFavourite}/></div>

	const main = favouriteObject.hasOwnProperty('id')
		? <div className={classNames('mainPanel', {slideLeft})}><ContactCard {...{contact: favouriteObject, closeContactCallback: () => showFavourite('') }}/></div>
		: <BlankMessage message='No Favourite selected'/>

	return <View {...{ classname: 'favouritesView', heading, splitView: true, panels: {side, main}, narrowView }} />
}

const mapStateToProps = ({contactsList, favouritesList, view}) => ({
	contacts: contactsList.contacts,
	favourites: favouritesList.favourites,
	activeFavourite: favouritesList.activeFavourite,
	narrowView: view.narrowView,
	favouriteObject: favouritesList.favouriteObject
})

const mapDispatchToProps = { removeFavourite, showFavourite, setFavourite }

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesView)
