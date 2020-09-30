import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

export default class Contact {
	constructor(name = new Name, phone = [new Phone], email = [], address = [], dates = [], other = [], notes = '', id = uuidv4()) {
		this.id = id
		this.name = name
		this.phone = phone
		this.email = email
		this.address = address
		this.dates = dates
		this.other = other
		this.notes = notes
	}
}


export class Name {
	constructor() {
		this.prefix = ''
		this.first = ''
		this.last = ''
		this.company = ''
	}
}

export class Phone {
	constructor() {
		this.number = ''
		this.type = 'home'
		this.primary = false
	}
}

export class Email {
	constructor() {
		this.number = ''
		this.type = 'home'
		this.primary = false
	}
}

export class Address {
	constructor() {
		this.type = 'home'
		this.line1 = ''
		this.line2 = ''
		this.city = ''
		this.county = ''
		this.postcode = ''
		this.country = ''
	}
}

export class Date {
	constructor() {
		this.type = 'birthday'
		this.date = moment().format('D-MMM-YYYY').split('-').map((val, i) => i === 1 ? val : Number(val))
	}
}

export class Other {
	constructor() {
		this.type = 'Twitter'
		this.data = ''
	}
}


// Example Contact object
// const Contact = {
//   name: { prefix: '', first: '', last: '', company: '' },
//   phone: [ { number: '', type: '', primary: '' } ],
//   email: [ { address: '', type: '', primary: '' } ],
//   address: [ { type: '', line1: '', line2: '', city: '', county: '', postcode: '', country: '' } ],
//   dates: [ { type: '', date: ['dd', 'mmmm', 'yyyy'] } ],
//   other: [ { data: '', type: '' } ],
//   notes: ''
// }
