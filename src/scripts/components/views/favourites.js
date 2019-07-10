import React from 'react'
import { connect } from 'react-redux'
import { removeFavourite, editFavourites, showFav } from '../../redux/actions'
import Contact from './contact'
import Card from './contactCard'
import remove from '../../../media/img/icons/remove.svg'


class EditFavs extends React.Component {
  removeFav () {
    let next

    if (this.props.favs.length === 1) {
      this.props.editFavourites(false)
    } else if (this.props.favs[0].conId === this.props.id) {
      next = this.props.favs[1].conId
    } else next = this.props.favs[0].conId

    if (this.props.windowWidth !== 'small') {
      this.props.showFav(this.props.contacts.find(con => con.id === next))
    }

    this.props.rmFav(this.props.id)
  }

  render () {
    const edits = this.props.editFavs ? (
      <div className='editFavs'>
        <div className='removeEntry' onClick={() => this.removeFav()}>
          <img src={remove} />
        </div>
      </div>
    ) : ''
    return edits
  }
}


class Favourites extends React.Component {
  render () {
    const favs = this.props.favs

    const favsList = favs.length ? (
      <div className='contactList'>
        {this.props.favs.map(fav => {
          let contact = this.props.contacts.find(con => con.id === fav.conId)
          return (
            <div key={fav.conId} className='favContact'>
              <EditFavs {...this.props} id={fav.conId} />
              <Contact con={contact} type='Favourite' />
            </div>
          )
        })}
      </div>
    ) : (
      <div className='empty'>No Favourites</div>
    )

    return favsList
  }
}

class FavouritesView extends React.Component {
  componentDidMount () {
    if (this.props.favs.length && !this.props.activeFav && window.innerWidth >= 560) {
      this.props.showFav(this.props.contacts.find(con => con.id === this.props.favs[0].conId))
    }

    const heading = document.querySelector('.heading h1')
    const section = document.querySelector('.contactsPanel')

    section.addEventListener('scroll', () => {
      const top = section.scrollTop

      if (top === 0) {
        heading.removeAttribute('style')
      } else if (top <= 100) {
        heading.style.fontSize = `${32 - (top / 10)}px`
      } else {
        heading.style.fontSize = '22px'
      }
    })
  }

  render () {
    const fav = this.props.activeFav

    let edit

    if (this.props.favs.length) {
      if (this.props.editFavs) {
        edit = <button className='btn-editBtn' type='button' onClick={() => this.props.editFavourites(false)}>DONE</button>
      } else edit = <button className='btn-editBtn' type='button' onClick={() => this.props.editFavourites(true)}>EDIT</button>
    } else edit = ''

    return (
      <div className='view favourites'>
        <div className='contactsPanel'>
          <div className='heading'>
            <h1>Favourites</h1>
          </div>
          <Favourites {...this.props} />
          {edit}
        </div>
        <div className='output'>
          {fav ? <Card con={fav} type='Favourite' /> : ''}
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  contacts: state.contacts,
  favs: state.favs,
  activeFav: state.activeFavourite,
  editFavs: state.editFavourites,
  windowWidth: state.windowWidth
})

const mapDispatchToProps = dispatch => {
  return {
    rmFav: (id) => dispatch(removeFavourite(id)),
    editFavourites: (bool) => dispatch(editFavourites(bool)),
    showFav: contact => dispatch(showFav(contact))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesView)
