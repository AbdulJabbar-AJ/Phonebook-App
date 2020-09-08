import React from 'react'
import { connect } from 'react-redux'
import { setSortBy, setDisplayBy } from '../../components/contactsList/contactsListActions'
import Toggle from '../../helpers/toggle'


function SettingsView({sortBy, setSortBy, displayBy, setDisplayBy}) {
	const invert = current => current === 'first' ? 'last' : 'first'
	const isOn = current => current === 'last'
	const switchSortBy = () => setSortBy(invert(sortBy))
	const switchDisplayBy = () => setDisplayBy(invert(displayBy))

	return (
		<div className='settingsView'>
			<div className='settingDiv'>
				<span className='setting'><strong>Sort By</strong></span>
				<div className='options'>
					<span className='option-left'>First Name</span>
					<Toggle {...{initialState: isOn(sortBy), colour: false, onClickCallback: switchSortBy}} />
					<span className='option-right'>Last Name</span>
				</div>
			</div>

			<div className='settingDiv'>
				<span className='setting'><strong>Display By</strong></span>
				<div className='options'>
					<span className='option-left'>First Name</span>
					<Toggle {...{initialState: isOn(displayBy), colour: false, onClickCallback: switchDisplayBy}} />
					<span className='option-right'>Last Name</span>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = ({contactsList}) => ({
	sortBy: contactsList.sortBy,
	displayBy: contactsList.displayBy
})

const mapDispatchToProps = { setSortBy, setDisplayBy }

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView)
