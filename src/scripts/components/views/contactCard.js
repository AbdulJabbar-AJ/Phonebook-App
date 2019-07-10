import React from 'react'
import { connect } from 'react-redux'
import 'babel-polyfill'
import { showContact, hideContact, hideFav, showFav, hideGroupMem, addFavourite, removeFavourite, reduceGroups, editContact } from '../../redux/actions'
import close from '../../../media/img/icons/close.svg'
import edit from '../../../media/img/icons/edit.svg'
import trash from '../../../media/img/icons/trash.svg'
import favTrue from '../../../media/img/icons/favTrue.svg'
import favFalse from '../../../media/img/icons/favFalse2.svg'
import Edit from './edit'
import style from '../../mapStyle'
import back from '../../../media/img/icons/back.svg'

export function Phone (props) {
  const numbers = props.phone
  let i = -1
  const phone = numbers && numbers[0] ? (
    <div className='cardSection'>
      <div className='heading'>Phone</div>
      {numbers.map(num => {
        i++
        let primary = num.primary && numbers[1] ? <div className='primary priIndicator'><small>Primary</small></div> : ''
        return (
          <div className='entry' key={i} >
            <div className='type'>{num.type}</div>
            <div className='data'>{num.number}</div>
            {primary}
          </div>
        )
      })}
    </div>
  ) : ''
  return phone
}

class Address extends React.Component {
  render () {
    const addrs = this.props.address
    let i = -1
    const address = addrs && addrs[0] ? (
      <div className='cardSection address'>
        <div className='heading'>Address</div>
        {addrs.map(addr => {
          i++
          let _1 = ''
          let _2 = ''
          if (addr.city && addr.county) { _1 = ', ' }
          if (addr.postcode && addr.country) { _2 = ', ' }

          return (
            <div className='entry' key={i} >
              <div className='type'>{addr.type}</div>
              <div className='data'>
                <div>{addr.line1}</div>
                <div>{addr.line2}</div>
                <div>{addr.city} {_1} {addr.county}</div>
                <div>{addr.postcode} {_2} {addr.country}</div>
              </div>
              <div >
                <img id={`googleMaps${i}`} src='' />
              </div>
            </div>
          )
        })}
      </div>
    ) : ''
    return address
  }
}

export function Email (props) {
  const emails = props.email
  let i = -1
  const email = emails && emails[0] ? (
    <div className='cardSection'>
      <div className='heading'>Email</div>
      {emails.map(email => {
        i++
        let primary = email.primary && emails[1] ? <div className='primary priIndicator'><small>Primary</small></div> : ''
        return (
          <div className='entry' key={i} >
            <div className='type'>{email.type}</div>
            <div className='data'>{email.address}</div>
            {primary}
          </div>
        )
      })}
    </div>
  ) : ''
  return email
}

export function Dates (props) {
  const dates = props.dates
  let i = -1
  const date = dates && dates[0] ? (
    <div className='cardSection'>
      <div className='heading'>Dates</div>
      {dates.map(date => {
        i++
        return (
          <div className='entry' key={i} >
            <div className='type'>{date.type}</div>
            <div className='data'>{date.date[0]} {date.date[1]} {date.date[2]}</div>
          </div>
        )
      })}
    </div>
  ) : ''
  return date
}

export function Other (props) {
  const others = props.other
  let i = -1
  const other = others && others[0] ? (
    <div className='cardSection'>
      <div className='heading'>Other</div>
      {others.map(other => {
        i++
        return (
          <div className='entry' key={i} >
            <div className='type'>{other.type}</div>
            <div className='data'>{other.data}</div>
          </div>
        )
      })}
    </div>
  ) : ''
  return other
}

// WILL NEED PARSING FOR SPACES AND NEW LINES
export function Notes (props) {
  return (
    <div className='cardSection'>
      <div className='heading'>Notes</div>
      <div className='note' >{props.notes}</div>
    </div>
  )
}

class Card extends React.Component {
  checkFav (id) {
    let favs = this.props.favs.map(fav => fav.conId)
    return favs.includes(id)
  }

  toggleStar (id) {
    if (this.checkFav(id)) {
      return favTrue
    } else return favFalse
  }

  toggleFav (id) {
    let favs = this.props.favs
    let next

    if (favs.length === 0) {
      this.props.favourite(id)
    } else if (this.checkFav(id)) {
      this.props.rmFav(id)
    } else this.props.favourite(id)

    if (this.props.activeFav && this.props.activeFav.id === id) {
      if (favs.length > 1) {
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

  checkGroup (id, group) {
    for (var i = 0; i < group.length; i++) {
      if (group.members.includes(id)) {
        return true
      }
    }
  }

  closeContactCard (type) {
    switch (type) {
      case 'Contact':
        return this.props.hideContact()
      case 'Favourite':
        return this.props.hideFav()
      case 'GroupMem':
        return this.props.hideGroupMem()
    }
  }

  idTypeCheck (type) {
    switch (type) {
      case 'Contact':
        return this.props.activeContact.id
      case 'Favourite':
        return this.props.activeFav.id
      case 'GroupMem':
        return this.props.activeGroupMem.id
    }
  }

  async showMap (address, index) {
    let location

    // If there is a postcode value and its over the absolute minimum of 6 long
    if (address.postcode && address.postcode.length >= 6) {
      let pc = address.postcode
      // If the postcode is typed with a space, assume it's valid for now
      if (pc.split(' ').length === 2) {
        location = `${pc.split(' ')[0]}+${pc.split(' ')[1]}`
        // Or if it got mulitple spaces and is invild
      } else if (pc.split(' ').length > 2) {
        return
      } else {
        location = `${pc.slice(0, pc.length - 3)}+${pc.slice(pc.length - 3, pc.length)}`
      }
    } else if (address.line1 || address.line2) {
      let l1, l2
      if (address.line1 && address.line2) {
        l1 = address.line1.split(' ')
        l2 = address.line2.split(' ')
        location = `${l1.join('+')}+${l2.join('+')}`
      } else if (address.line1) {
        l1 = address.line1.split(' ')
        location = l1.join('+')
      } else {
        l2 = address.line2.split(' ')
        location = l2.join('+')
      }
    }
    if (!address.postcode && location && address.city) {
      location = location.concat('+', address.city.split(' ').join('+'))
    }

    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyBrp5MVEPZWkfLcn-Lh_prB-yJvF8qZXgs`)
    const result = await response.json()

    let coords
    if (result.status === 'OK') {
      coords = result.results[0].geometry.location
    }

    let center
    if (coords) {
      center = `${coords.lat},${coords.lng}`
      return center
    } else return Promise.reject(result.status)
  }

  render () {
    const con = this.props.con
    const type = this.props.type
    const first = con.name[this.props.displayBy]
    const last = this.props.displayBy === 'first' ? con.name.last : con.name.first

    // Ternary operator, if there is an active contact, and if it's id is = to this card's id, then...

    const closeBtn = this.props.windowWidth === 'large' ? '' : (
      <img className='btn-close' src={back} onClick={() => this.closeContactCard(type)} />
    )

    const title = con.name.first || con.name.last ? (
      <div className='title'>
        {closeBtn}
        <div className='fullName'>{con.name.prefix} {first} {last}</div>
        <div className='company'>{con.name.company}</div>
      </div>
    ) : (
      <div className='title'>
        {closeBtn}
        <div className='fullName'>{con.name.company}</div>
      </div>
    )

    // const blur = this.props.windowWidth === 'large' ? '' : (
    //   <div className='blur' />
    // )

    let card = this.props.con.id ? (
      <div className='contactCard'>
        {title}
        <div className='details'>
          <Phone phone={con.phone} />
          <Email email={con.email} />
          <Address address={con.address} />
          <Dates dates={con.dates} />
          <Other other={con.other} />
          <Notes notes={con.notes} />
        </div>

        <div className='edits'>
          <img className='btn-edit' src={edit} onClick={() => this.props.editCon(con.id)} />
          <img className='btn-fav' src={this.toggleStar(con.id)} onClick={() => this.toggleFav(con.id)} />
        </div>
      </div>
    ) : (<div />)

    if (this.props.beingEdited === con.id) {
      card = (() => <Edit {...this.props} />)()
    }

    // 180px is largest size without copyright text on img
    con.address.forEach((addr, index) => {
      this.showMap(addr, index)
        .then(response => {
          if (response) {
            document.getElementById(`googleMaps${index}`).src =
            `https://maps.googleapis.com/maps/api/staticmap?center=${response}&zoom=15&size=180x180&maptype=roadmap&markers=tiny|${response}&${style}&key=AIzaSyBrp5MVEPZWkfLcn-Lh_prB-yJvF8qZXgs`
            // console.log(`Map ${index} added`)
          }
        })
        .catch(error => {
          // console.log(`Map ${index} Error! Could not locate address`)
          // console.error(error)
        })
    })

    return card
  }
}

const mapStateToProps = state => {
  return {
    contacts: state.contacts,
    favs: state.favs,
    groups: state.groups,
    activeFav: state.activeFavourite,
    activeGroupMem: state.activeGroupMember,
    beingEdited: state.beingEdited,
    displayBy: state.displayBy,
    windowWidth: state.windowWidth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideContact: () => dispatch(hideContact()),
    showContact: contact => dispatch(showContact(contact)),
    hideFav: () => dispatch(hideFav()),
    showFav: contact => dispatch(showFav(contact)),
    hideGroupMem: () => dispatch(hideGroupMem()),
    favourite: id => dispatch(addFavourite(id)),
    rmFav: id => dispatch(removeFavourite(id)),
    reduceGroups: id => dispatch(reduceGroups(id)),
    editCon: id => dispatch(editContact(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)
