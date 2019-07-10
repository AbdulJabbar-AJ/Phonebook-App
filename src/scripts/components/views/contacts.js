import React from 'react'
import { connect } from 'react-redux'
import { showContact, hideContact, newContact, filterSearch, windowInit, windowResize, contactsScrollTop, logPrevContact } from '../../redux/actions'
import AddContact from './add'
import Contact from './contact'
import Card from './contactCard'
import add from '../../../media/img/icons/add.svg'
import search from '../../../media/img/icons/search.svg'



// Searchbar
class Searchbar extends React.Component {
  filter () {
    const terms = document.getElementById('search').value.split(' ')
    this.props.filter(terms.filter(term => term !== ''))
  }

  render () {
    return (
      <div className='searchbarContainer'>
        <div className='searchbar'>
          <label htmlFor='search'><img src={search} /></label>
          <input id='search' placeholder='search...' onChange={() => this.filter()} />
        </div>
      </div>
    )
  }
}

// Add Contact Button Component
class Add extends React.Component {
  newCon () {
    this.props.logPrevContact(this.props.activeContact)
    this.props.newCon(true)
    this.props.hideContact()
  }

  render () {
    return (
      <div className='add' onClick={() => this.newCon()}>
        <img src={add} />
      </div>
    )
  }
}

class ContactList extends React.Component {
  sortListOfObjects (array, prop) {
    array.sort(
      function (a, b) {
        function name (con) {
          let name
          if (con.name.first && con.name.last) {
            name = con.name[prop].toLowerCase()
          } else if (con.name.first || con.name.last) {
            if (con.name.first) {
              name = con.name.first.toLowerCase()
            } else name = con.name.last.toLowerCase()
          } else name = con.name.company.toLowerCase()
          return name
        }
        let x = name(a)
        let y = name(b)
        // EITHER --- x.localeCompare(y)
        // OR --- (x > y) - (y > x) OR (x > y) - (x < y)
        // Difference??
        return (x > y) - (y > x)
      }
    )
    return array
  }

  generatePhonebook (contacts, sort) {
    let phonebook = []
    const numero =
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '#', '$', '%', '&', '(', ')', '*', '+', ',', '.', '-', ':', ';', '<', '>', '=', '?', '@', '[', ']', '^', '_', '{', '}', '|', '~']

    // ONLY ALLOW ALPHANUMERIC FIRST LETTER AND MUST BE A VALUE IN EITHER {FIRST, LAST, COMPANY}
    function firstChar (con) {
      let first
      if (con.name.first && con.name.last) {
        first = con.name[sort][0].toUpperCase()
      } else if (con.name.first || con.name.last) {
        if (con.name.first) {
          first = con.name.first[0].toUpperCase()
        } else first = con.name.last[0].toUpperCase()
      } else first = con.name.company[0].toUpperCase()
      return first
    }

    function addToSection (con) {
      let first = firstChar(con)
      let sections = phonebook.map(section => section.letter)

      if (numero.includes(first)) {
        if (sections.includes('#')) {
          let i = sections.findIndex(sec => sec === '#')
          phonebook[i].cons.push(con)
        } else {
          phonebook = [
            ...phonebook, { letter: '#', cons: [con] }
          ]
        }
      } else {
        if (sections.includes(first)) {
          let i = sections.findIndex(sec => sec === first)
          phonebook[i].cons.push(con)
        } else {
          phonebook = [
            ...phonebook, { letter: first, cons: [con] }
          ]
        }
      }
    }

    contacts.forEach(con => addToSection(con))

    return phonebook
  }

  checkFilter () {
    const value = document.getElementById('search')
    if (!value || value.value === '') {
      return this.props.contacts
    } else {
      return this.props.filteredContacts
    }
  }

  render () {
    const sort = this.props.sortBy
    const last = this.props.sortBy === 'first' ? 'last' : 'first'
    const contacts = this.checkFilter()
    const phonebook = this.generatePhonebook(
      this.sortListOfObjects(
        this.sortListOfObjects(
          contacts, last)
        , sort)
      , sort)

    const contactList = contacts.length ? (
      <div className='contactList'>
        {phonebook.map((section) => {
          return (
            <div className='contactSection' key={section.letter}>
              <div className='letter'>{section.letter}</div>
              <div className='contacts'>
                {section.cons.map((con) => {
                  return <Contact con={con} key={con.id} type='Contact' />
                })}
              </div>
            </div>
          )
        })}
      </div>
    ) : (<div className='empty'>No Contacts</div>)

    return contactList
  }
}

class ContactsView extends React.Component {
  componentWillMount () {
    if (window.innerWidth < 560) {
      this.props.windowInit('small')
    } else {
      this.props.windowInit('large')
    }
  }

  componentDidMount () {
    if (!this.props.activeContact && window.innerWidth >= 560) {
      this.props.showContact(this.props.contacts[0])
    }

    if (this.props.contacts.length) {
      const header = document.querySelector('.heading')
      const heading = document.querySelector('.heading h1')
      const section = document.querySelector('.contactsPanel')
      const contactList = document.querySelector('.contactList')
      const letters = Array.from(contactList.querySelectorAll('.letter'))

      section.scrollTo(0, this.props.contactsScroll)

      section.addEventListener('scroll', () => {
        const top = section.scrollTop

        if (top === 0) {
          heading.removeAttribute('style')
          contactList.removeAttribute('style')
        } else if (top <= 100) {
          heading.style.fontSize = `${32 - (top / 10)}px`
        } else {
          heading.style.fontSize = '22px'
        }

        letters.forEach(letter => {
          letter.style.top = `${header.offsetHeight}px`
        })

        this.props.contactsScrollTop(top)
      })
    }
  }

  render () {
    const con = this.props.activeContact
    const newCon = this.props.newContact ? <AddContact /> : ''
    return (
      <div className='view contacts'>
        <div className='contactsPanel'>
          <div className='heading'>
            <h1>Contacts</h1>
            <Add {...this.props} />
            <Searchbar filter={this.props.filterSearch} />
          </div>
          <ContactList {...this.props} />
        </div>
        <div className='output'>
          {con ? <Card con={con} type='Contact' /> : ''}
          {newCon}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts,
  newContact: state.newContact,
  sortBy: state.sortBy,
  filteredContacts: state.filteredContacts,
  activeContact: state.activeContact,
  windowWidth: state.windowWidth,
  contactsScroll: state.contactsScroll
})

const mapDispatchToProps = dispatch => {
  return {
    filterSearch: terms => dispatch(filterSearch(terms)),
    newCon: boolean => dispatch(newContact(boolean)),
    showContact: contact => dispatch(showContact(contact)),
    hideContact: () => dispatch(hideContact()),
    windowInit: width => dispatch(windowInit(width)),
    contactsScrollTop: distTop => dispatch(contactsScrollTop(distTop)),
    logPrevContact: contact => dispatch(logPrevContact(contact))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsView)
