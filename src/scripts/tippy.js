import React from 'react'
import tippy from 'tippy.js'
import Settings from '../../scripts/components/views/settings'


export default function tippyScript () {
  const fav = document.querySelector('img.btn-fav')
  tippy(fav, {
    content: 'Add/Remove   Favourite',
    arrow: true,
    arrowType: 'round', // or 'sharp' (default)
    animation: 'fade',
    interactive: true,
    trigger: 'mouseenter'
  })
}
