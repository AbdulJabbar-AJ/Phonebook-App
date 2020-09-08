import React from 'react'

// Pass either:
// splitView: true, panels {side: element, main: element}
// splitView: false, panels: {full: element}

export default function View ({classname, heading, splitView, panels}) {
	if (splitView) {
		return (
			<div className={`view splitView ${classname}`}>
				<div className='sidePanelContainer'>{heading}{panels.side}</div>
				<div className='mainPanelContainer'>{panels.main}</div>
			</div>
		)
	} else {
		return (
			<div className={`view fullView ${classname}`}>
				<div className='fullPanelContainer'>{heading}{panels.full}</div>
			</div>
		)
	}
}
