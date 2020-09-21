import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import Button from '../button/button'
import classNames from 'classnames'
import GroupMemberRadioItem from './components/groupMemberRadioItem'

const ChooseGroupMembers = ({contacts, group, isSelectMembersView, cancelChangeCallback, saveChangesCallback}) => {
	const [groupMembers, setGroupMembers] = useState(group.members)
	// // TODO - THESE WILL RESET WHEN SWITCHING BETWEEN TABS

	function updateGroup(id) {
		groupMembers.includes(id)
			? setGroupMembers(prevState => prevState.filter(i => i !== id))
			: setGroupMembers(prevState => [ ...prevState, id ])
	}

	return (
		<div className={classNames('chooseGroupMembers', {transform: isSelectMembersView} )}>
			<div className='heading'>
				<h3>{group.name}</h3>
				<Button {...{type: 'text', text: 'done', classname: 'btn-done', onClickCallback: () => saveChangesCallback(group.id, groupMembers)}}/>
				<p>Choose Group Members</p>
				<Button {...{type: 'text', text: 'cancel', classname: 'btn-cancel', onClickCallback: cancelChangeCallback }}/>
			</div>
			<div className='list'>
				{contacts.map(contact => <GroupMemberRadioItem {...{key: contact.id, contact, inGroup: groupMembers.includes(contact.id), toggle: () => updateGroup(contact.id) }} />)}
			</div>
		</div>
	)
}

const mapStateToProps = ({contactsList}) => ({ contacts: contactsList.contacts })
export default connect(mapStateToProps)(ChooseGroupMembers)
