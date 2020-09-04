export function addContact (contact) {
	return {
		type: 'ADD_CONTACT',
		contact
	}
}

export function showContact (contact) {
	return {
		type: 'SHOW_CONTACT',
		contact
	}
}