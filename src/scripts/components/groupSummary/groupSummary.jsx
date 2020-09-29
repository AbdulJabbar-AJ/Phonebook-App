import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { showGroup, removeGroup, renameGroup } from '../groupsList/groupsListActions'
import Button from '../button/button'
import remove from '../../../media/icons/remove-circle.svg'
import scrollGroupPreview from '../../helpers/scrollGroupPreviews'

const GroupSummary = ({group, contacts, editMode, showGroup, removeGroup, renameGroup, editMembersCallback}) => {
	const [memberList, setMemberList] = useState([])
	const [groupNameInput, setGroupNameInput] = useState(group.name)
	const summaryDomElement = useRef(null)

	useEffect(() => {
		// TODO - NAP - make it work on resize
		const parent = summaryDomElement.current
		const groupName = parent.querySelector('.groupName')
		const groupPreview = parent.querySelector('.groupPreview')

		setTimeout(() => {
			const groupNameWidth = groupName.offsetWidth - 10 // Due to 10px right padding of .groupPreview
			const groupPreviewWidth = groupPreview.scrollWidth
			scrollGroupPreview(groupPreview, groupPreviewWidth, groupNameWidth)
		}, 0)
	}, [])


	useEffect(() => {
		setMemberList([])
		setMemberList(group.members.map(member => {
			const contact = contacts.find(contact => contact.id === member)
			const {first, last, company} = contact.name
			return first || last || company
		}))
	} ,[group])

	useEffect(() => {
		if (group.name !== groupNameInput) {
			renameGroup(group.id, groupNameInput)
		}
	},[editMode])


	function activateGroup() {
		!editMode ? showGroup(group.id) : null
	}

	const groupName = editMode
		? <input type='text' className='groupName' defaultValue={group.name} onChange={(e) => setGroupNameInput(e.target.value)} />
		: <div className='groupName'>{group.name}</div>

	const removeGroupButton = <Button {...{type: 'icon', icon: remove, classname: 'removeEntry', onClickCallback: () => removeGroup(group.id), noBg: true}} />

	return (
		<div className='groupSummary' onClick={activateGroup} ref={summaryDomElement}>
			{editMode ? removeGroupButton : null}
			{groupName}
			<div className='groupSize'>{group.members.length} {group.members.length === 1 ? 'Contact' : 'Contacts'}</div>
			<div className='groupPreview'>
				{editMode
					? <Button {...{type: 'text', text: 'Edit Members', textPadding: 'narrow', onClickCallback: () => editMembersCallback(group)}} />
					: memberList.length > 0 ? memberList.map((name, index) => <span key={index} className='memberName'>{name}</span>) : 'No group members'
				}
			</div>
		</div>
	)
}

const mapStateToProps = ({contactsList}) => ({ contacts: contactsList.contacts })
const mapDispatchToProps = { showGroup, removeGroup, renameGroup }
export default connect(mapStateToProps, mapDispatchToProps)(GroupSummary)
