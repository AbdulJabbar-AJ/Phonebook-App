import React from 'react'
// import { connect } from 'react-redux'
// import { showGroup, newGroup, removeGroup, editGroups, showConsList, groupListPending } from '../redux/actions'
// import Group from './group'
// import Card from './contactCard'
// import AddGroup from './addGroup'
// import AddList from './addList'
// import remove from '../../media/img/icons/remove.svg'
// import add from '../../media/img/icons/add.svg'
// import Off from '../../media/img/icons/radioFalse.svg'
// import On from '../../media/img/icons/settingOn.svg'
//
//
// class GroupSummary extends React.Component {
//   generateGroup (group) {
//     const contacts = this.props.contacts
//     let groupList = []
//
//     group.members.forEach(mem => {
//       groupList.push(contacts.find(con => con.id === mem))
//     })
//     return groupList
//   }
//
//   groupSize (group) {
//     const len = group.members.length
//     switch (len) {
//       case 0:
//         return 'No Contacts'
//       case 1:
//         return '1 Contact'
//       default:
//         return `${len} Contacts`
//     }
//   }
//
//   animateGroup (group) {
//     if (!this.props.editGrps) {
//       this.props.showGroup(group.id)
//       setTimeout(() => {
//         const grp = document.querySelector('.group')
//         grp.classList.add('animate')
//         setTimeout(() => {
//           grp.classList.remove('animate')
//         }, 500)
//       }, 0)
//     }
//   }
//
//   deleteList (id) {
//     if (this.props.grpsToDel.includes(id)) {
//       this.props.rmFrGrpPending(id)
//     } else this.props.rmGrpPending(id)
//     console.log(this.props.grpsToDel)
//   }
//
//   radio (id) {
//     if (this.props.grpsToDel.includes(id)) {
//       return On
//     } else return Off
//   }
//
//   addMembers (group) {
//     this.props.showConsList(group.id)
//     group.members.forEach(mem => {
//       this.props.grpLstPending(mem)
//     })
//   }
//
//   render () {
//     const group = this.props.thisGroup
//     let addMembers, deleteGroups, groupName
//
//     if (this.props.editGrps) {
//       addMembers = <button type='button' onClick={() => this.addMembers(group)}>Edit Members</button>
//
//       deleteGroups =
//         <div className='removeEntry'>
//           <img onClick={() => this.props.removeGroup(group.id)} src={remove} />
//         </div>
//
//       groupName = <input type='text' className='groupName edit' defaultValue={group.name} />
//     } else {
//       addMembers = ''
//       deleteGroups = ''
//       groupName = <div className='groupName'>{group.name}</div>
//     }
//
//     return (
//       <div>
//         <div className='groupSummary' onClick={() => this.animateGroup(group)}>
//           {deleteGroups}
//           {groupName}
//           <div className='groupSize'>{this.groupSize(group)}</div>
//           <div className='groupPreview'>
//             {addMembers}
//             {this.generateGroup(group).map(member => {
//               const name = member.name.first ? member.name.first : member.name.last
//               const company = member.name.first || member.name.last ? '' : member.name.company
//               return (
//                 <span key={member.id}>{name}{company}</span>
//               )
//             })}
//           </div>
//         </div>
//       </div>
//     )
//   }
// }
//
//
//
//
//
// class GroupsList extends React.Component {
//   render () {
//     const groups = this.props.groups
//     const group = groups.find(grp => grp.id === this.props.consList)
//     const consList = this.props.consList ? <AddList thisGroup={group} /> : ''
//     const edit = this.props.editGrps ? ' edit' : ''
//     const blur = this.props.blur ? ' blur' : ''
//
//     const groupsList = groups.length ? (
//       <div className={`groupsList${edit}${blur}`}>
//         {groups.map(group => {
//           return (
//             <div key={group.id}>
//               <GroupSummary {...this.props} thisGroup={group} />
//             </div>
//           )
//         })}
//         {consList}
//       </div>
//     ) : (
//       <div className='empty'>No Groups</div>
//     )
//
//     return groupsList
//   }
// }
//
//
//
//
//
//
//
//
//
//
//
// class Add extends React.Component {
//   render () {
//     return (
//       <div className='add' onClick={() => this.props.newGroup(true)}>
//         <img src={add} />
//       </div>
//     )
//   }
// }
//
//
//
//
//
//
//
//
//
//
//
// class GroupsView extends React.Component {
//   render () {
//     const group = this.props.group
//     const edit = !this.props.editGrps ? (
//       <button className='btn-editBtn' type='button' onClick={() => this.props.editGroups(true)}>EDIT</button>
//     ) : (
//       <button className='btn-editBtn' type='button' onClick={() => this.props.editGroups(false)}>DONE</button>
//     )
//
//     const add = this.props.editGrps ? (
//       <Add {...this.props} />
//     ) : ''
//
//     let newGroup = ''
//     let blur = ''
//     let cover = ''
//
//     if (this.props.newGrp) {
//       newGroup = <AddGroup />
//       cover = <div className='cover' />
//       blur = true
//     }
//
//     const activeGroup = group && !this.props.editGrps ? <Group /> : ''
//
//     return (
//       <div className='view groups'>
//         <div className='heading'>
//           <h1>Groups</h1>
//           {add}
//         </div>
//         <GroupsList {...this.props} blur={blur} />
//         {newGroup}
//         {cover}
//         {edit}
//         {activeGroup}
//       </div>
//     )
//   }
// }
//
//
//
// const mapStateToProps = state => ({
//   contacts: state.contacts,
//   groups: state.groups,
//   group: state.activeGroup,
//   activeGroupMem: state.activeGroupMember,
//   editGrps: state.editGroups,
//   newGrp: state.newGroup,
//   grpsToDel: state.groupsToDelete,
//   consList: state.showContactsList,
//   editGrpList: state.editGroupList
// })
//
// const mapDispatchToProps = dispatch => {
//   return {
//     showGroup: group => dispatch(showGroup(group)),
//     removeGroup: id => dispatch(removeGroup(id)),
//     editGroups: bool => dispatch(editGroups(bool)),
//     newGroup: bool => dispatch(newGroup(bool)),
//     showConsList: groupId => dispatch(showConsList(groupId)),
//     grpLstPending: id => dispatch(groupListPending(id))
//   }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(GroupsView)

export default function () { return ( <div>GROUPS</div>) }


// TODO
// Make small groups list below the groups on groups view, automatically scroll side to side if not wide enough to fit all names,
// Pro tip, if it is wide enough to fit, and the function has been implemented in a certain way, it will not do anything, so no need to make additional edge check for that
// Also, if implemented like that, it wil react to dynamic width changes without additional check?? I think