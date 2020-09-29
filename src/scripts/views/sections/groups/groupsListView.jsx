import React from 'react'
import View from '../../view'
import GroupsList from '../../../components/groupsList/groupsList'

const GroupsListView = ({transform}) => {
	const heading = <div className='fullPanel-heading'>GROUPS</div>
	const full = <div className='fullPanel'><GroupsList/></div>
	return <View classname='groupsView' transform={transform} heading={heading} splitView={false} panels={{full}} />
}

export default GroupsListView
