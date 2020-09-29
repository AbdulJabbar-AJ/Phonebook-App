export function showGroup(id) {
	return { type: 'SHOW_GROUP', id }
}

export function showGroupContact(id) {
	return { type: 'SHOW_GROUP_CONTACT', id }
}

export function removeGroup(id) {
	return { type: 'REMOVE_GROUP', id }
}

export function removeDeletedGroupMember(id) {
	return { type: 'REMOVE_DELETED_GROUP_MEMBER', id }
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

export function addGroup(group) {
	return { type: 'ADD_GROUP', group }
}

export function setGroup(group) {
	return {type: 'UPDATE_GROUP_OBJECT', group}
}

export function setGroupContact(contact) {
	return {type: 'UPDATE_GROUP_CONTACT_OBJECT', contact}
}