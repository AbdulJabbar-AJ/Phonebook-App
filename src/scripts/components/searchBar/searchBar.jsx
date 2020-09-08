import React from 'react'
import { connect } from 'react-redux'
import { submitSearchQuery} from '../contactsList/contactsListActions'
import search from '../../../media/icons/search.svg'

function SearchBar ({submitSearchQuery}) {
	function query() {
		const value = event.target.value
		const searchTerms = String(value).split(' ')
		submitSearchQuery(searchTerms)
	}


	return (
		<div className='searchBar'>
			<img src={search} alt=""/>
			<input type="text" placeholder='search...' onChange={query} />
		</div>
	)
}


const mapStateToProps = () => ({})

const mapDispatchToProps = {
	submitSearchQuery
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
