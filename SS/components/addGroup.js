import React from 'react'
import { connect } from 'react-redux'
import { newGroup, addGroup, groupKeyIncrement } from '../../redux/actions'


class AddGroup extends React.Component {
  submit (form)  {
    const name = form.groupName.value

    const group = {
      name,
      id: this.props.groupKey,
      members: []
    }

    if (name) {
      this.props.addGroup(group)
      this.props.newGroup(false)
      this.props.groupKeyIncrement()
    }
  }

  render () {
    return (
      <div className='newGroup'>
        <div className='contactCard'>
          <div className='title'>
            <div className='fullName'>New Group</div>
          </div>

          <form name='newGrpForm'>
            <label className='heading'>Enter Group Name:</label>
            <input className='data' name='groupName' type='text' />
          </form>

          <div className='edits confirm'>
            <div className='done' onClick={() => this.submit(newGrpForm)}> DONE </div>
            <div className='cancel' onClick={() => this.props.newGroup(false)} > CANCEL </div>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    groups: state.groups,
    groupKey: state.groupKey
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addGroup: group => dispatch(addGroup(group)),
    newGroup: bool => dispatch(newGroup(bool)),
    groupKeyIncrement: () => dispatch(groupKeyIncrement())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGroup)
