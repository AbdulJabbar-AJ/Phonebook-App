export const shallowCloneObject = obj => ({...obj})
export const shallowCloneArray = arr => [...arr]

export function deepClonePrimitive(value) {
	if (value === null) {
		return null
	} else {
		switch (typeof value) {
			case 'number':
				return Number(value)
			case 'string':
				return String(value)
			case 'boolean':
				return Boolean(value)
			case 'undefined':
				return undefined
			default:
				break
		}
	}
}


export function deepCloneArray(arr){
	const clonedArray = []

	arr.forEach((item, index) => {
		if (typeof item !== 'object' || item === null) {
			clonedArray[index] = deepClonePrimitive(item)
		} else if (typeof item === 'object') {
			clonedArray[index] = Array.isArray(item) ? deepCloneArray(item) : deepCloneObject(item)
		} else {
			console.log('Deep Clone FAILED')
			return console.log('EXCEPTION HERE!!!', typeof index, index)
		}
	})
	return clonedArray
}

export function deepCloneObject(obj){
	const clonedObject = {}
	const keys = Object.keys(obj)

	keys.forEach(key => {
		if (typeof obj[key] !== 'object' || obj[key] === null) {
			clonedObject[key] = deepClonePrimitive(obj[key])
		} else if (typeof obj[key] === 'object') {
			clonedObject[key] = Array.isArray(obj[key]) ? deepCloneArray(obj[key]) : deepCloneObject(obj[key])
		} else {
			console.log('Deep Clone FAILED')
			return console.log('EXCEPTION!!!', typeof obj[key], obj[key])
		}
	})
	return clonedObject
}

