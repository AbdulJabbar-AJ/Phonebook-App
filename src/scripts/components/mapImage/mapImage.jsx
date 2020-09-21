import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { memoiseMapImage, getCoords } from './mapImageActions'
import { findAddress, getImage } from '../../api/googleMapsRequest'
import random from '../../../media/icons/remove-circle.svg'
import Spinner from '../spinnner/spinner'

// TODO - Need algorithm to determine which address search query to try, or a chain of things to try. Need to consider if the input is lousy

function MapImage({address, maps, memoiseMapImage}) {
	// line1, line2, city, county, postcode, country
	const addressQuery = `${address.postcode},${address.country}`
	const [imageUrl, setImageUrl] = useState('')
	const [mapHref, setMapHref] = useState('')
	const [isQuerying, setIsQuerying] = useState(false)

	useEffect(() => {
		setIsQuerying(true)
		if (Object.keys(maps).some(key => addressQuery === key)) {
			maps[addressQuery] !== false ? setImageUrl(maps[addressQuery]) : setImageUrl('')
			setHref(addressQuery)
			setIsQuerying(false)
		} else {
			findAddress(addressQuery)
				.then(res => getCoords(res, addressQuery))
				.then(coords => getImage(coords))
				.then(imageUrl => memoiseMapImage(addressQuery, imageUrl))
				.then(() => setHref(addressQuery))
				.catch((error) => returnError(error))
		}
	}, [addressQuery, maps])

	useEffect(() => {
		isQuerying === true ? setImageUrl(random) : null
	}, [isQuerying])

	function returnError(error) {
		console.log(error)
		memoiseMapImage(addressQuery, false)
		setImageUrl('')
		setMapHref('')
		setIsQuerying(false)
	}

	function setHref(addressQuery) {
		setMapHref(`https://www.google.com/maps/search/${addressQuery}`)
	}

	const locationMap = imageUrl === '' ? null : (
		<a href={mapHref} target='_blank'>
			<img src={imageUrl}/>
		</a>
	)

	return isQuerying ? <Spinner /> : locationMap
}

const mapStateToProps = ({mapImages}) => ({ maps: mapImages.maps })
const mapDispatchToProps = { memoiseMapImage }
export default connect(mapStateToProps, mapDispatchToProps)(MapImage)
