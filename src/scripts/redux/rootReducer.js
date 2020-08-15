import contacts, { Contact } from '../../../SS/initdata'

const initState = {
  contacts: [...contacts],
  sortBy: 'first',
  displayBy: 'first',
  favs: [{ conId: 3, pos: 0 }, { conId: 4, pos: 1 }],
  groups: [
    { name: 'Family', id: 1, members: [3, 6, 4] },
    { name: 'Friends', id: 2, members: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    { name: 'Familyyyy', id: 3, members: [3, 6, 4] }
  ],
  filteredContacts: [],
  activeContact: '',
  prevContact: '',
  activeFavourite: '',
  activeGroup: '',
  activeGroupMember: '',
  newContact: false,
  newGroup: false,
  beingEdited: false,
  editFavourites: false,
  editGroups: false,
  showContactsList: false,
  editGroupList: [],
  contactKey: 11, /*Have 10 contacts already*/
  groupKey: 4, /*Have 4 groups already*/
  windowWidth: '',
  contactsScroll: 0,
  err: ''
}

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SHOW_CONTACT':
      return {
        ...state,
        activeContact: action.contact
      }
    case 'HIDE_CONTACT':
      return {
        ...state,
        activeContact: action.contact
      }
    case 'LOG_PREV_CONTACT':
      return {
        ...state,
        prevContact: action.contact
      }

    case 'SHOW_FAV':
      return {
        ...state,
        activeFavourite: action.contact
      }
    case 'HIDE_FAV':
      return {
        ...state,
        activeFavourite: action.contact
      }

    case 'NEW_CONTACT':
      return {
        ...state,
        newContact: action.boolean
      }
    case 'CONTACT_KEY':
      return {
        ...state,
        contactKey: ++state.contactKey
      }
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [...state.contacts, action.contact]
      }
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(con => con.id !== action.id)
      }

    case 'SHOW_GROUP':
      return {
        ...state,
        activeGroup: action.group
      }
    case 'HIDE_GROUP':
      return {
        ...state,
        activeGroup: action.group
      }

    case 'SHOW_GROUP_MEMBER':
      return {
        ...state,
        activeGroupMember: action.contact
      }
    case 'HIDE_GROUP_MEMBER':
      return {
        ...state,
        activeGroupMember: action.contact
      }

    case 'ADD_FAVOURITE':
      return {
        ...state,
        favs: [...state.favs, { conId: action.id, pos: state.favs.length }]
      }
    case 'REMOVE_FAVOURITE':
      return {
        ...state,
        favs: state.favs.filter(con => con.conId !== action.id)
      }

    case 'EDIT_FAVOURITES':
      return {
        ...state,
        editFavourites: action.boolean
      }

    case 'NEW_GROUP':
      return {
        ...state,
        newGroup: action.boolean
      }
    case 'GROUP_KEY':
      return {
        ...state,
        groupKey: ++state.groupKey
      }
    case 'ADD_GROUP':
      return {
        ...state,
        groups: [...state.groups, action.group]
      }
    case 'SHOW_CONTACTS_LIST':
      return {
        ...state,
        showContactsList: action.groupId
      }

    case 'REMOVE_GROUP':
      return {
        ...state,
        groups: state.groups.filter(group => group.id !== action.id)
      }

    case 'GROUPS_LIST_PENDING':
      return {
        ...state,
        editGroupList: [...state.editGroupList, action.id]
      }

    case 'REMOVE_FROM_GROUP_LIST_PENDING':
      return {
        ...state,
        editGroupList: state.editGroupList.filter(id => id !== action.id)
      }
    case 'CLEAR_GROUP_LIST_PENDING':
      return {
        ...state,
        editGroupList: []
      }
    case 'ADD_TO_GROUP':
      return {
        ...state,
        groups: state.groups.map(group => {
          if (action.groupId === group.id) {
            group.members = group.members.filter(id => action.ids.includes(id))
            action.ids.forEach(id => {
              if (!group.members.includes(id)) {
                group.members.push(id)
              }
            })
          }
          return group
        }),
        editGroupList: []
      }
    case 'EDIT_GROUP':
      return {
        ...state,
        editGroups: action.boolean
      }
    case 'REDUCE_GROUPS':
      return {
        ...state,
        groups: state.groups.map(group => {
          return {
            name: group.name,
            id: group.id,
            members: group.members.filter(mem => mem !== action.id)
          }
        })
      }
    case 'FILTER_SEARCH':
      return {
        ...state,
        filteredContacts: state.contacts.filter(con => {
          return action.terms.every(term => {
            return Object.values(con.name).some(val => {
              return val.toLowerCase().includes(term.toLowerCase())
            })
          })
        })
        // filteredContacts: state.contacts.filter(con =>
        //   con.name.first.toLowerCase().includes(action.value.toLowerCase()) ||
        //   con.name.last.toLowerCase().includes(action.value.toLowerCase()) ||
        //   `${con.name.first} ${con.name.last}`.toLowerCase().includes(action.value.toLowerCase()) || `${con.name.last} ${con.name.first}`.toLowerCase().includes(action.value.toLowerCase())
        // )
      }
    case 'TOGGLE_SORT':
      return {
        ...state,
        sortBy: action.sortBy
      }
    case 'TOGGLE_DISPLAY':
      return {
        ...state,
        displayBy: action.displayBy
      }
    case 'EDIT_CONTACT':
      return {
        ...state,
        beingEdited: action.id
      }
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(con => {
          if (con.id === action.id) {
            return action.contact
          } else return con
        })
      }
    case 'ADD_CONTACT_ENTRY':
      return {
        ...state,
        // USE FIND ARRAY METHOD INSTEAD
        contacts: state.contacts.map(con => {
          if (con.id === action.id) {
            let contact = con
            contact[action.section].push(action.value)
            console.log(contact)
            return contact
          } else return con
        })
      }
    case 'WINDOW_INIT':
      return {
        ...state,
        windowWidth: action.width
      }
    case 'WINDOW_RESIZE':
      return {
        ...state,
        windowWidth: action.width,
        activeContact: action.width === 'small' ? (
          state.activeContact ? state.activeContact : ''
        ) : (
          state.activeContact ? state.activeContact : state.contacts[0]
        ),

        activeFavourite: action.width === 'small' ? (
          state.activeFavourite ? state.activeFavourite : ''
        ) : (
          state.activeFavourite ? state.activeFavourite : state.contacts[state.contacts.findIndex(con => con.id === state.favs[0].conId)]
        ),

        activeGroupMember:
        action.width === 'small'
          ? (state.activeGroupMember ? state.activeGroupMember : '')
          : (
            state.activeGroupMember
              ? state.activeGroupMember
              : (
                state.activeGroup
                  ? (
                    state.contacts.find(con => con.id === state.groups[state.groups.findIndex(group => group.id === state.activeGroup)].members[0])
                  )
                  : ''
              )
          )
      }

    case 'CONTACTS_SCROLL':
      return {
        ...state,
        contactsScroll: action.distTop
      }

    case 'ERROR':
      return {
        ...state,
        err: action.error
      }

    default:
      return state
  }
}

export default rootReducer
