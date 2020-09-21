export function addContact(contact) {
	return { type: 'ADD_CONTACT', contact }
}

export function showContact(id) {
	return { type: 'SHOW_CONTACT', id }
}

export function updateContact(id, contact) {
	return { type: 'UPDATE_CONTACT', id, contact }
}

export function deleteContact(id) {
	return { type: 'DELETE_CONTACT', id }
}

export function sortContacts(sortBy) {
	return { type: 'SORT_CONTACT', sortBy }
}

export function submitSearchQuery(query) {
	return { type: 'SEARCH_CONTACTS', query }
}

export function setSortBy(sortBy) {
	return { type: 'SET_SORT_BY', sortBy }
}

export function setDisplayBy(displayBy) {
	return { type: 'SET_DISPLAY_BY', displayBy }
}
