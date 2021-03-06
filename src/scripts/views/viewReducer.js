const initState = {
	isGroupView: false,
	isSelectMembersView: false,
	narrowView: false
}

export default function viewReducer(state = initState, action) {
	switch (action.type) {
		case 'SET_IS_GROUP_VIEW':
			return { ...state, isGroupView: action.bool }
		case 'SET_IS_SELECT_MEMBERS_VIEW':
			return { ...state, isSelectMembersView: action.bool }
		case 'SET_NARROW_VIEW':
			return { ...state, narrowView: action.bool }
		default:
			return state
	}
}

