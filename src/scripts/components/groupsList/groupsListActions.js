export function showGroup(id) {
	return { type: 'SHOW_GROUP', id }
}

export function showGroupContact(id) {
	return { type: 'SHOW_GROUP_CONTACT', id }
}

export function removeGroup(id) {
	return { type: 'REMOVE_GROUP', id }
}

export function renameGroup(id, name) {
	return { type: 'RENAME_GROUP', id, name }
}

export function setEditMembersGroup(id) {
	return { type: 'SET_EDIT_MEMBERS_GROUP', id }
}

export function setGroupMembers(id, members) {
	return { type: 'SET_GROUP_MEMBERS', id, members }
}

export function addGroup(name, id) {
	return { type: 'ADD_GROUP', name, id }
}


export function setDummyGroups() {
	return { type: 'SET_DUMMY_GROUPS' }
}
