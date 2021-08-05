

const intialState = {
    rows: [],
    info: [],
    price: [],
    isFetching: false,
    isEmpty: true
}
const Reducer = (state = intialState, action) => {
    const newState = {...state};
    if(action.type === 'DECREMENT'){
        newState.info = action.data;
    } else if(action.type === 'INC'){
        newState.price = action.data;
    } else if(action.type === 'EMPTYOFF'){
        newState.rows = action.data;
    }else if(action.type === 'EMPTYOFF'){
        newState.rows = action.data;
    } else if(action.type === 'LOADON'){
        newState.rows = action.data;
    } else if(action.type === 'LOADOFF'){
        newState.rows = action.data;
    } else{
        newState.rows = action.data;
    }
    console.log(newState);
    return newState;
}
export default Reducer;