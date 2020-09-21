const initState = {
	activeFavourite: '',
	favourites: [],
	dummyFavsSet: false
}

export default function contactsListReducer(state = initState, action) {
	switch (action.type) {
		case 'ADD_FAVOURITE':
			return { ...state, favourites: [...state.favourites, action.id] }
		case 'REMOVE_FAVOURITE':
			return { ...state, favourites: state.favourites.filter(id => id !== action.id) }
		case 'SHOW_FAVOURITE':
			return { ...state, activeFavourite: action.id }
		case 'SET_DUMMY_FAVS':
			return { ...state, dummyFavsSet: true }
		default:
			return state
	}
}
