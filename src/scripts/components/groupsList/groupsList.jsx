import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { showGroup, removeGroup, setEditMembersGroup, setGroupMembers, addGroup } from './groupsListActions'
import { setIsSelectMembersView } from '../../views/viewActions'
import ChooseGroupMembers from '../chooseGroupMembers/chooseGroupMembers'
import GroupSummary from '../groupSummary/groupSummary'
import Group from '../../helpers/classConstructors/group'
import NewGroup from '../newGroup/newGroup'
import classNames from 'classnames'
import Button from '../button/button'
import add from '../../../media/icons/add.svg'
import BlankMessage from '../blankMessage/blankMessage'

const GroupsList = ({groups, isSelectMembersView, setIsSelectMembersView, editMembersGroup, setEditMembersGroup, setGroupMembers, addGroup}) => {
	const [editMode, setEditMode] = useState(false)
	const [newGroup, setNewGroup] = useState(false)
	const [editGroup, setEditGroup] = useState({})
	const [slideUp, setSlideUp] = useState(false)
	const [slideDown, setSlideDown] = useState(false)
	const isGroupEmpty = () => !editGroup.hasOwnProperty('id')


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
		const newGroup = new Group((groupName))
		addGroup(newGroup)
		setEditMembersGroup(newGroup.id)
		setNewGroup(false)
	}

	const groupSummaries = (
		<div className={classNames('groupSummaries', {transform: isSelectMembersView} )} >
			{groups.map(group => <GroupSummary {...{ key: group.id, group, editMode, editMembersCallback: () => setEditMembersGroup(group.id)}} />)}
		</div>
	)

	const editGroupsButtons = (
		<div className={classNames('editGroups', { transform: isSelectMembersView})}>
			{editMode ? <Button {...{type: 'icon', icon: add, classname: 'addBtn', onClickCallback: () => setNewGroup(true) }} /> : null}
			<Button {...{type: 'text', text: editMode ? 'done' : 'edit', classname: 'editBtn' ,textPadding: 'narrow', onClickCallback: () => setEditMode(!editMode) }} />
		</div>
	)

	return (
		<div className={classNames('groupsList', { edit: editMode, slideUp, slideDown, blur: newGroup })}>
			{groups.length > 0 ? groupSummaries : <BlankMessage message='No Groups'/>}
			{editGroupsButtons}
			{!isGroupEmpty() ? <ChooseGroupMembers {...{group: editGroup, isSelectMembersView, cancelChangeCallback: () => setEditMembersGroup(''), saveChangesCallback: updateGroup }} /> : null}
			{newGroup ? <NewGroup {...{addGroupCallback, cancelNewGroup: () => setNewGroup(false) }}  /> : null}
		</div>
	)
}

const mapStateToProps = ({groupsList, view}) => ({
	groups: groupsList.groups,
	isSelectMembersView: view.isSelectMembersView,
	editMembersGroup: groupsList.editMembersGroup,
})
const mapDispatchToProps = { showGroup, removeGroup, setIsSelectMembersView, setEditMembersGroup, setGroupMembers, addGroup }
export default connect(mapStateToProps, mapDispatchToProps)(GroupsList)
