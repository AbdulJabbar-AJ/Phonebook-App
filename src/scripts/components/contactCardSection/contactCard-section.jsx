 import React from 'react'

 export default function cardSection({ sectionTitle, data, dataLength, editMode }) {
	const sectionItems = 100

	return (
		<div className="cardSection">
			<div className='heading'>{sectionTitle}</div>
			{sectionItems}
		</div>
	)
 }



 // TODO
 // Each section needs to know:
 // 	whether or not it is in editMode, to determine which view to render
 // 	The length of sectionItems, if none then don't display in editMode