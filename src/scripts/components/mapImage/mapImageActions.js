export function memoiseMapImage(addressQuery, url) {
	return {
		type: 'MEMOISE_MAP',
		addressQuery,
		url
	}
}
