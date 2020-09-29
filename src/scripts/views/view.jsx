import React, {useState, useEffect} from 'react'
import className from 'classnames'
import {connect} from 'react-redux'
import { setNarrowView } from './viewActions'

// splitView: true, panels {side: element, main: element}
// fullView: false, panels: {full: element}

function View ({classname, heading, splitView, panels, narrowView, setNarrowView, transform}) {
	const [classList, setClassList] = useState(className('view', {splitView, narrowView, transform, [classname]: classname}))

	useEffect(resizeListener, [])

	useEffect(() => {
		window.addEventListener('resize', resizeListener);
		return () => window.removeEventListener('resize', resizeListener);
	})

	function resizeListener() {
		window.innerWidth < 690 ? setNarrowView(true) : setNarrowView(false)
	}

	const generateClassList = () => setClassList(className('view', {splitView, narrowView, transform, [classname]: classname}))
	useEffect(generateClassList, [narrowView, transform])

	if (splitView) {
		return (
			<div className={classList} >
				<div className='sidePanelContainer'>{heading}{panels.side}</div>
				<div className='mainPanelContainer'>{panels.main}</div>
			</div>
		)
	} else {
		return (
			<div className={classList}>
				<div className='fullPanelContainer'>{heading}{panels.full}</div>
			</div>
		)
	}
}

const mapStateToProps = ({view}) => ({ narrowView: view.narrowView })
const mapDispatchToProps = { setNarrowView }
export default connect(mapStateToProps, mapDispatchToProps)(View)