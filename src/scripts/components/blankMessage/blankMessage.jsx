import React from 'react'

const BlankMessage = ({message}) => {
	const style = { padding: '10px'	}
	return <div className="blankMessage" {...{style}}>{message}</div>
}

export default BlankMessage