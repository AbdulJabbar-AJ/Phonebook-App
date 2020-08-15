import React from 'react'
import { connect } from 'react-redux'
import { hideGroup, showGroupMem, hideGroupMem } from '../../redux/actions'
import Card from './contactCard'
import Contact from './contact'
import back from '../../../media/img/icons/back.svg'

class GroupList extends React.Component {
  render () {
    const group = this.props.group
    const groupList = group.members.length ? (
      <div className='groupList'>
        {group.members.map(mem => {
          let contact = this.props.contacts.find(con => con.id === mem)
          return <Contact key={mem} con={contact} type='GroupMem' />
        })}
      </div>
    ) : (
      <div className='empty'>No Group Members</div>
    )

    return groupList
  }
}

class Group extends React.Component {
  componentDidMount () {
    setTimeout(() => {
      if (!this.props.activeGroupMem && window.innerWidth >= 560) {
        this.props.showGroupMem(this.props.contacts.find(con => con.id === this.props.groups[this.props.groups.findIndex(group => group.id === this.props.activeGroup)].members[0]))
      }
    }, 500)
  }

  animateGroup (group) {
    // const grp = document.querySelector('.group')
    // const groupsList = document.querySelector('.groupsList')
    //
    // grp.classList.remove('slideInRight')
    // grp.classList.add('slideOutRight')
    //
    // groupsList.classList.remove('slideOutLeft')
    // groupsList.classList.add('slideInLeft')

    this.props.hideGroupMem()
    this.props.hideGroup()
  }


  render () {
    const group = this.props.groups.find(group => group.id === Number(this.props.activeGroup))

    return (
      <div className='view group'>

        <div className='contactsPanel'>
          <div className='title'>
            <img className='btn-close' src={back} onClick={() => this.animateGroup(group)} />
            <h1 className='groupName'>{group.name}</h1>
          </div>
          <GroupList {...this.props} group={group} />
        </div>

        <div>
          {this.props.activeGroupMem ? <Card con={this.props.activeGroupMem} type='GroupMem' /> : ''}
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    groups: state.groups,
    contacts: state.contacts,
    activeGroup: state.activeGroup,
    activeGroupMem: state.activeGroupMember
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showGroupMem: contact => dispatch(showGroupMem(contact)),
    hideGroup: () => dispatch(hideGroup()),
    hideGroupMem: () => dispatch(hideGroupMem()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Group)
