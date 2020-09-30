export function split(opt1, opt2) {
	if (Math.random() > 0.5) {
		return opt1
	} else return opt2
}

export function occasionally(data, fallback) {
	if (Math.random() > 0.75) {
		return data
	} else return fallback
}