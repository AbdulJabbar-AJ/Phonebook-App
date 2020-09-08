import { combineReducers } from 'redux'
import contactsList from '../components/contactsList/contactsListReducer'
import contactCard from '../components/contactCard/contactCardReducer'
import favouritesList from '../components/favouritesList/favouritesListReducer'

export default combineReducers({
	contactsList,
	contactCard,
	favouritesList
})
