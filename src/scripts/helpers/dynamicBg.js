const root = document.getElementById('root')

function resizeBG() {
	if (window.innerWidth/window.innerHeight > 16/9) {
		root.style.backgroundRepeat = 'repeat-x'
		root.style.backgroundSize = 'contain'
	} else {
		root.removeAttribute('style')
	}
}

window.addEventListener('load', resizeBG)
window.addEventListener('resize', resizeBG)

