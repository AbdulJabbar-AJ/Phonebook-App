import React, {useEffect, useState} from 'react'

export default function Notes ({data, editMode, onChangeCallback}) {
	const [notes, setNotes] = useState(data)

	useEffect(() => setNotes(data), [data])
	useEffect(() => onChangeCallback('notes', notes), [notes])

	function updateNotes(target) {
		// const target = event.target
		const value = target.value
		setNotes(value)
		resizeAndScroll(target)
	}

	function resizeAndScroll(target) {
		console.log('TODO, resize and scroll function')
		console.log(target.scrollHeight)


		// target.style.height = 0
		target.style.height = `${target.scrollHeight - 10}px`
		// It may be better to make this function a helper
	}

	return (
		<div className='cardSection notes'>
			<div className='heading'>Notes</div>
			{editMode
				? <textarea defaultValue={notes} onChange={(e) => updateNotes(e.target)} placeholder='Enter notes here...'/>
				: <div className='note'>{data}</div>
			}
		</div>
	)
}
