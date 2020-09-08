import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { showContact } from './contactsListActions'
import {deepCloneArray} from '../../helpers/clone'
import ContactsListLetter from './components/contactsListLetter'
import ContactListItem from './components/contactsListItem'

function ContactsList({contacts, activeContact, searchTerms, sortBy, showContact}) {
	const rawContacts = deepCloneArray(contacts)
	const [phonebook, setPhonebook] = useState(rawContacts)
	const [letters, setLetters] = useState([])

	useEffect(() => setPhonebook(generatePhonebook(sortContacts(filterContacts(rawContacts)))), [contacts, searchTerms, sortBy])
	const isActive = contact => activeContact === contact.id

	// FUNCTIONS
	// FILTER
		// IN raw contacts
		// OUT filtered contacts for search terms
	// SORT
		// IN filtered contacts
		// OUT Sorted contacts based on sortBy
	// LETTER (including letter sort, already done?)
		// IN filtered and sorted contacts
		// OUT phonebook object with letters as keys and array of contacts for that letter as values

	function filterContacts(rawContacts) {
		if (searchTerms.length > 0) {
			return rawContacts.filter(contact => (
				searchTerms.every(term => (
					Object.values(contact.name).some(value => (
						String(value).toLocaleLowerCase().includes(term.toLocaleLowerCase())
					))
				))
			))
		} else return rawContacts
	}

	function sortContacts(filteredContacts) {
		function getNameForSorting(name, sortBy) {
			const secondName = sortBy == 'last' ? 'first' : 'last'
			if (name.first || name.last) {
				return name[sortBy] ? name[sortBy] : name[secondName]
			} else return name.company
		}

		return filteredContacts.sort((a, b) => {
			const nameA = getNameForSorting(a.name, sortBy).toLocaleLowerCase()
			const nameB = getNameForSorting(b.name, sortBy).toLocaleLowerCase()
			return nameA.localeCompare(nameB)
		})
	}
	// console.log(sortContacts(filterContacts(rawContacts)))

	function generatePhonebook(sortedContacts) {
		const letterSet = new Set()
		const regex = RegExp('^[a-zA-Z]')

		sortedContacts.forEach(contact => {
			const value = contact.name[sortBy]
			regex.test(value) ? letterSet.add(value[0]) : letterSet.add('#')
		})

		// Set Letters Here
		const sections = Array.from(letterSet)
		setLetters(sections)

		// const generatedPhonebook = Array.from(letterSet).map(letter => ({letter, contacts: []}))
		const generatedPhonebook = sections.reduce((acc, curr) => {
			acc[curr] = {contacts: []}
			return acc
		}, {})


		sortedContacts.forEach(contact => {
			const value = contact.name[sortBy]
			let array
			regex.test(value) ? array = value[0] : array = '#'
			generatedPhonebook[array].contacts.push(contact)
		})
		return generatedPhonebook
	}

	return (
		<div className='contactsList'>
			{letters.map(letter => {
				return (
					<div className='contactSection' key={letter}>
						<ContactsListLetter {...{letter}}  />
						<div className='contacts'>
							{phonebook[letter].contacts.map((contact) => {
								return <ContactListItem {...{key: contact.id, contact, isActive: isActive(contact), onClickCallback: () => showContact(contact.id)}} />
							})}
						</div>
					</div>
				)
			})}
		</div>
	)
}



const mapStateToProps = ({contactsList}) => ({
	contacts: contactsList.contacts,
	activeContact: contactsList.activeContact,
	sortBy: contactsList.sortBy,
	searchTerms: contactsList.searchTerms
})

const mapDispatchToProps = {
	showContact
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList)
