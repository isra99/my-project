

const intialState = {
    rows: [],
    info: [],
    price: []
}
const Reducer = (state = intialState, action) => {
    const newState = {...state};
    if(action.type === 'DECREMENT'){
        newState.info = action.data;
    } else if(action.type === 'INC'){
        newState.price = action.data;
    } else{
        newState.rows = action.data;
    }
    console.log(newState);
    return newState;
}
export default Reducer;