import React from 'react'
import add from '../../../media/img/icons/add.svg'

export default function Add({ activeContact, logPrevContact, newCon, hideContact }) {
	function newContact () {
		logPrevContact(activeContact)
		newCon(true)
		hideContact()
	}

	return (
		<div className='add' onClick={newContact}>
			<img src={add} />
		</div>
	)
}
