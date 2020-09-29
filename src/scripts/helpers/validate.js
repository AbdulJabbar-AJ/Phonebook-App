// TODO - Validate anything that needs to be validated
const name = name => {
	const { first, last, company } = name
	return Boolean(first || last || company)
}


const phone = event => {
	const permissibleKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', ' ', '(', ')']
	const {key} = event
	!permissibleKeys.includes(key) ? event.preventDefault() : null
}



const email = () => {
	console.log('Email needs to be validated')
}

// Maybe use a third party address generator plugin
const address = {
	line1: 1,
	line2: 1,
	city: 1,
	county: 1,
	postcode: 1,
	country: 1,
}


export default {
	name, phone, email, address
}