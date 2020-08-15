import React from 'react'
import search from '../../../media/img/icons/search.svg'

export default function Searchbar({filterSearch}) {
	const filter = () => {
		/* TODO *//* Don't touch DOM directly */
		const terms = document.getElementById('search').value.split(' ')
		filterSearch(terms.filter(term => term !== ''))
	}

	return (
		<div className='searchbarContainer'>
			<div className='searchbar'>
				<label htmlFor='search'><img src={search}/></label>
				<input id='search' placeholder='search...' onChange={filter}/>
			</div>
		</div>
	)
}
