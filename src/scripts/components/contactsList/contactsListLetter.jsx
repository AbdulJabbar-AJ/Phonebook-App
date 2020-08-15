import React from 'react'

export default function ContactsListLetter({ contacts, contactsScroll, contactsScrollTop, letter }) {
	// COMPONENTDIDMOUNT
    // if (contacts.length) {
    //   const header = document.querySelector('.heading')
    //   const heading = document.querySelector('.heading h1')
    //   const section = document.querySelector('.contactsPanel')
    //   const contactList = document.querySelector('.contactList')
    //   const letters = Array.from(contactList.querySelectorAll('.letter'))
	//
    //   section.scrollTo(0, contactsScroll)
	//
    //   section.addEventListener('scroll', () => {
    //     const top = section.scrollTop
	//
    //     if (top === 0) {
    //       heading.removeAttribute('style')
    //       contactList.removeAttribute('style')
    //     } else if (top <= 100) {
    //       heading.style.fontSize = `${32 - (top / 10)}px`
    //     } else {
    //       heading.style.fontSize = '22px'
    //     }
	//
    //     letters.forEach(letter => {
    //       letter.style.top = `${header.offsetHeight}px`
    //     })
	//
    //     contactsScrollTop(top)
    //   })
    // }

	return <div className='letter'>{letter}</div>
}

