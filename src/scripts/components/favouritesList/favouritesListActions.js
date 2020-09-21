export function addFavourite(id) {
	return { type: 'ADD_FAVOURITE', id }
}
export function removeFavourite(id) {
	return { type: 'REMOVE_FAVOURITE', id }
}

export function showFavourite(id) {
	return { type: 'SHOW_FAVOURITE', id }
}

export function setDummyFavs() {
	return { type: 'SET_DUMMY_FAVS' }
}