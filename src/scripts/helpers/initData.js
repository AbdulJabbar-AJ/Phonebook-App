import Contact from './classConstructors/contact'
import Group from './classConstructors/group'
import generateAddress from './generateAddress'
import faker from 'faker'
faker.locale = 'en_GB'
import moment from 'moment'
import { split, occasionally } from './odds'
import { v4 as uuidv4 } from 'uuid'

/********************************************************************************************/
/************************************ CONTACTS **********************************************/
/********************************************************************************************/
function createContact({familyName, companyName, id, hasBday}) {
	const name = {
		prefix: occasionally(faker.name.prefix(), ''),
		first: faker.name.firstName(),
		last: familyName || faker.name.lastName(),
		company: companyName || occasionally(faker.company.companyName(), ''),
	}

	const phoneType = companyName ? 'work' : split('home', 'mobile')

	// ! = non-zero number, # = any number
	const phone = [{
		number: phoneType === 'mobile' ? faker.phone.phoneNumber('07!## ######') : faker.phone.phoneNumber(`+44 (0) ${split(1, 2)}## ### ####`) ,
		type: phoneType,
		primary: false
	}]

	const email = [{
		address: faker.internet.email(name.first, name.last),
		type: companyName ? 'work' : split('home', 'work'),
		primary: false
	}]

	const address = []
	generateAddress().then(res => res ? address.push(res) : null)

	const bday = {
		date: moment(faker.date.between('1980-01-01', '2000-01-01')).format('D-MMM-YYYY').split('-').map((val, i) => i === 1 ? val : Number(val)),
		type: 'birthday'
	}

	const dates = hasBday ? [bday] : occasionally(
		[{
			date: moment(faker.date.between('1980-01-01', '2000-01-01')).format('D-MMM-YYYY').split('-').map((val, i) => i === 1 ? val : Number(val)),
			type: 'birthday'
		}], []
	)

	const other = occasionally([{
		data: faker.internet.domainName(),
		type: 'website'
	}], [])

	const notes = split(faker.lorem.lines(), '')

	return new Contact(name, phone, email, address, dates, other, notes, id)
}

export const contacts = []

for (let i = 0; i < 50; i++) {
	contacts.push(createContact({}))
}



/********************************************************************************************/
/******************************** FAVOURITES & GROUPS ***************************************/
/********************************************************************************************/

// Friends, Family, Work
export const favourites = []
export const groups = []


function generateDummyMembers({n, familyName, companyName, hasBday}) {
	const members = []
	for (let i = 0; i < n; i++) {
		const id = uuidv4()
		const member = createContact({familyName, companyName, id, hasBday})
		contacts.push(member)
		members.push(id)
		if (i < 4) {
			favourites.push(id)
		}
	}
	return members
}


groups.push((new Group('Family', generateDummyMembers({n: 16, familyName: faker.name.lastName(), hasBday: true}))))
groups.push((new Group('Friends', generateDummyMembers({n: 8, hasBday: true}))))
groups.push((new Group('Work', generateDummyMembers({n: 6, companyName: faker.company.companyName()}))))

