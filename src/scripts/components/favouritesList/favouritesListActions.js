export function addFavourite (id) {
	return {
		type: 'ADD_FAVOURITE',
		id
	}
}
export function removeFavourite (id) {
	return {
		type: 'REMOVE_FAVOURITE',
		id
	}
}