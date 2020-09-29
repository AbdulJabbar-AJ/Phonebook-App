export const key = 'AIzaSyCatccl4KbAW_OaNDWc7h9PIMqmrBdgFQU'

export async function findAddress(addressQuery) {
	const coords = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressQuery}&key=${key}`)
	return coords.json()
}

// TODO - NAP - Have seperate key for testing and live websites
// Map ID is used to determine map style from Google Cloud Platform API dashboard

export async function getImage(coords) {
	const center = `${coords.lat}, ${coords.lng}`
	const image = await fetch(`https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=13&size=150x150&maptype=roadmap&markers=tiny|${center}&map_id=87f605a0e97d4bd&key=${key}`)
	return image.url
}
