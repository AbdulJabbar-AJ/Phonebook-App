import * as dummyData from './dummyData.json'
const data = dummyData.data
import Contact from '../helpers/contacts'
import { v4 as uuidv4 } from 'uuid';

let contacts = []
let i = 1

function addAllContacts () {
	data.forEach(contact => {
		const id = uuidv4()

		const name = {
			first: contact.name.split(' ')[0],
			last: contact.name.split(' ')[1],
			company: 'Some Company Ltd'
		}

		const phone = [
			{number: contact.phone_number, type: 'home', primary: false},
			{number: '1111', type: 'mobile', primary: true},
			{number: '2222', type: 'work', primary: false},
		]

		const email = [
			{address: 'test@mail.com', type: 'home', primary: false},
			{address: 'test@mail.com', type: 'work', primary: true},
			{address: 'test@mail.com', type: 'other', primary: false}
		]

		const dates = [
			{date: [1, 'Jan', 1950], type: 'birthday'},
			{date: [2, 'Feb', 2000], type: 'anniversary'}
		]

		const other = [
			{data: '@DespicableMe', type: 'Twitter'},
			{data: 'facebook.com/DespicableMe', type: 'Facebook'},
			{data: 'www.despicable.me', type: 'website'}
		]

		const notes = 'This is a note.'


		let addr = contact.address.split(', ')
		let cP = addr[addr.length - 2].split(' ')

		const line1 = addr[0]
		const city = cP[0]
		const country = addr[addr.length - 1]

		let line2 = ''
		let postcode


		if (line1 !== addr[addr.length - 3]) {
			const line2 = addr[1]
		}

		if (cP[2]) {
			postcode = `${cP[1]} ${cP[2]}`
		} else postcode = cP[1]


		const address = [
			{type: 'home', line1, line2, city: cP[0], postcode, country},
			// {
			// 	type: 'work',
			// 	line1: 'Baa Baa Baa',
			// 	line2: 'Felonius Gru',
			// 	city: 'Minion',
			// 	postcode: 'GR00',
			// 	country: 'Illumination'
			// }
		]


		contacts.push(new Contact(id, name, phone, email, address, dates, other, notes))
		i++
	})
}

for (let i = 0; i < 4; i++) {
	addAllContacts()
}


export default contacts
