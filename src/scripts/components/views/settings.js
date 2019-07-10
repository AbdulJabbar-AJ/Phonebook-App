import React from 'react'
import { connect } from 'react-redux'
import { toggleSort, toggleDisplay } from '../../redux/actions'
import toggle from '../../../media/img/toggle.svg'
import toggleLeft from '../../../media/img/icons/toggleLeft.svg'
import toggleRight from '../../../media/img/icons/toggleRight.svg'

class Content extends React.Component {
  toggle () {
    console.log(event.target.id)
    switch (event.target.id) {
      case 'sortByToggle':
      {
        document.getElementById('sortByToggle').classList.toggle('slideToggle')
        if (this.props.sortBy !== 'first') {
          return this.props.toggleSrt('first')
        } else return this.props.toggleSrt('last')
      }
      case 'displayByToggle':
      {
        document.getElementById('displayByToggle').classList.toggle('slideToggle')
        if (this.props.displayBy !== 'first') {
          return this.props.toggleDsply('first')
        } else return this.props.toggleDsply('last')
      }
    }
  }

  render () {
    const sortToggle = this.props.sortBy === 'first' ? toggleLeft : toggleRight
    const displayToggle = this.props.displayBy === 'first' ? toggleLeft : toggleRight
    return (
      <div className='settingsView'>

        <div className='settingDiv'>
          <span className='setting'><strong>Sort By</strong></span>
          <div className='options'>
            <span className='option-left'>First Name</span>
            <span className='toggle'>
              <img id='sortByToggle' src={sortToggle} onClick={() => this.toggle()} />
            </span>
            <span className='option-right'>Last Name</span>
          </div>
        </div>

        <div className='settingDiv'>
          <span className='setting'><strong>Display By</strong></span>
          <div className='options'>
            <span className='option-left'>First Name</span>
            <span className='toggle'>
              <img id='displayByToggle' src={displayToggle} onClick={() => this.toggle()} />
            </span>
            <span className='option-right'>Last Name</span>
          </div>
        </div>

      </div>

    )
  }
}

// Change dailing code to value={nameOfReduxStoreState}

const mapStateToProps = state => ({
  sortBy: state.sortBy,
  displayBy: state.displayBy
})

const mapDispatchToProps = dispatch => {
  return {
    toggleSrt: (sortBy) => dispatch(toggleSort(sortBy)),
    toggleDsply: (displayBy) => dispatch(toggleDisplay(displayBy))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)
