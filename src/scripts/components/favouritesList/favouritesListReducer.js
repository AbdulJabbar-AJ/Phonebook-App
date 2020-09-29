import { favourites } from '../../helpers/initiData'

const initState = {
	favourites: [ ...favourites ],
	activeFavourite: '',
	favouriteObject: {}
}

export default function contactsListReducer(state = initState, action) {
	switch (action.type) {
		case 'ADD_FAVOURITE':
			return { ...state, favourites: [...state.favourites, action.id] }
		case 'REMOVE_FAVOURITE':
			return { ...state, favourites: state.favourites.filter(id => id !== action.id) }
		case 'SHOW_FAVOURITE':
			return { ...state, activeFavourite: action.id }
		case 'UPDATE_FAVOURITE_OBJECT':
			return { ...state, favouriteObject: action.contact }
		default:
			return state
	}
}
