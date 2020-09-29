import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import View from '../../view'
import { showGroupContact, setGroupContact } from '../../../components/groupsList/groupsListActions'
import ContactsList from '../../../components/contactsList/contactsList'
import ContactCard from '../../../components/contactCard/contactCard'
import BlankMessage from '../../../components/blankMessage/blankMessage'
import Button from '../../../components/button/button'
import back from '../../../../media/icons/back.svg'
import classNames from 'classnames'

const GroupView = ({group, contacts, activeGroupContact, deactivateGroupCallback, showGroupContact, transform, narrowView, groupContactObject, setGroupContact}) => {
	const [contactsList, setContactsList] = useState([])
	const [slideLeft, setSlideLeft] = useState(false)

	useEffect(() => {
		setContactsList(group.members
			.filter(member => contacts.some(contact => contact.id === member))
			.map(member => contacts.find(contact => contact.id === member))
		)
	}, [group, contacts])

	useEffect(showCard, [narrowView, activeGroupContact, contactsList])

	function showCard() {
		if (activeGroupContact) {
			if (group.members.includes(activeGroupContact)) {
				if (!groupContactObject.hasOwnProperty('id') || groupContactObject.id !== activeGroupContact) {
					setGroupContact(contactsList.find(contact => contact.id === activeGroupContact))
				}
			} else setGroupContact({})
		} else if (!narrowView && contactsList.length > 0) {
			setGroupContact(contactsList[0])
		} else {
			setGroupContact({})
		}
	}

	function activateGroupContact(id) {
		showGroupContact(id)
		setSlideLeft(true)
		setTimeout(() => setSlideLeft(false),1000)
	}

	const heading = (
		<div className='sidePanel-heading'>
			<Button type='icon' classname='backToGroups-btn' icon={back} noBg={false} onClickCallback={deactivateGroupCallback} />
			<div className='heading'>{group.name}</div>
		</div>
	)

	const side = <div className='sidePanel'><ContactsList {...{contacts: contactsList, activeContact: groupContactObject, showContactCallback: activateGroupContact}} /></div>

	const main = groupContactObject.hasOwnProperty('id')
		? <div className={classNames('mainPanel', {slideLeft})}><ContactCard {...{contact: groupContactObject, closeContactCallback: () => showGroupContact('')}}/></div>
		: <BlankMessage message='No Contact selected'/>

	return <View {...{ classname: classNames('groupsView', {transform}), heading, splitView: true, panels: {side, main}, narrowView }}/>
}

const mapStateToProps = ({contactsList, groupsList, view}) => ({
	contacts: contactsList.contacts,
	activeGroupContact: groupsList.activeGroupContact,
	narrowView: view.narrowView,
	groupContactObject: groupsList.groupContactObject
})
const mapDispatchToProps = { showGroupContact, setGroupContact }
export default connect(mapStateToProps, mapDispatchToProps)(GroupView)
