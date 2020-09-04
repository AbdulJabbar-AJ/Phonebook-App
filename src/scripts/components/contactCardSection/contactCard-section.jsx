 import React from 'react'
 import Phone from './components/section-phone'
 import Address from './components/section-address'
 import Email from './components/section-email'
 import Dates from './components/section-dates'
 import Other from './components/section-other'
 import Notes from './components/section-notes'

 export default function CardSection({type, data, editMode}) {
	const propsToPass = {data, editMode}

	const getSection = () => {
		switch (type) {
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
	}

	const section = data.length > 0 || editMode ? (
		<div className="cardSectionContainer">
			{getSection()}
		</div>
	) : null

	return section
 }



 // TODO
 // Each section needs to know:
 // 	whether or not it is in editMode, to determine which view to render
 // 	The length of sectionItems, if none then don't display in editMode