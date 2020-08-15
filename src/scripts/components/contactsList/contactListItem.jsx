import React from 'react'
import { connect } from 'react-redux'
import { showContact, showFav, showGroupMem } from '../../redux/actions'

function ContactListItem ({con, type, displayBy, active, activeFav, activeMem, showContact, showFav, showGroupMem}) {
	function checkType (con, type) {
		switch (type) {
			case 'Contact':
				return showContact(con)
			case 'Favourite':
				return showFav(con)
			case 'GroupMem':
				return showGroupMem(con)
		}
	}

	const first = con.name[displayBy]
	const last = displayBy === 'first' ? con.name.last : con.name.first
	const company = con.name.first || con.name.last ? '' : con.name.company
	const isActive = () => {
		if (con.id === active.id) {
			return ' active'
		} else return ''
	}
	const isActiveFav = () => {
		if (activeFav && con.id === activeFav.id) {
			return ' activeFav'
		} else return ''
	}
	const isActiveMem = () => {
		if (activeMem && con.id === activeMem.id) {
			return ' activeMem'
		} else return ''
	}

	return (
		<div className={`contact${isActive()}${isActiveFav()}${isActiveMem()}`} onClick={() => checkType(con, type)} >
			<li className='name'>{first} {last} {company}</li>
		</div>
	)
}

const mapStateToProps = state => ({
	displayBy: state.displayBy,
	active: state.activeContact,
	activeFav: state.activeFavourite,
	activeMem: state.activeGroupMember
})

const mapDispatchToProps = dispatch => {
	return {
		showContact: contact => dispatch(showContact(contact)),
		showFav: contact => dispatch(showFav(contact)),
		showGroupMem: contact => dispatch(showGroupMem(contact))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactListItem)
