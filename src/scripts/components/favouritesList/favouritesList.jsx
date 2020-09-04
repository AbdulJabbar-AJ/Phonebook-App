import React from 'react'
import { connect } from 'react-redux'

const ContactsList = ({favourites}) => {
	return (
		<div className='contactsList'>
			{ favourites.map(contact => <div key={contact.id} onClick={() => showContact(contact)} >{contact.name.first} {contact.name.last}</div>) }
		</div>
	)
}


const mapStateToProps = ({favouritesList}) => ({
	favourites: favouritesList.favs
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList)
