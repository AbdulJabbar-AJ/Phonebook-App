import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

function ContactListItem ({contact, isActive, displayBy, onClickCallback}) {
	const { name } = contact
	const first = name[displayBy]
	const last = displayBy === 'first' ? name.last : name.first
	const company = name.first || name.last ? '' : name.company

	return (
		<div className={classNames('contact', {active: isActive})} onClick={onClickCallback}>
			<li className='name'>{first}{displayBy === 'last' && first && last ? ', ' : ' '}{last}{company}</li>
		</div>
	)
}

const mapStateToProps = ({contactsList}) => ({
	displayBy: contactsList.displayBy,
})

export default connect(mapStateToProps)(ContactListItem)
