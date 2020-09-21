import React from 'react'
import Button from '../../button/button'
import radioOff from '../../../../media/icons/radioOff.svg'
import radioOn from '../../../../media/icons/radioOn.svg'
import ContactListItem from '../../contactsList/components/contactsListItem'

const GroupMemberRadioItem = ({contact, inGroup, toggle}) => {

	return (
		<div className='addListCon' key={contact.id} onClick={toggle}>
			<div className='consListRadio' >
				<Button {...{type: 'icon', icon: inGroup ? radioOn : radioOff, noBg: true}} />
				{/*<img src={this.radio(contact.id)} />*/}
			</div>
			<ContactListItem {...{contact}} />
		</div>
	)
}

export default GroupMemberRadioItem
