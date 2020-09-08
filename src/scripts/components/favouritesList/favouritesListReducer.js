const initState = {
	activeFavourite: 3,
	favourites: [3, 4, 5]
}

export default function contactsListReducer(state = initState, action) {
	switch (action.type) {
		case 'ADD_FAVOURITE':
			return {
				...state,
				favourites: [...state.favs, action.id]
			}
		case 'REMOVE_FAVOURITE':
			return {
				...state,
				favourites: state.favs.filter(id => id !== action.id)
			}
		case 'SHOW_FAVOURITE':
			return {
				...state,
				activeFavourite: action.id
			}
		default:
			return state
	}
}
