import React, {useEffect, useState} from 'react'

export default function Notes ({data, editMode, onChangeCallback}) {
	const [notes, setNotes] = useState(data)

	useEffect(() => setNotes(data), [data])
	useEffect(() => onChangeCallback('notes', notes), [notes])

	function updateNotes(event) {
		const target = event.target // Needed for resize
		const value = target.value
		setNotes(value)
		resizeAndScroll()
	}

	function resizeAndScroll() {
		console.log('TODO, resize and scroll function')
		// It may be better to make this function a helper
	}

	return (
		<div className='cardSection notes'>
			<div className='heading'>Notes</div>
			{editMode
				? <textarea defaultValue={notes} onChange={(e) => updateNotes(e)} placeholder='Enter notes here...'/>
				: <div className='note'>{data}</div>
			}
		</div>
	)
}
