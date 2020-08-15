import React from 'react'

export default function View ({classname, heading, sidePanel, mainPanel}) {
	return (
		<div className={`view ${classname}`}>
			<div className='sidePanel'>{heading}{sidePanel}</div>
			<div className='mainPanel'>{mainPanel}</div>
		</div>
	)
}


// TODO
// For groups, the heading will need to span the entire width?
// Or maybe I can just have a side panel with list of groups? not much variance though from other screens, looks like less work