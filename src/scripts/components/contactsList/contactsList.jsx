import React from 'react'
import ContactListItem from './contactListItem'
import ContactsListLetter from './contactsListLetter'

export default function ContactList({contacts, filteredContacts, sortBy, contactsScroll, contactsScrollTop}) {
	function sortListOfObjects (array, prop) {
		array.sort(
			function (a, b) {
				function name (con) {
					let name
					if (con.name.first && con.name.last) {
						name = con.name[prop].toLowerCase()
					} else if (con.name.first || con.name.last) {
						if (con.name.first) {
							name = con.name.first.toLowerCase()
						} else name = con.name.last.toLowerCase()
					} else name = con.name.company.toLowerCase()
					return name
				}

				let x = name(a)
				let y = name(b)
				// EITHER --- x.localeCompare(y)
				// OR --- (x > y) - (y > x) OR (x > y) - (x < y)
				// Difference??
				return (x > y) - (y > x)
			}
		)
		return array
	}

	function generatePhonebook (contacts, sort) {
		let phonebook = []
		const numero =
		['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '#', '$', '%', '&', '(', ')', '*', '+', ',', '.', '-', ':', ';', '<', '>', '=', '?', '@', '[', ']', '^', '_', '{', '}', '|', '~']

		// ONLY ALLOW ALPHANUMERIC FIRST LETTER AND MUST BE A VALUE IN EITHER {FIRST, LAST, COMPANY}
		function firstChar (con) {
		  let first
		  if (con.name.first && con.name.last) {
			first = con.name[sort][0].toUpperCase()
		  } else if (con.name.first || con.name.last) {
			if (con.name.first) {
			  first = con.name.first[0].toUpperCase()
			} else first = con.name.last[0].toUpperCase()
		  } else first = con.name.company[0].toUpperCase()
		  return first
		}

		function addToSection (con) {
		  let first = firstChar(con)
		  let sections = phonebook.map(section => section.letter)

		  if (numero.includes(first)) {
			if (sections.includes('#')) {
			  let i = sections.findIndex(sec => sec === '#')
			  phonebook[i].cons.push(con)
			} else {
			  phonebook = [
				...phonebook, { letter: '#', cons: [con] }
			  ]
			}
		  } else {
			if (sections.includes(first)) {
			  let i = sections.findIndex(sec => sec === first)
			  phonebook[i].cons.push(con)
			} else {
			  phonebook = [
				...phonebook, { letter: first, cons: [con] }
			  ]
			}
		  }
		}

		contacts.forEach(con => addToSection(con))

		return phonebook
	}

	function checkFilter () {
		const value = document.getElementById('search')
		if (!value || value.value === '') {
		  return contacts
		} else {
		  return filteredContacts
		}
	}

	const sort = sortBy
	const last = sortBy === 'first' ? 'last' : 'first'
	const sortedContacts = checkFilter()
	const phonebook = generatePhonebook(sortListOfObjects(sortListOfObjects(contacts, last), sort), sort)

	const contactList = sortedContacts.length ? (
	  <div className='contactList'>
		{phonebook.map((section) => {
		  return (
			<div className='contactSection' key={section.letter}>
			  <ContactsListLetter {...{ contacts, contactsScroll, contactsScrollTop, letter: section.letter}}  />
			  <div className='contacts'>
				{section.cons.map((con) => {
				  return <ContactListItem key={con.id} {...{con, type: 'Contact'}}  />
				})}
			  </div>
			</div>
		  )
		})}
	  </div>
	) : (<div className='empty'>No Contacts</div>)

	return contactList
}
