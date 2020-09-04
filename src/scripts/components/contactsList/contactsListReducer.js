import initContacts from '../../api/initData'

const initState = {
	contacts: [ ...initContacts ],
	activeContact: initContacts[0]
}

export default function contactsListReducer(state = initState, action) {
	switch (action.type) {
		case 'ADD_CONTACT':
			return {
				...state,
				contacts: [ ...state.contacts, action.contact ]
			}
		case 'SHOW_CONTACT':
			return {
				...state,
				activeContact: action.contact
			}
		default:
			return state
	}
}
