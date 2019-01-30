const initialState = {
    list: JSON.parse(localStorage.getItem('citiesList')) || [],
    temperature: -40
};

export default function userstate(state = initialState, action) {
    switch (action.type) {
        case 'ADD':
            let addedList = [...state.list];
            addedList.push(action.payload);
            localStorage.setItem('citiesList', JSON.stringify(addedList));
            return {...state, list: addedList};
        case 'REMOVE':
            let removedList = [...state.list];
            const removed = action.payload;
            removedList = removedList.filter(item => item.zip !== removed.zip);
            localStorage.setItem('citiesList', JSON.stringify(removedList));
            return {...state, list: removedList};
        case 'SET_TEMP':
            return {...state, temperature: action.payload};
        case 'UPDATE_TEMP':
            let list = [...state.list];
            let tempArray = action.payload;
            let updatedList = list.map((item, i) => {
                item.weather = tempArray[i];
                return item;
            });
            localStorage.setItem('citiesList', JSON.stringify(updatedList));
            return {...state, list: updatedList};
        default:
            return state;
    }
}