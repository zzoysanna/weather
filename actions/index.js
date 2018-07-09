export function addItem(item) {
	return {
		type: 'ADD',
		payload: item
	}
}
export function removeItem(item) {
	return {
		type: 'REMOVE',
		payload: item
	}
}
export function setTemperature(temp) {
	return {
		type: 'SET_TEMP',
		payload: temp
	}
}