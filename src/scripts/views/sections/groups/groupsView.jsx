import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setIsGroupView } from '../../viewActions'
import GroupsListView from './groupsListView'
import GroupView from './groupView'
import classNames from 'classnames'

const GroupsView = ({groups, activeGroup, isGroupView, setIsGroupView}) => {
	const [group, setGroup] = useState({})
	const [slideLeft, setSlideLeft] = useState(false)
	const [slideRight, setSlideRight] = useState(false)
	const isGroupEmpty = () => !group.hasOwnProperty('id')

	useEffect(() => {
		if (isGroupEmpty()) {
			if (activeGroup !== '') {
				setGroup(groups.find(group => group.id === activeGroup))
				setIsGroupView(true)
				if (!isGroupView) {
					setSlideLeft(true)
					setTimeout(() => setSlideLeft(false) ,500)
				}
			}
		} else {
			setSlideRight(true)
			setTimeout(() => {
				setSlideRight(false)
				setIsGroupView(false)
				setGroup({})
			},500)
		}
	}, [activeGroup])

	return (
		<div className={ classNames('groupsViewContainer', {slideLeft, slideRight} )}>
			<GroupsListView transform={isGroupView} />
			{!isGroupEmpty() ? <GroupView {...{group, transform: isGroupView}} /> : null}
		</div>
	)
}

const mapStateToProps = ({groupsList, view}) => ({
	groups: groupsList.groups,
	activeGroup: groupsList.activeGroup,
	isGroupView: view.isGroupView
})
const mapDispatchToProps = { setIsGroupView }
export default connect(mapStateToProps, mapDispatchToProps)(GroupsView)
