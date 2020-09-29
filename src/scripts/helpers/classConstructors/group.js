import { v4 as uuidv4 } from 'uuid'

export default class Group {
	constructor(name = '', members = []) {
		this.id = uuidv4()
		this.name = name
		this.members = members
	}
}
