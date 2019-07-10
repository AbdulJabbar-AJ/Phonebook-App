import { connect } from 'react-redux'
import { addContact } from './redux/actions'

export class Contact {
  constructor (name, phone, email, address, dates, other, notes, id) {
    this.name = name
    this.phone = phone
    this.email = email
    this.address = address
    this.dates = dates
    this.other = other
    this.notes = notes
    this.id = id
  }
}

// // // FORMAT
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


let data = [
  {
    name: 'Oleta Level',
    phone_number: '+442032960159',
    address: '10 London Wall, London EC2M 6SA, UK'
  }, {
    name: 'Maida Harju',
    phone_number: '+442032960899',
    address: 'Woodside House, 94 Tockholes Rd, Darwen BB3 1LL, UK'
  }, {
    name: 'Lia Pigford',
    phone_number: '+442032960182',
    address: '23 Westmorland Cl, Darwen BB3 2TQ, UK'
  }, {
    name: 'Ghislaine Darden',
    phone_number: '+442032960427',
    address: '20-24 Knowlesly Rd, Darwen BB3 2NE, UK'
  }, {
    name: 'Jana Spitler',
    phone_number: '+442032960370',
    address: '4 St Lucia Cl, Darwen BB3 0SJ, UK'
  }, {
    name: 'Dolly Detweiler',
    phone_number: '+442032960977',
    address: '18 Johnson Rd, Darwen BB3, UK'
  }, {
    name: 'Stanley Vanderhoof',
    phone_number: '+442032960000',
    address: '17 Anchor Ave, Darwen BB3 0AZ, UK'
  }, {
    name: 'Adan Milian',
    phone_number: '+442032960011',
    address: '20 Ellerbeck Rd, Darwen BB3 3EX, UK'
  }, {
    name: 'Marivel Molina',
    phone_number: '+442032960013',
    address: 'Tockholes Rd, Darwen BB3, UK'
  }, {
    name: 'Kris Everett',
    phone_number: '+442032960012',
    address: 'Pinewood, Tockholes Rd, Darwen BB3 1JY, UK'
  }
]

let contacts = []
let i = 1

data.forEach(contact => {
  let con = new Contact()

  let first, last, phone, addLine1, addLine2, city, postcode, country
  let addr = contact.address.split(', ')
  let cP = addr[addr.length - 2].split(' ')

  first = contact.name.split(' ')[0]
  last = contact.name.split(' ')[1]
  phone = contact.phone_number
  addLine1 = addr[0]

  if (addLine1 !== addr[addr.length - 3]) {
    addLine2 = addr[1]
  }

  city = cP[0]

  if (cP[2]) {
    postcode = `${cP[1]} ${cP[2]}`
  } else {
    postcode = cP[1]
  }

  country = addr[addr.length - 1]

  con.name = { first, last }
  con.phone = [
    { number: phone, type: 'home', primary: false },
    { number: '1111', type: 'work', primary: true },
    { number: '2222', type: 'mobile', primary: false }
  ]
  con.address = [
    { type: 'home', line1: addLine1, line2: addLine2, city: city, postcode: postcode, country: country },
    { type: 'work', line1: 'Baa Baa Baa', line2: 'Felonius Gru', city: 'Minion', postcode: '6RU M00n', country: 'Illumination' }
  ]

  con.id = i
  i++

  con.email = [
    { address: 'test@mail.com', type: 'home', primary: false },
    { address: 'test@mail.com', type: 'work', primary: true },
    { address: 'test@mail.com', type: 'other', primary: false }
  ]

  con.dates = [
    { date: [1, 'Jan', 1950], type: 'birthday' },
    { date: [2, 'Feb', 2000], type: 'anniversary' }
  ]

  con.other = [
    { data: '@DespicableMe', type: 'Twitter' },
    { data: 'facebook.com/DespicableMe', type: 'Facebook' },
    { data: 'www.despicable.me', type: 'website' }
  ]

  con.notes = 'This is a note.'

  con.name.company = 'hackajob.co'

  contacts.push(con)
})

export default contacts
