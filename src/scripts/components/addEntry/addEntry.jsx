import React from 'react'
import Button from '../button/button'
import add from '../../../media/icons/add.svg'

function AddEntry({addNewEntry}) {
	return <Button {...{type: 'icon', icon: add, classname: 'addEntry', onClickCallback: addNewEntry}} />

}

export default AddEntry
