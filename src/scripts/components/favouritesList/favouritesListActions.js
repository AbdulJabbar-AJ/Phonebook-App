export function addFavourite(id) {
	return { type: 'ADD_FAVOURITE', id }
}
export function removeFavourite(id) {
	return { type: 'REMOVE_FAVOURITE', id }
}

export function showFavourite(id) {
	return { type: 'SHOW_FAVOURITE', id }
}

export function setFavourite(contact) {
	return {type: 'UPDATE_FAVOURITE_OBJECT', contact}
}