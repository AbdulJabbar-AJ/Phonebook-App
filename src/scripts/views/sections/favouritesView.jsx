import React from 'react'
import View from '../view'

const FavouritesView = () => {
	const heading = (() => (
		<div className='sidePanel-heading'>
			<div className='heading'>Favourites</div>
		</div>
	))()

	const side = (() => (
		<div className='sidePanel'>Favourites Side Panel</div>
	))()

	const main = (() => (
		<div className='mainPanel'>
			<div>FAVOURITES MAIN PANEL</div>
		</div>
	))()

	return (
		<View classname='favouritesView' heading={heading} splitView={true} panels={{side, main}}/>
	)
}

export default FavouritesView