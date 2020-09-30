import faker from 'faker'
const cities = require('./ukCities.json')
import { getAddressFromCoords } from '../api/googleMapsRequest'
import { occasionally } from './odds'

export default async function generateAddress() {
	const num = Math.trunc((Math.random() * (cities.length)))
	const city = occasionally(cities[num], cities[48]) // 48 is London
	const locationCoords = [city.latitude, city.longitude]
	const coords = faker.address.nearbyGPSCoordinate(locationCoords, num === 48 ? 40 : 0.5, false)


	return await getAddressFromCoords(coords)
		.then(res => processAddressData(res.results, city.county))
		.catch(() => false)
}



function processAddressData(results, county) {
	const foundAddress = results.find(result => result.types.some(type => type === 'street_address' || type === 'premise'))
	if (foundAddress === undefined) {
		throw new Error('No Address found')
	}

	const address = {
		type: 'home',
		line1: '',
		line2: '',
		city: '',
		county: '',
		postcode: '',
		country: 'United Kingdom'
	}

	const getData = dataType => foundAddress.address_components.find(component => component.types.some(type => type === dataType))

	const street_number = getData('street_number')
	const route = getData('route')
	const neighborhood = getData('neighborhood')
	const postal_town = getData('postal_town')
	// const administrative_area_level_2 = getData('administrative_area_level_2')
	const postal_code = getData('postal_code')

	address.postcode = postal_code && postal_code.long_name

	if (route) {
		if (street_number) {
			address.line1 = `${street_number.long_name} ${route.long_name}`
		} else {
			address.line1 = route.long_name
		}
	}

	if (postal_town && postal_town.long_name === 'London') {
		if (neighborhood) {
			address.city = neighborhood.long_name
			address.county = postal_town.long_name
		} else {
			address.city = postal_town.long_name
		}
	} else {
		address.city = postal_town && postal_town.long_name
		address.county = county
	}

	return address
}