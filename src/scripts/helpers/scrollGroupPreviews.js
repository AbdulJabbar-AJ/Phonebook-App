const scrollGroupPreview = (groupPreview, groupPreviewWidth, groupNameWidth) => {
	if (groupPreviewWidth > groupNameWidth) {
		const pixels = groupPreviewWidth - groupNameWidth
		const speed = 20 // px/s
		const frameTime = 1000/speed
		const pauseDuration = 1000
		const lap = frameTime * pixels
		let position = 0
		let leftDirection = false

		const scroll = () => {
			leftDirection ? ++position : --position
			groupPreview.scrollLeft = position
		}

		const oneLap = () => {
			setTimeout(() => {
				leftDirection = !leftDirection
				const interval = setInterval(scroll, frameTime)
				setTimeout(() => clearInterval(interval), lap)
			}, pauseDuration)
		}

		oneLap()
		const startInterval = setInterval(oneLap, lap + pauseDuration)
	}
}

export default scrollGroupPreview