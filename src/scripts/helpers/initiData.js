import * as dummyData from './dummyData.json'
const data = dummyData.data
import Contact from './classConstructors/contact'
import Group from './classConstructors/group'

/********************************************************************************************/
/************************************ CONTACTS **********************************************/
/********************************************************************************************/
export const contacts = []
function addAllContacts () {
	data.forEach(contact => {
		const name = {
			prefix: '',
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


		const address = [ {type: 'home', line1, line2, city: cP[0], postcode, country} ]


		contacts.push(new Contact(name, phone, email, address, dates, other, notes))
	})
}

for (let i = 0; i < 1; i++) {
	addAllContacts()
}


/********************************************************************************************/
/************************************ FAVOURITES ********************************************/
/********************************************************************************************/
export const favourites = []

for (let i = 3; i < 8; i++) {
	favourites.push(contacts[i].id)
}


/********************************************************************************************/
/************************************** GROUPS **********************************************/
/********************************************************************************************/
export const groups = []

function generateDummyMembers(n) {
	const members = []
	for (let i = 0; i < n; i++) {
		members.push(contacts[i].id)
	}
	return members
}


for (let i = 0; i < 4; i++) {
	groups.push((new Group('Friends', generateDummyMembers(3))))
}

groups.push((new Group('Family', generateDummyMembers(10))))

