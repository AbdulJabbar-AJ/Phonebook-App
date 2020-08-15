import React, {useState} from 'react'
import { connect } from 'react-redux'
import 'babel-polyfill'
import { showContact, hideContact, hideFav, showFav, hideGroupMem, addFavourite, removeFavourite, reduceGroups, editContact } from '../../redux/actions'
import Phone from '../contactCardSection/components/section-phone'
import Address from '../contactCardSection/components/section-address'
import Email from '../contactCardSection/components/section-email'
import Dates from '../contactCardSection/components/section-dates'
import Other from '../contactCardSection/components/section-other'
import Notes from '../contactCardSection/components/section-notes'
// import close from '../../../media/img/icons/close.svg'
import edit from '../../../media/img/icons/edit.svg'
import trash from '../../../media/img/icons/trash.svg'
import favTrue from '../../../media/img/icons/favTrue.svg'
import favFalse from '../../../media/img/icons/favFalse2.svg'
// import Edit from './edit'
// import style from '../mapStyle'
import back from '../../../media/img/icons/back.svg'

function Card(props) {
	const { con, type, favs, favourite, rmFav, activeFav, activeContact, activeGroupMem,
		windowWidth, showFav, contacts, hideFav, hideContact, hideGroupMem, displayBy, editCon,
		beingEdited } = props

	const [editMode, setEditMode] = useState(false);

	function checkFav(id) {
		let favourites = favs.map(fav => fav.conId)
		return favourites.includes(id)
	}

	function toggleStar(id) {
		if (checkFav(id)) {
			return favTrue
		} else return favFalse
	}

	function toggleFav(id) {
		let next

		if (favs.length === 0) {
			favourite(id)
		} else if (checkFav(id)) {
			rmFav(id)
		} else favourite(id)

		if (activeFav && activeFav.id === id) {
			if (favs.length > 1) {
				if (favs[0].conId === id) {
					next = favs[1].conId
				} else {
					next = favs[0].conId
				}
				if (windowWidth !== 'small') {
					showFav(contacts.find(con => con.id === next))
				} else hideFav()
			} else hideFav()
		}
	}

	function checkGroup(id, group) {
		for (let i = 0; i < group.length; i++) {
			if (group.members.includes(id)) {
				return true
			}
		}
	}

	function closeContactCard(type) {
		switch (type) {
			case 'Contact':
				return hideContact()
			case 'Favourite':
				return hideFav()
			case 'GroupMem':
				return hideGroupMem()
		}
	}

	function idTypeCheck(type) {
		switch (type) {
			case 'Contact':
				return activeContact.id
			case 'Favourite':
				return activeFav.id
			case 'GroupMem':
				return activeGroupMem.id
		}
	}

// 	async showMap (address, index) {
// 		let location
//
// 		// If there is a postcode value and its over the absolute minimum of 6 long
// 		if (address.postcode && address.postcode.length >= 6) {
// 			let pc = address.postcode
// 			// If the postcode is typed with a space, assume it's valid for now
// 			if (pc.split(' ').length === 2) {
// 				location = `${pc.split(' ')[0]}+${pc.split(' ')[1]}`
// 				// Or if it got mulitple spaces and is invild
// 			} else if (pc.split(' ').length > 2) {
// 				return
// 			} else {
// 				location = `${pc.slice(0, pc.length - 3)}+${pc.slice(pc.length - 3, pc.length)}`
// 			}
// 		} else if (address.line1 || address.line2) {
// 			let l1, l2
// 			if (address.line1 && address.line2) {
// 				l1 = address.line1.split(' ')
// 				l2 = address.line2.split(' ')
// 				location = `${l1.join('+')}+${l2.join('+')}`
// 			} else if (address.line1) {
// 				l1 = address.line1.split(' ')
// 				location = l1.join('+')
// 			} else {
// 				l2 = address.line2.split(' ')
// 				location = l2.join('+')
// 			}
// 		}
// 		if (!address.postcode && location && address.city) {
// 			location = location.concat('+', address.city.split(' ').join('+'))
// 		}
//
// 		const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyBrp5MVEPZWkfLcn-Lh_prB-yJvF8qZXgs`)
// 		const result = await response.json()
//
// 		let coords
// 		if (result.status === 'OK') {
// 			coords = result.results[0].geometry.location
// 		}
//
// 		let center
// 		if (coords) {
// 			center = `${coords.lat},${coords.lng}`
// 			return center
// 		} else return Promise.reject(result.status)
// 	}
//
	const first = con.name[displayBy]
	const last = displayBy === 'first' ? con.name.last : con.name.first

	const closeBtn = windowWidth === 'large' ? '' : (
		<img className='btn-close' src={back} onClick={() => closeContactCard(type)} />
	)

	const title = con.name.first || con.name.last ? (
		<div className='title'>
			{closeBtn}
			<div className='fullName'>{con.name.prefix} {first} {last}</div>
			<div className='company'>{con.name.company}</div>
		</div>
	) : (
		<div className='title'>
			{closeBtn}
			<div className='fullName'>{con.name.company}</div>
		</div>
	)

	// const blur = this.props.windowWidth === 'large' ? '' : (
	//   <div className='blur' />
	// )

	let card = con.id ? (
		<div className='contactCard'>
			{title}
			<div className='details'>
				<Phone phone= {con.phone} />
				<Email email={con.email} />
				<Address address={con.address} />
				<Dates dates={con.dates} />
				<Other other={con.other} />
				<Notes notes={con.notes} />
			</div>

			<div className='edits'>
				<img className='btn-edit' src={edit} onClick={() => setEditMode(!editMode)} />
				<img className='btn-fav' src={toggleStar(con.id)} onClick={() => toggleFav(con.id)} />
			</div>
		</div>
	) : (<div />)

	// if (editMode === con.id) {
	// 	card = (() => <Edit {...props} />)()
	// }

	// 180px is largest size without copyright text on img
	// con.address.forEach((addr, index) => {
	// 	showMap(addr, index)
	// 		.then(response => {
	// 			if (response) {
	// 				document.getElementById(`googleMaps${index}`).src =
	// 					`https://maps.googleapis.com/maps/api/staticmap?center=${response}&zoom=15&size=180x180&maptype=roadmap&markers=tiny|${response}&${style}&key=AIzaSyBrp5MVEPZWkfLcn-Lh_prB-yJvF8qZXgs`
	// 				// console.log(`Map ${index} added`)
	// 			}
	// 		})
	// 		.catch(error => {
	// 			// console.log(`Map ${index} Error! Could not locate address`)
	// 			// console.error(error)
	// 		})
	// })

	return card
}

const mapStateToProps = state => {
	return {
		contacts: state.contacts,
		favs: state.favs,
		groups: state.groups,
		activeFav: state.activeFavourite,
		activeGroupMem: state.activeGroupMember,
		beingEdited: state.beingEdited,
		displayBy: state.displayBy,
		windowWidth: state.windowWidth
	}
}

const mapDispatchToProps = dispatch => {
	return {
		hideContact: () => dispatch(hideContact()),
		showContact: contact => dispatch(showContact(contact)),
		hideFav: () => dispatch(hideFav()),
		showFav: contact => dispatch(showFav(contact)),
		hideGroupMem: () => dispatch(hideGroupMem()),
		favourite: id => dispatch(addFavourite(id)),
		rmFav: id => dispatch(removeFavourite(id)),
		reduceGroups: id => dispatch(reduceGroups(id)),
		editCon: id => dispatch(editContact(id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)

