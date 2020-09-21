import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { showGroup, removeGroup, setEditMembersGroup, setGroupMembers, addGroup, setDummyGroups } from './groupsListActions'
import { setIsSelectMembersView } from '../../views/viewActions'
import ChooseGroupMembers from '../chooseGroupMembers/chooseGroupMembers'
import GroupSummary from '../groupSummary/groupSummary'
import NewGroup from '../newGroup/newGroup'
import classNames from 'classnames'
import Button from '../button/button'
import add from '../../../media/icons/add.svg'
import { v4 as uuidv4 } from 'uuid';
import BlankMessage from '../blankMessage/blankMessage'

const GroupsList = ({contacts, groups, isSelectMembersView, setIsSelectMembersView, editMembersGroup, setEditMembersGroup, setGroupMembers, addGroup, dummyGroupsSet, setDummyGroups}) => {
	const [editMode, setEditMode] = useState(false)
	const [newGroup, setNewGroup] = useState(false)
	const [editGroup, setEditGroup] = useState({})
	const [slideUp, setSlideUp] = useState(false)
	const [slideDown, setSlideDown] = useState(false)
	const isGroupEmpty = () => !editGroup.hasOwnProperty('id')


	// Dummy Init Groups
	useEffect(() => {
		function generateDummyMembers(n) {
			const members = []
			for (let i = 0; i < n; i++) {
				members.push(contacts[i].id)
			}
			return members
		}

		if (!dummyGroupsSet) {
			for (let i = 0; i < 4; i++) {
				let id = uuidv4()
				addGroup('Friends', id)
				setGroupMembers(id, generateDummyMembers(3))
			}
			let id = uuidv4()
			addGroup('Family', id)
			setGroupMembers(id, generateDummyMembers(15))
			setDummyGroups()
		}
	}, [])

	useEffect(() => {
		if (isGroupEmpty()) {
			if (editMembersGroup !== '') {
				setEditGroup(groups.find(group => group.id === editMembersGroup))
				setIsSelectMembersView(true)
				if (!isSelectMembersView) {
					setSlideUp(true)
					setTimeout(() => setSlideUp(false) ,500)
				}
			}
		} else {
			setSlideDown(true)
			setTimeout(() => {
				setSlideDown(false)
				setIsSelectMembersView(false)
				setEditGroup({})
			},500)
		}
	}, [editMembersGroup])

	function updateGroup(id, members) {
		setGroupMembers(id, members)
		setEditMembersGroup('')
	}

	function addGroupCallback(groupName) {
		const id = uuidv4()
		addGroup(groupName, id)
		setEditMembersGroup(id)
		setNewGroup(false)
	}

	const groupSummaries = (
		<div className={classNames('groupSummaries', {transform: isSelectMembersView} )} >
			{groups.map(group => <GroupSummary {...{ key: group.id, group, editMode, editMembersCallback: () => setEditMembersGroup(group.id)}} />)}
		</div>
	)

	return (
		<div className={classNames('groupsList', { edit: editMode, slideUp, slideDown, blur: newGroup })}>
			{groups.length > 0 ? groupSummaries : <BlankMessage message='No Groups'/>}
			<div className={classNames('editGroups', { transform: isSelectMembersView})}>
				{editMode ? <Button {...{type: 'icon', icon: add, classname: 'addBtn', onClickCallback: () => setNewGroup(true) }} /> : null}
				<Button {...{type: 'text', text: editMode ? 'done' : 'edit', classname: 'editBtn' ,textPadding: 'narrow', onClickCallback: () => setEditMode(!editMode) }} />
			</div>
			{!isGroupEmpty() ? <ChooseGroupMembers {...{group: editGroup, isSelectMembersView, cancelChangeCallback: () => setEditMembersGroup(''), saveChangesCallback: updateGroup }} /> : null}
			{newGroup ? <NewGroup {...{addGroupCallback, cancelNewGroup: () => setNewGroup(false) }}  /> : null}
		</div>
	)
}

const mapStateToProps = ({contactsList, groupsList, view}) => ({
	contacts: contactsList.contacts,
	groups: groupsList.groups,
	isSelectMembersView: view.isSelectMembersView,
	editMembersGroup: groupsList.editMembersGroup,
	dummyGroupsSet: groupsList.dummyGroupsSet
})
const mapDispatchToProps = { showGroup, removeGroup, setIsSelectMembersView, setEditMembersGroup, setGroupMembers, addGroup, setDummyGroups }
export default connect(mapStateToProps, mapDispatchToProps)(GroupsList)
