import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setGroup, showGroup, showGroupContact } from '../../../components/groupsList/groupsListActions'
import { setIsGroupView } from '../../viewActions'
import GroupsListView from './groupsListView'
import GroupView from './groupView'
import classNames from 'classnames'

const GroupsView = ({groups, activeGroup, showGroup, isGroupView, setIsGroupView, groupObject, setGroup, showGroupContact}) => {
	const [slideLeft, setSlideLeft] = useState(false)
	const [slideRight, setSlideRight] = useState(false)

	useEffect(showList, [activeGroup])

	function showList() {
		if (activeGroup) {
			setIsGroupView(true)
			if (!groupObject.hasOwnProperty('id')) {
				setGroup(groups.find(group => group.id === activeGroup))
				setSlideLeft(true)
				setTimeout(() => setSlideLeft(false) ,500)
			}
		} else {
			setIsGroupView(false)
			if (groupObject.hasOwnProperty('id')) {
				setGroup({})
				setSlideRight(true)
				setTimeout(() => setSlideRight(false), 500)
			}
		}
	}

	function deactivateGroup() {
		setSlideRight(true)
		setTimeout(() => {
			showGroupContact('')
			showGroup('')
			setGroup({})
			setIsGroupView(false)
			setSlideRight(false)
		}, 500)
	}

	useEffect(() => {
		activeGroup && setGroup(groups.find(group => group.id === activeGroup))
	},[groups])

	return (
		<div className={ classNames('groupsViewContainer', {slideLeft, slideRight} )}>
			<GroupsListView transform={isGroupView} />
			{isGroupView ? <GroupView {...{group: groupObject, transform: true, deactivateGroupCallback: deactivateGroup }} /> : null}
		</div>
	)
}

const mapStateToProps = ({groupsList, view}) => ({
	groups: groupsList.groups,
	activeGroup: groupsList.activeGroup,
	groupObject: groupsList.groupObject,
	isGroupView: view.isGroupView
})
const mapDispatchToProps = { setGroup, setIsGroupView, showGroup, showGroupContact }
export default connect(mapStateToProps, mapDispatchToProps)(GroupsView)
