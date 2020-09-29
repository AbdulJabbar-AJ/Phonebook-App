import React, {useEffect, useRef, useState} from 'react'

export default function Notes ({data, editMode, onChangeCallback}) {
	const [notes, setNotes] = useState(data)
	const textArea = useRef(null)

	useEffect(() => setNotes(data), [data])
	useEffect(() => onChangeCallback('notes', notes), [notes])
	useEffect(resizeTextarea, [editMode])

	function updateNotes(event) {
		const value = event.target.value
		setNotes(value)
		resizeTextarea()
		scrollOnChange()
	}

	function resizeTextarea() {
		if (editMode) {
			const target = textArea.current
			target.style.height = 0
			target.style.height = `${target.scrollHeight + 10}px`
		}
	}

	function scrollOnChange() {
		const card = textArea.current.parentElement.parentElement.parentElement
		card.scroll({top: card.scrollHeight})
	}

	return (
		<div className='cardSection notes'>
			<div className='heading'>Notes</div>
			{editMode
				? <textarea ref={textArea} value={notes} onChange={updateNotes} placeholder='Enter notes here...'/>
				: <div className='note'>{data}</div>
			}
		</div>
	)
}
