import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import View from '../../view'
import { showGroup, showGroupContact } from '../../../components/groupsList/groupsListActions'
import ContactsList from '../../../components/contactsList/contactsList'
import ContactCard from '../../../components/contactCard/contactCard'
import Button from '../../../components/button/button'
import back from '../../../../media/icons/back.svg'
import classNames from 'classnames'


// TODO - HAVE HAVE HAVE TO handle for is contact is deleted. So say if contact not found, revert to contact[0]
// As always, is no contacts, return blank message

const GroupView = ({group, contacts, activeGroupContact, showGroup, showGroupContact, transform }) => {
	const [contactsList, setContactsList] = useState(group.members.map(member => contacts.find(contact => contact.id === member)))
	const [card, setCard] = useState('No Contact selected')

	useEffect(() => {
		setContactsList(group.members.map(member => contacts.find(contact => contact.id === member)))
		!activeGroupContact && group.members.length > 0 ? showGroupContact(group.members[0]) : null
	}, [group, contacts])

	useEffect(() => {
		activeGroupContact
			? setCard(<ContactCard {...{contact: contactsList.find(contact => contact.id === activeGroupContact), updateContactCallback: showGroupContact}} />)
			:setCard('No Contact selected')
	}, [contactsList, activeGroupContact])

	const heading = (
		<div className='sidePanel-heading'>
			<Button type='icon' classname='backToGroups-btn' icon={back} noBg={false} onClickCallback={() => showGroup('')} />
			<div className='heading'>{group.name}</div>
		</div>
	)

	const side = <div className='sidePanel'><ContactsList {...{contacts: contactsList, activeContact: activeGroupContact, showContactCallback: showGroupContact }} /></div>
	const main = <div className='mainPanel'>{card}</div>
	return <View classname={classNames('groupsView', {transform})} heading={heading} splitView={true} panels={{side, main}}/>
}

const mapStateToProps = ({contactsList, groupsList}) => ({
	contacts: contactsList.contacts,
	activeGroupContact: groupsList.activeGroupContact
})
const mapDispatchToProps = { showGroup, showGroupContact }
export default connect(mapStateToProps, mapDispatchToProps)(GroupView)
