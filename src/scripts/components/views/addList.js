import React from 'react'
import { connect } from 'react-redux'
import { filterSearch, showConsList, groupListPending, removeFromGroupListPending, clearGroupListPending, addToGroup } from '../../redux/actions'
import Contact from './contact'
import Off from '../../../media/img/icons/radioFalse.svg'
import On from '../../../media/img/icons/settingOn.svg'

class AddList extends React.Component {
  done (groupId, ids) {
    this.props.addToGroup(groupId, ids)
    this.props.showConsList(false)
  }

  close () {
    this.props.showConsList(false)
    this.props.clrGrpLstPending()
  }

  radio (id) {
    if (this.props.editGrpList.includes(id)) {
      return On
    } else return Off
  }

  toggleList (id) {
    if (this.props.editGrpList.includes(id)) {
      this.props.rmFrGrpLstPending(id)
    } else {
      this.props.grpLstPending(id)
    }
  }

  render () {
    console.log(this.props)
    const contacts = this.props.contacts
    const consList = this.props.consList
    const editGrpList = this.props.editGrpList

    const addList = contacts.length ? (
      <div className='contactsList'>
        <div className='head'>
          <h3>{this.props.thisGroup.name}</h3>
          <button type='button' onClick={() => this.done(consList, editGrpList)}>DONE</button>
          <p>Choose Group Members</p>
          <button type='button' onClick={() => this.close()}>CANCEL</button>
        </div>

        <div className='list'>
          {contacts.map(con => {
            return (
              <div className='addListCon' key={con.id} onClick={() => this.toggleList(con.id)}>
                <div className='consListRadio' >
                  <img src={this.radio(con.id)} />
                </div>
                <Contact con={con} />
              </div>
            )
          })}
        </div>
      </div>
    ) : <div>No Contacts</div>

    return (
      <div className='addList'>
        {addList}
      </div>
    )
  }
}


const mapStateToProps = state => ({
  contacts: state.contacts,
  groups: state.groups,
  sortBy: state.sortBy,
  filteredContacts: state.filteredContacts,
  consList: state.showContactsList,
  editGrpList: state.editGroupList
})

const mapDispatchToProps = dispatch => {
  return {
    filterSearch: value => dispatch(filterSearch(value)),
    showConsList: value => dispatch(showConsList(value)),
    grpLstPending: id => dispatch(groupListPending(id)),
    rmFrGrpLstPending: id => dispatch(removeFromGroupListPending(id)),
    clrGrpLstPending: () => dispatch(clearGroupListPending()),
    addToGroup: (groupId, ids) => dispatch(addToGroup(groupId, ids))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddList)
