import { contacts } from '../../helpers/initiData'

const initState = {
	contacts: [ ...contacts ],
	activeContact: '',
	contactObject: {},
	topContact: '',
	searchTerms: [],
	sortBy: 'first',
	displayBy: 'first'
}

export default function contactsListReducer(state = initState, action) {
	switch (action.type) {
		case 'ADD_CONTACT':
			return { ...state, contacts: [ ...state.contacts, action.contact ] }
		case 'SHOW_CONTACT':
			return { ...state, activeContact: action.id }
		case 'UPDATE_CONTACT_OBJECT':
			return { ...state, contactObject: action.contact }
		case 'UPDATE_CONTACT':
			return { ...state, contacts: state.contacts.map(contact => contact.id === action.id ? action.contact : contact) }
		case 'DELETE_CONTACT':
			return { ...state, contacts: state.contacts.filter(contact => contact.id !== action.id) }
		case 'SORT_CONTACTS':
			return { ...state, sortBy: action.sortBy }
		case 'SEARCH_CONTACTS':
			return { ...state, searchTerms: action.query }
		case 'SET_TOP_CONTACT':
			return { ...state, topContact: action.id}
		case 'SET_SORT_BY':
			return { ...state, sortBy: action.sortBy}
		case 'SET_DISPLAY_BY':
			return { ...state, displayBy: action.displayBy }
		default:
			return state
	}
}
