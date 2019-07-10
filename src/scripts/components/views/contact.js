import React from 'react'
import { connect } from 'react-redux'
import { showContact, showFav, showGroupMem } from '../../redux/actions'

class Contact extends React.Component {
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

  render () {
    const con = this.props.con
    const first = con.name[this.props.displayBy]
    const last = this.props.displayBy === 'first' ? con.name.last : con.name.first
    const company = con.name.first || con.name.last ? '' : con.name.company
    const active = () => {
      if (con.id === this.props.active.id) {
        return ' active'
      } else return ''
    }
    const activeFav = () => {
      if (this.props.activeFav && con.id === this.props.activeFav.id) {
        return ' activeFav'
      } else return ''
    }
    const activeMem = () => {
      if (this.props.activeMem && con.id === this.props.activeMem.id) {
        return ' activeMem'
      } else return ''
    }

    return (
      <div className={`contact${active()}${activeFav()}${activeMem()}`} onClick={() => this.checkType(con, this.props.type)} >
        <li className='name'>{first} {last} {company}</li>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  displayBy: state.displayBy,
  active: state.activeContact,
  activeFav: state.activeFavourite,
  activeMem: state.activeGroupMember
})

const mapDispatchToProps = dispatch => {
  return {
    showContact: contact => dispatch(showContact(contact)),
    showFav: contact => dispatch(showFav(contact)),
    showGroupMem: contact => dispatch(showGroupMem(contact))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact)
