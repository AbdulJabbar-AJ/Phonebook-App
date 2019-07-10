
// Action Creators
// Show and Hide contact
export function showContact (contact) {
  return {
    type: 'SHOW_CONTACT',
    contact
  }
}
export function hideContact () {
  return {
    type: 'HIDE_CONTACT',
    contact: ''
  }
}
export function logPrevContact (contact) {
  return {
    type: 'LOG_PREV_CONTACT',
    contact
  }
}

// Show and Hide favourite contact
export function showFav (contact) {
  return {
    type: 'SHOW_FAV',
    contact
  }
}
export function hideFav () {
  return {
    type: 'HIDE_FAV',
    contact: ''
  }
}

// Show and hide Group
export function showGroup (group) {
  return {
    type: 'SHOW_GROUP',
    group
  }
}
export function hideGroup () {
  return {
    type: 'HIDE_GROUP',
    group: ''
  }
}

// Show and hide group member
export function showGroupMem (contact) {
  return {
    type: 'SHOW_GROUP_MEMBER',
    contact
  }
}
export function hideGroupMem (contact) {
  return {
    type: 'HIDE_GROUP_MEMBER',
    contact: ''
  }
}

// New contact form, Add new contact Data, Delete contact
export function newContact (boolean) {
  return {
    type: 'NEW_CONTACT',
    boolean
  }
}
export function contactKeyIncrement () {
  return {
    type: 'CONTACT_KEY'
  }
}

export function addContact (contact) {
  return {
    type: 'ADD_CONTACT',
    contact
  }
}
export function deleteContact (id) {
  return {
    type: 'DELETE_CONTACT',
    id
  }
}


export function editContact (id) {
  return {
    type: 'EDIT_CONTACT',
    id
  }
}
export function updateContactData (contact, id) {
  return {
    type: 'UPDATE_CONTACT',
    contact,
    id
  }
}
export function addContactEntry (id, section, value) {
  return {
    type: 'ADD_CONTACT_ENTRY',
    id,
    section,
    value
  }
}


// Add and remove contact from Favourite
export function addFavourite (id) {
  return {
    type: 'ADD_FAVOURITE',
    id
  }
}
export function removeFavourite (id) {
  return {
    type: 'REMOVE_FAVOURITE',
    id
  }
}
export function editFavourites (boolean) {
  return {
    type: 'EDIT_FAVOURITES',
    boolean
  }
}


// Add and remove group or a contact from a Group
export function newGroup (boolean) {
  return {
    type: 'NEW_GROUP',
    boolean
  }
}
export function groupKeyIncrement () {
  return {
    type: 'GROUP_KEY'
  }
}
export function addGroup (group) {
  return {
    type: 'ADD_GROUP',
    group
  }
}
export function editGroups (boolean) {
  return {
    type: 'EDIT_GROUP',
    boolean
  }
}

export function removeGroup (id) {
  return {
    type: 'REMOVE_GROUP',
    id
  }
}

export function showConsList (groupId) {
  return {
    type: 'SHOW_CONTACTS_LIST',
    groupId
  }
}

export function groupListPending (id) {
  return {
    type: 'GROUPS_LIST_PENDING',
    id
  }
}
export function removeFromGroupListPending (id) {
  return {
    type: 'REMOVE_FROM_GROUP_LIST_PENDING',
    id
  }
}
export function clearGroupListPending () {
  return {
    type: 'CLEAR_GROUP_LIST_PENDING'
  }
}
export function addToGroup (groupId, ids) {
  return {
    type: 'ADD_TO_GROUP',
    groupId,
    ids
  }
}
export function reduceGroups (id) {
  return {
    type: 'REDUCE_GROUPS',
    id
  }
}

// Search for contact
export function filterSearch (terms) {
  return {
    type: 'FILTER_SEARCH',
    terms
  }
}


// // Settings
// Sort contacts by (first/last)
export function toggleSort (sortBy) {
  return {
    type: 'TOGGLE_SORT',
    sortBy
  }
}

// Display contacts by (first/last)
export function toggleDisplay (displayBy) {
  return {
    type: 'TOGGLE_DISPLAY',
    displayBy
  }
}


export function windowInit (width) {
  return {
    type: 'WINDOW_INIT',
    width
  }
}
export function windowResize (width) {
  return {
    type: 'WINDOW_RESIZE',
    width
  }
}

export function contactsScrollTop (distTop) {
  return {
    type: 'CONTACTS_SCROLL',
    distTop
  }
}

export function nameError (error) {
  return {
    type: 'ERROR',
    error
  }
}
