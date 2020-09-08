import React from 'react'
import Name from './components/section-name'
import Phone from './components/section-phone'
import Address from './components/section-address'
import Email from './components/section-email'
import Dates from './components/section-dates'
import Other from './components/section-other'
import Notes from './components/section-notes'

export default function CardSection({type, data, editMode, onChangeCallback}) {
	const propsToPass = {data, editMode, onChangeCallback}

	const getSection = (() => {
		switch (type) {
			case 'name':
				return <Name {...{...propsToPass}}/>
			case 'phone':
				return <Phone {...{...propsToPass}}/>
			case 'email':
				return <Email {...{...propsToPass}}/>
			case 'address':
				return <Address {...{...propsToPass}}/>
			case 'dates':
				return <Dates {...{...propsToPass}}/>
			case 'other':
				return <Other {...{...propsToPass}}/>
			case 'notes':
				return <Notes {...{...propsToPass}}/>
			default:
				return null

		}
	})();

const section = data.length > 0 || editMode ? (
	<div className="cardSectionContainer">
		{getSection}
	</div>
) : null

return section
}