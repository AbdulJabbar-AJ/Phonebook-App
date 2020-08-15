import React from 'react'
import { connect } from 'react-redux'
import { showContact, hideContact, newContact, windowInit, windowResize, contactsScrollTop, logPrevContact, filterSearch } from '../../redux/actions'
import View from '../view'
import Searchbar from '../../components/search/searchbar'
import Add from '../../components/addContactButton/addContact'
import ContactList from '../../components/contactsList/contactsList'
import Card from '../../components/contactCard/contactCard'
// import AddContact from '../../components/add'
// import Contact from '../../components/contact/contact'

function ContactsView (props) {
	const { contacts, newContact, sortBy, filteredContacts, activeContact, windowWidth, contactsScroll, showContact, windowInit, contactsScrollTop, newCon, hideContact, logPrevContact, filterSearch } = props

//   componentWillMount () {
//     if (window.innerWidth < 560) {
//       windowInit('small')
//     } else {
//       windowInit('large')
//     }
//   }
//   componentDidMount () {
//     if (!this.props.activeContact && window.innerWidth >= 560) {
//       this.props.showContact(this.props.contacts[0])
//     }
//   }

	const heading = () => (
		<div className='heading'>
			<h1>Contacts</h1>
			<Add {... {activeContact, logPrevContact, newCon, hideContact}} />
			<Searchbar {...{filterSearch}} />
		</div>
	)

	const renderSidePanel = () => (
		<div className="contactsPanel">
			<ContactList {...{contacts, filteredContacts, sortBy, contactsScroll, contactsScrollTop}} />
		</div>
	)

	const renderMainPanel = () => (
		<div className="contactCardPanel">
			{activeContact ? <Card con={activeContact} type='Contact' /> : null}
			{/*{newContact ? <AddContact /> : null}*/}
		</div>
	)

    return (
    	<View {...{
			classname: 'contacts',
			headingType: 'complex',
			heading: heading(),
			sidePanel: renderSidePanel(),
			mainPanel: renderMainPanel()
		}} />
	)
}

const mapStateToProps = state => ({
  contacts: state.contacts,
  newContact: state.newContact,
  sortBy: state.sortBy,
  filteredContacts: state.filteredContacts,
  activeContact: state.activeContact,
  windowWidth: state.windowWidth,
  contactsScroll: state.contactsScroll
})

const mapDispatchToProps = dispatch => {
  return {
  	showContact: contact => dispatch(showContact(contact)),
    windowInit: width => dispatch(windowInit(width)),
    contactsScrollTop: distTop => dispatch(contactsScrollTop(distTop)),
	newCon: boolean => dispatch(newContact(boolean)),
	hideContact: () => dispatch(hideContact()),
	logPrevContact: contact => dispatch(logPrevContact(contact)),
	filterSearch: terms => dispatch(filterSearch(terms))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsView)
