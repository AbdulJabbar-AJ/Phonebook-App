import moment from 'moment'

export default class Contact {
	constructor(id, name = {}, phone = [{number: '1', type: 'home', primary: false}], email = [], address = [], dates = [], other = [], notes = '') {
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


export const phone = { number: '', type: 'home', primary: false }
export const email = { address: '', type: 'home', primary: false }
export const address = { type: 'home', line1: '', line2: '', city: '', county: '', postcode: '', country: '' }
export const date = { type: 'birthday', date: moment().format('D-MMM-YYYY').split('-').map((val, i) => i === 1 ? val : Number(val)) }
export const other = { data: '', type: 'Twitter' }

// const contact = {
//   name: { prefix: '', first: '', last: '', company: '' },
//   phone: [
//     { number: '', type: '', primary: '' }
//   ],
//   email: [
//     { address: '', type: '', primary: '' }
//   ],
//   address: [
//     { type: '', line1: '', line2: '', city: '', county: '', postcode: '', country: '' }
//   ],
//   dates: [
//     { type: '', date: ['dd', 'mmmm', 'yyyy'] }
//   ],
//   other: [
//     { data: '', type: '' }
//   ],
//   notes: ''
// }

