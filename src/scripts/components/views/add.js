import React from 'react'
import { connect } from 'react-redux'
import { newContact, addContact, showContact, contactKeyIncrement, nameError } from '../../redux/actions'
import Tippy from '@tippy.js/react'
import { Contact } from '../../initdata.js'
import add from '../../../media/img/icons/addWhite.svg'
import remove from '../../../media/img/icons/remove.svg'

export const alphanumeric = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!', '#', '$', '%', '&', '(', ')', '*', '+', ',', '.', '-', ':', ';', '<', '>', '=', '?', '@', '[', ']', '^', '_', '{', '}', '|', '~']

export function Name (props) {
  return (
    <div className='cardSection contactName'>
      <div className='heading'>Name</div>
      <div className='entry'>
        <label className='type'>Title</label>
        <input className='data' id='prefix' type='text' />
      </div>
      <div className='entry'>
        <label className='type'>First Name</label>
        <input className='data' id='first' type='text' />
      </div>
      <div className='entry'>
        <label className='type'>Last Name</label>
        <input className='data' id='last' type='text' />
      </div>
      <div className='entry'>
        <label className='type'>Company</label>
        <input className='data' id='company' type='text' />
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
  const entry = e.target.parentNode
  entry.outerHTML = ''
}

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
    this.state = {
      phone: []
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
    this.state = {
      address: []
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
        <RemoveEntry />
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
      </div>
    )

    return (
      <div className='cardSection address'>
        <div className='heading'>Address</div>
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
    this.state = {
      email: []
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
          {opts.home}{opts.work}{opts.office}
        </select>
        <input className='data' name='data' type='email' />
        <input className='primary' name='email' type='radio' />
      </div>
    )

    return (
      <div className='cardSection email'>
        <div className='heading'>Email</div>
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
    this.state = {
      date: []
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
        <div className='heading'>Dates</div>
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
    this.state = {
      other: []
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
        <div className='heading'>Other</div>
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
    textarea.style.height = `${textarea.scrollHeight - 4}px`
  }

  resizeAndScroll () {
    this.resetSize()
    const card = document.querySelector('.contactCard')

    card.scrollTo({
      top: card.scrollHeight,
      behavior: 'smooth'
    })
  }

  render () {
    return (
      <div className='cardSection notes'>
        <div className='heading'>Notes</div>
        <textarea onChange={() => this.resizeAndScroll()} />
      </div>
    )
  }
}


class EditCard extends React.Component {
  submit (form) {
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



    const contact = new Contact(name(), phone(), email(), address(), dates(), other(), notes(), this.props.contactKey)

    // VALIDATE AND SUBMIT
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
        this.props.add(contact)
        this.props.close('')
        this.props.contactKeyIncrement()
      }
    } else {
      this.props.nameError('Please enter a first, last or company name')
    }

    this.props.showContact(contact)
  }

  cancel () {
    this.props.close('')
    this.props.showContact(this.props.prevContact)
  }

  render () {
    return (
      <div className='contactCard edit addContact'>

        <div className='title'>
          <div className='fullName'>New Contact</div>
        </div>

        <div className='details'>
          <form name='newConForm'>
            <Name />
            <Phone />
            <Email />
            <Address />
            <Dates />
            <Other />
            <Notes />
          </form>
        </div>

        <div className='edits confirm'>

          <Tippy content={this.props.err} arrow arrowType='round' animation='fade' interactive trigger='click' >
            <div className='done' onClick={() => this.submit(newConForm)}>DONE</div>
          </Tippy>

          <div className='cancel' onClick={() => this.cancel()}>CANCEL</div>
        </div>

      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    favs: state.favs,
    groups: state.groups,
    activeCon: state.activeContact,
    activeFavourite: state.activeFavourite,
    activeGroupMem: state.activeGroupMember,
    beingEdited: state.beingEdited,
    contactKey: state.contactKey,
    err: state.err,
    prevContact: state.prevContact
  }
}

const mapDispatchToProps = dispatch => {
  return {
    add: contact => dispatch(addContact(contact)),
    close: () => dispatch(newContact(false)),
    showContact: contact => dispatch(showContact(contact)),
    contactKeyIncrement: () => dispatch(contactKeyIncrement()),
    nameError: error => dispatch(nameError(error))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCard)
