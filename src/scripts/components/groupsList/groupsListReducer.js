import { groups } from '../../helpers/initiData'

const initState = {
	groups: [ ...groups ],
	activeGroup: '',
	activeGroupContact: '',
	groupObject: {},
	groupContactObject: {},
	editMembersGroup: '',
}


export default function groupsListReducer(state = initState, action) {
	switch (action.type) {
		case 'SHOW_GROUP':
			return { ...state, activeGroup: action.id }
		case 'SHOW_GROUP_CONTACT':
			return { ...state, activeGroupContact: action.id }
		case 'REMOVE_GROUP':
			return { ...state, groups: state.groups.filter(group => group.id !== action.id) }
		case 'REMOVE_DELETED_GROUP_MEMBER':
			return {
				...state,
				groups: state.groups.map(group => ({
					...group,
					members: group.members.filter(member => member !== action.id)
				}))
			}
		case 'RENAME_GROUP':
			return { ...state, groups: state.groups.map(group => group.id === action.id ? ({...group, name: action.name}) : group) }
		case 'SET_EDIT_MEMBERS_GROUP':
			return { ...state, editMembersGroup: action.id }
		case 'SET_GROUP_MEMBERS':
			return { ...state, groups: state.groups.map(group => group.id === action.id ? ({...group, members: action.members}) : group)  }
		case 'ADD_GROUP':
			return { ...state, groups: [ ...state.groups, action.group ] }
		case 'UPDATE_GROUP_OBJECT':
			return { ...state, groupObject: action.group }
		case 'UPDATE_GROUP_CONTACT_OBJECT':
			return { ...state, groupContactObject: action.contact }
		default:
			return state
	}
}