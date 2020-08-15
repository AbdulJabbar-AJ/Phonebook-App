import React from 'react'
import { connect } from 'react-redux'
import { editContact, updateContactData, showContact, showFav, showGroupMem, addContactEntry, deleteContact, removeFavourite, hideFav } from '../redux/actions'
import { alphanumeric } from './add'
import trash from '../../media/img/icons/trash.svg'
import add from '../../media/img/icons/addWhite.svg'
import remove from '../../media/img/icons/remove.svg'
import radioOff from '../../media/img/icons/radioFalse.svg'




export function Name (props) {
  const nm = props.name
  return (
    <div className='cardSection contactName'>
      <div className='heading'>Name</div>
      <div className='entry'>
        <label className='type'>Title</label>
        <input className='data' id='prefix' type='text' defaultValue={nm.prefix} />
      </div>
      <div className='entry'>
        <label className='type'>First Name</label>
        <input className='data' id='first' type='text' defaultValue={nm.first} />
      </div>
      <div className='entry'>
        <label className='type'>Last Name</label>
        <input className='data' id='last' type='text' defaultValue={nm.last} />
      </div>
      <div className='entry'>
        <label className='type'>Company</label>
        <input className='data' id='company' type='text' defaultValue={nm.company} />
      </div>
    </div>
  )
}

function Option (props) {
  return <option>{props.option}</option>
}

const opts = {
  home: <Option option='home' />,
  work: <Option option='work' />,
  mobile: <Option option='mobile' />,
  office: <Option option='office' />,
  other: <Option option='other' />,
  custom: <Option option='custom' />,
  bday: <Option option='birthday' />,
  anni: <Option option='anniversary' />,
  web: <Option option='website' />,
  fb: <Option option='Facebook' />,
  twitter: <Option option='Twitter' />,
  insta: <Option option='Instagram' />,
  linkedin: <Option option='LinkedIn' />
}

function removeEntry (e) {
  const entry = e.target.parentNode.parentNode
  entry.outerHTML = ''
}

// class Confirm extends React.Component {
//   render () {
//     return (
//       <div>
//         <p>Are you sure?</p>
//         <div>
//           <p>Yes</p>
//           <p>N</p>
//         </div>
//       </div>
//     )
//   }
// }


class RemoveEntry extends React.Component {
  render () {
    return (
      <div className='removeEntry' onClick={(e) => removeEntry(e)}>
        <img src={remove} />
      </div>
    )
  }
}

class Phone extends React.Component {
  constructor (props) {
    super(props)
    const numbers = this.props.phone
    let i = -1
    const phone = numbers && numbers[0] ? (
      <div>
        {numbers.map(num => {
          i++
          return (
            <div className='entry' key={i} >
              <RemoveEntry />
              <select className='type' name='type' defaultValue={num.type}>
                {opts.home}{opts.work}{opts.mobile}{opts.office}{opts.other}
              </select>
              <input className='data' name='data' type='number' defaultValue={num.number} />
              <input className='primary' name='phone' type='radio' defaultChecked={num.primary} />
            </div>
          )
        })}
      </div>
    ) : ''

    this.state = {
      phone: numbers && numbers[0] ? [...phone.props.children] : []
    }
  }

  addEntry (newEl) {
    this.setState((prevState) => ({
      phone: [...prevState.phone, newEl]
    }))
  }

  render () {
    const newEl = (
      <div className='entry' key={this.state.phone.length} >
        <RemoveEntry />
        <select className='type' name='type'>
          {opts.home}{opts.work}{opts.mobile}{opts.office}{opts.other}
        </select>
        <input className='data' name='data' type='number' />
        <input className='primary' name='phone' type='radio' />
      </div>
    )

    return (
      <div className='cardSection phone'>
        <div className='heading'>
          Phone
          <small>Primary</small>
        </div>
        {this.state.phone}
        <div className='add addEntry' onClick={() => this.addEntry(newEl)}>
          <img src={add} />
        </div>
      </div>
    )
  }
}

class Address extends React.Component {
  constructor (props) {
    super(props)
    const addrs = props.address
    let i = -1
    const address = addrs && addrs[0] ? (
      <div>
        {addrs.map(addr => {
          i++
          let _1 = ''
          let _2 = ''
          if (addr.city && addr.county) { _1 = ', ' }
          if (addr.postcode && addr.country) { _2 = ', ' }
          return (
            <div className='entry' key={i} >
              <select className='type' name='type' defaultValue={addr.type}>
                {opts.home}{opts.work}{opts.office}{opts.other}
              </select>
              <div className='data'>
                <input name='addrLine1' type='text' defaultValue={addr.line1} placeholder='Line 1' />
                <input name='addrLine2' type='text' defaultValue={addr.line2} placeholder='Line 2' />
                <input name='city' type='text' defaultValue={addr.city} placeholder='City/Town' />
                <input name='county' type='text' defaultValue={addr.county} placeholder='County' />
                <input name='postcode' type='text' defaultValue={addr.postcode} placeholder='Post Code' />
                <input name='country' type='text' defaultValue={addr.country} placeholder='Country' />
              </div>
              <RemoveEntry />
            </div>
          )
        })}
      </div>
    ) : ''

    this.state = {
      address: addrs && addrs[0] ? [...address.props.children] : []
    }
  }

  addEntry (newEl) {
    this.setState((prevState) => ({
      address: [...prevState.address, newEl]
    }))
  }


  render () {
    const newEl = (
      <div className='entry' key={this.state.address.length} >
        <select className='type' name='type'>
          {opts.home}{opts.work}{opts.office}{opts.other}
        </select>
        <div className='data'>
          <input name='addrLine1' type='text' placeholder='Line 1' />
          <input name='addrLine2' type='text' placeholder='Line 2' />
          <input name='city' type='text' placeholder='City/Town' />
          <input name='county' type='text' placeholder='County' />
          <input name='postcode' type='text' placeholder='Post Code' />
          <input name='country' type='text' placeholder='Country' />
        </div>
        <RemoveEntry />
      </div>
    )

    return (
      <div className='cardSection address'>
        <div className='heading'>
          Address
        </div>
        {this.state.address}
        <div className='add addEntry' onClick={() => this.addEntry(newEl)}>
          <img src={add} />
        </div>
      </div>
    )
  }
}

class Email extends React.Component {
  constructor (props) {
    super(props)
    const emails = props.email
    let i = -1
    const email = emails && emails[0] ? (
      <div>
        {emails.map(email => {
          i++
          return (
            <div className='entry' key={i}>
              <RemoveEntry />
              <select className='type' name='type' defaultValue={email.type}>
                {opts.home}{opts.work}{opts.office}{opts.other}
              </select>
              <input className='data' name='data' type='email' defaultValue={email.address} />
              <input className='primary' name='email' type='radio' defaultChecked={email.primary} />
            </div>
          )
        })}
      </div>
    ) : ''

    this.state = {
      email: emails && emails[0] ? [...email.props.children] : []
    }
  }

  addEntry (newEl) {
    this.setState((prevState) => ({
      email: [...prevState.email, newEl]
    }))
  }

  render () {
    const newEl = (
      <div className='entry' key={this.state.email.length}>
        <RemoveEntry />
        <select className='type' name='type' >
          {opts.home}{opts.work}{opts.office}{opts.other}
        </select>
        <input className='data' name='data' type='email' />
        <input className='primary' name='email' type='radio' />
      </div>
    )

    return (
      <div className='cardSection email'>
        <div className='heading'>
          Email
          <small>Primary</small>
        </div>
        {this.state.email}
        <div className='add addEntry' onClick={() => this.addEntry(newEl)}>
          <img src={add} />
        </div>
      </div>
    )
  }
}


const months =
['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const years = []
for (let i = 1900; i <= 2100; i++) {
  years.push(i)
}

const days = []
for (let i = 1; i <= 31; i++) {
  days.push(i)
}



class Dates extends React.Component {
  constructor (props) {
    super(props)
    const dates = props.dates
    let i = -1
    const date = dates && dates[0] ? (
      <div>
        {dates.map(date => {
          i++
          return (
            <div className='entry' key={i} >
              <RemoveEntry />
              <select className='type' name='type' defaultValue={date.type}>
                {opts.bday}{opts.anni}{opts.other}
              </select>

              <div className='data' name='data'>

                <select defaultValue={days.indexOf(date.date[0]) + 1}>
                  {days.map((day, index) => {
                    return (
                      <option value={index + 1} key={index}>{day}</option>
                    )
                  })}
                </select>

                <select defaultValue={months.indexOf(date.date[1]) + 1}>
                  {months.map((month, index) => {
                    return (
                      <option value={index + 1} key={index}>{month}</option>
                    )
                  })}
                </select>

                <select defaultValue={years.indexOf(date.date[2]) + 1}>
                  {years.map((year, index) => {
                    return (
                      <option value={index + 1} key={index}>{year}</option>
                    )
                  })}
                </select>

              </div>
            </div>
          )
        })}
      </div>
    ) : ''

    this.state = {
      date: dates && dates[0] ? [...date.props.children] : []
    }
  }

  addEntry (newEl) {
    this.setState((prevState) => ({
      date: [...prevState.date, newEl]
    }))
  }

  render () {
    const newEl = (
      <div className='entry' key={this.state.date.length}>
        <RemoveEntry />
        <select className='type' name='type'>
          {opts.bday}{opts.anni}{opts.other}
        </select>

        <div className='data' name='data'>

          <select defaultValue={new Date().getDate()}>
            {days.map((day, index) => {
              return (
                <option value={index + 1} key={index}>{day}</option>
              )
            })}
          </select>

          <select defaultValue={new Date().getMonth() + 1}>
            {months.map((month, index) => {
              return (
                <option value={index + 1} key={index}>{month}</option>
              )
            })}
          </select>

          <select defaultValue={new Date().getFullYear() - 1899}>
            {years.map((year, index) => {
              return (
                <option value={index + 1} key={index}>{year}</option>
              )
            })}
          </select>

        </div>
      </div>
    )

    return (
      <div className='cardSection dates'>
        <div className='heading'>
          Dates
        </div>
        {this.state.date}
        <div className='add addEntry' onClick={() => this.addEntry(newEl)}>
          <img src={add} />
        </div>
      </div>
    )
  }
}

class Other extends React.Component {
  constructor (props) {
    super(props)
    const others = props.other
    let i = -1
    const other = others && others[0] ? (
      <div>
        {others.map(other => {
          i++
          return (
            <div className='entry' key={i}>
              <RemoveEntry />
              <select className='type' name='type' defaultValue={other.type}>
                {opts.web}{opts.fb}{opts.twitter}{opts.linkedin}{opts.insta}{opts.other}
              </select>
              <input className='data' name='data' type='text' defaultValue={other.data} />
            </div>
          )
        })}
      </div>
    ) : ''


    this.state = {
      other: others && others[0] ? [...other.props.children] : []
    }
  }

  addEntry (newEl) {
    this.setState((prevState) => ({
      other: [...prevState.other, newEl]
    }))
  }

  render () {
    const newEl = (
      <div className='entry' key={this.state.other.length} >
        <RemoveEntry />
        <select className='type' name='type'>
          {opts.web}{opts.fb}{opts.twitter}{opts.linkedin}{opts.insta}{opts.other}
        </select>
        <input className='data' name='data' type='text' />
      </div>
    )

    return (
      <div className='cardSection other'>
        <div className='heading'>
          Other
        </div>
        {this.state.other}
        <div className='add addEntry' onClick={() => this.addEntry(newEl)}>
          <img src={add} />
        </div>
      </div>
    )
  }
}

// WILL NEED PARSING FOR SPACES AND NEW LINES
class Notes extends React.Component {
  componentDidMount () {
    this.resetSize()
  }

  resetSize () {
    const textarea = document.querySelector('textarea')
    textarea.style.height = 0
    textarea.style.height = `${textarea.scrollHeight - 6}px`
  }

  resizeAndScroll () {
    this.resetSize()
    const card = document.querySelector('.output')

    card.scrollTo({
      top: card.scrollHeight,
      behavior: 'smooth'
    })
  }

  render () {
    return (
      <div className='cardSection notes'>
        <div className='heading'>Notes</div>
        <textarea defaultValue={this.props.notes} onChange={() => this.resizeAndScroll()} />
      </div>
    )
  }
}


class EditCard extends React.Component {
  submit (form, id) {
    // REMEMBER - THIS NEEDS TO UPDATE AN EXISTING CONTACT, NOT CREATE A NEW ONE
    // Only way is to create a new contact objet here locally scoped. Then send an Action to Redux store to set array[con.id] = new Contact
    // Easy

    function rtnArrOfVals (section, type, value = 'value') {
      return [...form.querySelector(section).querySelectorAll(type)].map(entry => entry[value])
    }

    // Returns an [{}, {}, {}] from [keys] and [[values], [values], [values]]
    function rtnArrOfObjs (keys, values) {
      let x = []

      for (let i = 0; i < values[0].length; i++) {
        let y = {}
        let j = 0

        keys.forEach(key => {
          y[key] = values[j][i]
          j++
        })

        x.push(y)
      }

      return x
    }

    // NAME
    function name () {
      const name = rtnArrOfVals('.contactName', '.entry input')
      return { prefix: name[0], first: name[1], last: name[2], company: name[3] }
    }

    // PHONE
    function phone () {
      let type = rtnArrOfVals('.phone', '.entry .type')
      let data = rtnArrOfVals('.phone', '.entry .data')
      let primary = rtnArrOfVals('.phone', '.entry .primary', 'checked')
      return rtnArrOfObjs(['type', 'number', 'primary'], [type, data, primary])
    }

    // EMAIL
    function email () {
      let type = rtnArrOfVals('.email', '.entry .type')
      let data = rtnArrOfVals('.email', '.entry .data')
      let primary = rtnArrOfVals('.email', '.entry .primary', 'checked')
      return rtnArrOfObjs(['type', 'address', 'primary'], [type, data, primary])
    }

    // ADDRESS
    function address () {
      let type = rtnArrOfVals('.address', '.entry .type')
      let data = [...form.querySelector('.address').querySelectorAll('.entry .data')]
      let i = 0
      let x = []

      data.forEach(entry => {
        let vals = [...entry.querySelectorAll('input')].map(inp => inp.value)

        let address = {
          type: type[i],
          line1: vals[0],
          line2: vals[1],
          city: vals[2],
          county: vals[3],
          postcode: vals[4],
          country: vals[5]
        }
        x.push(address)
        i++
      })
      return x
    }

    // DATES
    function dates () {
      let type = [...form.querySelector('.dates').querySelectorAll('.entry .type')].map(entry => entry.selectedOptions[0].value)

      let data = [...form.querySelector('.dates').querySelectorAll('.entry .data')].map(entry => {
        return ([
          Number(entry.querySelectorAll('select')[0].selectedOptions[0].innerText),
          entry.querySelectorAll('select')[1].selectedOptions[0].innerText,
          Number(entry.querySelectorAll('select')[2].selectedOptions[0].innerText)
        ])
      })

      return rtnArrOfObjs(['type', 'date'], [type, data])
    }

    // OTHER
    function other () {
      let type = rtnArrOfVals('.other', '.entry .type')
      let data = rtnArrOfVals('.other', '.entry .data')
      return rtnArrOfObjs(['type', 'data'], [type, data])
    }

    // NOTES
    function notes () {
      return form.querySelector('.notes').querySelector('textarea').value
    }

    const contact = {
      name: name(),
      phone: phone(),
      email: email(),
      address: address(),
      dates: dates(),
      other: other(),
      notes: notes(),
      id
    }

    // Validate name
    // WARNING: Copied form Add.js. Keep in sync. Bad practice.
    let first = contact.name.first
    let last = contact.name.last
    let company = contact.name.company

    if (first || last || company) {
      if (
        (first && !alphanumeric.includes(first[0].toUpperCase())) ||
        (last && !alphanumeric.includes(last[0].toUpperCase())) ||
        (company && !alphanumeric.includes(company[0].toUpperCase()))
      ) {
        this.props.nameError(
          `Please ensure names begins with any of the following:\n [A-Z] [0-9] ! # $ % & ( ) * + , . - : ; < > = ? @ [ ] ^ _ { } | ~`
        )
      } else {
        this.props.update(contact, id)
        this.props.close('')
        this.checkType(contact, this.props.type)
      }
    } else {
      this.props.nameError('Please enter a first, last or company name')
    }
  }


  checkType (con, type) {
    switch (type) {
      case 'Contact':
        return this.props.showContact(con)
      case 'Favourite':
        return this.props.showFav(con)
      case 'GroupMem':
        return this.props.showGroupMem(con)
    }
  }


  deleteContact (id) {
    let next
    if (this.checkFav(id)) {
      this.props.rmFav(id)
      if (this.props.activeFav && this.props.activeFavourite.id === id) {
        if (this.props.favs.length > 1) {
          if (this.props.favs[0].conId === id) {
            next = this.props.favs[1].conId
          } else {
            next = this.props.favs[0].conId
          }
          if (this.props.windowWidth !== 'small') {
            this.props.showFav(this.props.contacts.find(con => con.id === next))
          } else this.props.hideFav()
        } else this.props.hideFav()
      }
    }

    if (this.props.activeCon.id === id) {
      if (this.props.cons.length > 1) {
        if (this.props.cons[0].id === id) {
          next = this.props.cons[1].id
        } else {
          next = this.props.cons[0].id
        }
        if (this.props.windowWidth !== 'small') {
          this.props.showContact(this.props.contacts.find(con => con.id === next))
        } else this.props.hideContact()
      } else this.props.hideContact()
    }

    this.props.reduceGroups(id)
    this.props.delete(id)
    if (id === this.props.activeGroupMem.id) {
      this.props.hideGroupMem()
    }
  }

  checkFav (id) {
    let favs = this.props.favs.map(fav => fav.conId)
    return favs.includes(id)
  }


  render () {
    const con = this.props.con
    const first = con.name[this.props.displayBy]
    const last = this.props.displayBy === 'first' ? con.name.last : con.name.first

    const title = con.name.first || con.name.last ? (
      <div className='title'>
        <div className='fullName'>{con.name.prefix} {first} {last}</div>
        <div className='company'>{con.name.company}</div>
      </div>
    ) : (
      <div className='title'>
        <div className='fullName'>{con.name.company}</div>
      </div>
    )

    return (
      <div className='contactCard edit'>
        {title}
        <div className='details'>
          <form name='editConForm'>
            <Name name={con.name} />
            <Phone phone={con.phone} />
            <Email email={con.email} />
            <Address address={con.address} />
            <Dates dates={con.dates} />
            <Other other={con.other} />
            <Notes notes={con.notes} />
          </form>
        </div>

        <div className='edits confirm'>
          <div className='done' onClick={() => this.submit(editConForm, con.id)}> DONE </div>
          <div className='cancel' onClick={() => this.props.close('')} > CANCEL </div>
          <img className='btn-trash' src={trash} onClick={() => this.deleteContact(con.id)} />
        </div>

      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    cons: state.contacts,
    favs: state.favs,
    groups: state.groups,
    activeCon: state.activeContact,
    activeFavourite: state.activeFavourite,
    activeGroupMem: state.activeGroupMember,
    beingEdited: state.beingEdited,
    displayBy: state.displayBy,
    windowWidth: state.windowWidth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    close: id => dispatch(editContact(id)),
    update: (contact, id) => dispatch(updateContactData(contact, id)),
    delete: id => dispatch(deleteContact(id)),
    addContactEntry: (id, section, value) => dispatch(addContactEntry(id, section, value)),
    rmFav: id => dispatch(removeFavourite(id)),
    hideFav: () => dispatch(hideFav()),
    showContact: contact => dispatch(showContact(contact)),
    showFav: contact => dispatch(showFav(contact)),
    showGroupMem: contact => dispatch(showGroupMem(contact))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCard)
