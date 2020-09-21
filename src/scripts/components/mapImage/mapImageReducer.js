const initState = {
	maps: {}
}

export default function mapImagesReducer(state = initState, action) {
	switch (action.type) {
		case 'MEMOISE_MAP':
			return { ...state, maps: { ...state.maps, [action.addressQuery]: action.url } }
		default:
			return state
	}
}
