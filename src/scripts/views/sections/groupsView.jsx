import React from 'react'
import View from '../view'

const GroupsView = () => {
	const full = (() => (
		<div className='fullPanel'>Groups Full View</div>
	))()

	const heading = (() => (
		<div className='fullPanel-heading'>GROUPS</div>
	))()


	return (
		<View classname='groupsView' heading={heading} splitView={false} panels={{full}}/>
	)
}

export default GroupsView