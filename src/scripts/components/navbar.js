import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import Favourites from './views/favourites'
import Contacts from './views/contacts'
import Groups from './views/groups'
import Settings from './views/settings'
import Tippy from '@tippy.js/react'

// Nav Item Component
const NavItem = ({ name, icon }) => {
  return (
    <div className={`navItem ${name}`}>
      <div className='navIcon'><ion-icon name={`ios-${icon}`} /></div>
      <div className='navHeading'><li>{name}</li></div>
    </div>
  )
}

// Nav Items
const favourites = { name: 'favourites', icon: 'star-outline' }
const contacts = { name: 'contacts', icon: 'person' }
const groups = { name: 'groups', icon: 'people' }

// Navbar & Router
const View = () => {
  return (
    <Router>
      <div className='page'>

        <div className='navbar'>
          <NavLink to='/favourites'><NavItem {...favourites} /></NavLink>
          <NavLink exact to='/'><NavItem {...contacts} /></NavLink>
          <NavLink to='/groups'><NavItem {...groups} /></NavLink>
          <a>
            <Tippy content={<Settings />} arrow arrowType='round' animation='fade' interactive trigger='click' >
              <div className='navItem settings'>
                <div className='navIcon'><ion-icon name='ios-switch' /></div>
                <div className='navHeading'><li>settings</li></div>
              </div>
            </Tippy>
          </a>
        </div>

        <div className='content'>
          <Route path='/favourites' component={Favourites} />
          <Route exact path='/' component={Contacts} />
          <Route path='/groups' component={Groups} />
        </div>

      </div>
    </Router>
  )
}

export default View
