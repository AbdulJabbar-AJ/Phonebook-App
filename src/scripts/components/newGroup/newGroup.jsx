import React, { useState } from 'react'
import Button from '../../components/button/button'

const NewGroup = ({addGroupCallback, cancelNewGroup}) => {
	const [groupName, setGroupName] = useState('')

	const updateGroupName = event => setGroupName(event.target.value)

	return (
		<div className='newGroup'>
			<div className='heading'>New Group</div>
			<div className='newGroupForm'>
				<div className='label'>Enter Group Name:</div>
				<input className='groupNameInput' type='text' onChange={updateGroupName} />
			</div>
			<div className='newGroup-buttons'>
				<Button {...{type: 'text', text: 'done', classname: 'doneBtn', noBg: true, onClickCallback: () => addGroupCallback(groupName) }} />
				<Button {...{type: 'text', text: 'cancel', classname: 'cancelBtn', noBg: true, onClickCallback: cancelNewGroup }} />
			</div>
		</div>
	)
}

export default NewGroup
