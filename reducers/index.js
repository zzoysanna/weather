const initialState = {
  list: [
  	{ name: "Москва", zip: 101000 },
    { name: "Бобруйск", zip: 213800 }
  ],
  temperature: 0
};

export default function userstate(state = initialState, action) {
  switch (action.type) {
  	case 'ADD':
  		let addedList = [...state.list];
  		const added = action.payload;
  		let isDuplicate = false;
  		addedList.forEach((item) => {
  			isDuplicate = (item.zip === added.zip)
  		});
  		if (isDuplicate) {
  			return state;
  		}
  		addedList.push(action.payload);
  		return { ...state, list: addedList }
  	case 'REMOVE':
  		let removedList = [...state.list];
  		const removed = action.payload;
  		removedList = removedList.filter(item => item.zip !== removed.zip);
  		return { ...state, list: removedList }
  	case 'SET_TEMP':
  		return { ...state, temperature: action.payload }
  	default:
  		return state;
  }
}