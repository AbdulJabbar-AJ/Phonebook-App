const initState = {
	activeGroup: '',
	activeGroupContact: '',
	editMembersGroup: '',
	groups: [
		// { name: 'Family', id: 1, members: [] },
		// { name: 'Family', id: 3, members: [3, 6, 4] },
		// { name: 'Family', id: 4, members: [3, 6, 4] },
		// { name: 'Family', id: 5, members: [3, 6, 4] },
		// { name: 'Family', id: 6, members: [3, 6, 4] },
		// { name: 'Friends', id: 2, members: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
	],
	dummyGroupsSet: false
}

//// TODO - NEED TO MAKE SURE IDS ARE CORRECT, EVEN IS SOMETHING IS DELETED
// USE AN NPM PACKAGE OR TRACK A VALUE AND ++


export default function groupsListReducer(state = initState, action) {
	switch (action.type) {
		case 'SHOW_GROUP':
			return { ...state, activeGroup: action.id }
		case 'SHOW_GROUP_CONTACT':
			return { ...state, activeGroupContact: action.id }
		case 'REMOVE_GROUP':
			return { ...state, groups: state.groups.filter(group => group.id !== action.id) }
		case 'RENAME_GROUP':
			return { ...state, groups: state.groups.map(group => group.id === action.id ? ({...group, name: action.name}) : group) }
		case 'SET_EDIT_MEMBERS_GROUP':
			return { ...state, editMembersGroup: action.id }
		case 'SET_GROUP_MEMBERS':
			return { ...state, groups: state.groups.map(group => group.id === action.id ? ({...group, members: action.members}) : group)  }
		case 'ADD_GROUP':
			return { ...state, groups: [ ...state.groups, {name: action.name, id: action.id, members: []} ]  }
		case 'SET_DUMMY_GROUPS':
			return { ...state, dummyGroupsSet: true }
		default:
			return state
	}
}
