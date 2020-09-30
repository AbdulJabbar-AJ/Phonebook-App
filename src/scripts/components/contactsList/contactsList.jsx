import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { setTopContact } from './contactsListActions'
import { deepCloneArray } from '../../helpers/clone'
import ContactsListLetter from './components/contactsListLetter'
import ContactListItem from './components/contactsListItem'
import BlankMessage from '../blankMessage/blankMessage'

function ContactsList({contacts, activeContact, searchTerms, sortBy, showContactCallback, setTopContact}) {
	const rawContacts = deepCloneArray(contacts)
	const [phonebook, setPhonebook] = useState({})
	const [letters, setLetters] = useState([])

	useEffect(() => {
		setPhonebook(generatePhonebook(sortContacts(filterContacts(rawContacts))))
	}, [contacts, searchTerms, sortBy])

	useEffect(() => {
		const letters = Object.keys(phonebook)
		letters.length > 0 ? setTopContact(phonebook[letters[0]].contacts[0].id) : null
	}, [phonebook])


	const isActive = id => activeContact.id === id

	function filterContacts(rawContacts) {
		// IN raw contacts
		// OUT filtered contacts for search terms
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

	function getNameForSorting(name, sortBy) {
		const secondName = sortBy === 'last' ? 'first' : 'last'
		if (name.first || name.last) {
			return name[sortBy] ? name[sortBy] : name[secondName]
		} else return name.company
	}

	function sortContacts(filteredContacts) {
		// IN filtered contacts
		// OUT Sorted contacts based on sortBy
		return filteredContacts.sort((a, b) => {
			const nameA = getNameForSorting(a.name, sortBy).toLocaleLowerCase()
			const nameB = getNameForSorting(b.name, sortBy).toLocaleLowerCase()
			return nameA.localeCompare(nameB)
		})
	}

	function generatePhonebook(sortedContacts) {
		// IN filtered and sorted contacts
		// OUT phonebook object with letters as keys and array of contacts for that letter as values
		const letterSet = new Set()
		const regex = RegExp('^[a-zA-Z]')

		sortedContacts.forEach(contact => {
			const value = getNameForSorting(contact.name, sortBy)
			regex.test(value) ? letterSet.add(value[0].toUpperCase()) : letterSet.add('#')
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
			const value = getNameForSorting(contact.name, sortBy)
			let array
			regex.test(value) ? array = value[0].toUpperCase() : array = '#'
			generatedPhonebook[array].contacts.push(contact)
		})
		return generatedPhonebook
	}

	return (
		<div className='contactsList'>
			{letters.length > 0
				? (letters.map(letter => {
					return (
						<div className='contactSection' key={letter}>
							<ContactsListLetter {...{letter}}  />
							<div className='contacts'>
								{phonebook[letter].contacts.map((contact) => {
									return <ContactListItem {...{key: contact.id, contact, isActive: isActive(contact.id), onClickCallback: () => showContactCallback(contact.id)}} />
								})}
							</div>
						</div>
					)
				})) : <BlankMessage message='No Contacts'/>
			}
		</div>
	)
}

const mapStateToProps = ({contactsList}) => ({
	sortBy: contactsList.sortBy,
	searchTerms: contactsList.searchTerms
})
const mapDispatchToProps = { setTopContact }
export default connect(mapStateToProps, mapDispatchToProps)(ContactsList)
