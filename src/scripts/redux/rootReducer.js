import { combineReducers } from 'redux'
import contactsList from '../components/contactsList/contactsListReducer'
import contactCard from '../components/contactCard/contactCardReducer'
import favouritesList from '../components/favouritesList/favouritesListReducer'
import mapImages from '../components/mapImage/mapImageReducer'
import groupsList from '../components/groupsList/groupsListReducer'
import view from '../views/viewReducer'

export default combineReducers({
	contactsList,
	contactCard,
	favouritesList,
	mapImages,
	groupsList,
	view
})
