export function memoiseMapImage(addressQuery, url) {
	return {
		type: 'MEMOISE_MAP',
		addressQuery,
		url
	}
}

export function getCoords(response, addressQuery) {
	const { status, error_message, results } = response

	if (status === 'OK') {
		return results[0].geometry.location
	} else {
		throw new Error(`Could not find co-ordinates for address: ${addressQuery}. \nThe following error was returned:\n{\n	Status: ${status} ${error_message !== undefined ? `\n	Error message: ${error_message}` : '' }\n}`)
	}
}
