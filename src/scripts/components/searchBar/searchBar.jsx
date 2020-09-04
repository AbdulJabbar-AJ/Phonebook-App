import React from 'react'
import { connect } from 'react-redux'
import search from '../../../media/icons/search.svg'

const SearchBar = () => {
	return (
		<div className='searchBar'>
			<img src={search} alt=""/>
			<input type="text" placeholder='search...' />
		</div>
	)
}


const mapStateToProps = () => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
