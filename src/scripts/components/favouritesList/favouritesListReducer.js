const initState = {
	favs: [{ contactId: 3, position: 0 }, { contactId: 4, position: 1 }]
}

export default function contactsListReducer(state = initState, action) {
	switch (action.type) {
		case 'ADD_FAVOURITE':
			return {
				...state,
				favs: [...state.favs, { contactId: action.id, position: state.favs.length }]
			}
		case 'REMOVE_FAVOURITE':
			return {
				...state,
				favs: state.favs.filter(fav => fav.contactId !== action.id)
			}
		default:
			return state
	}
}
