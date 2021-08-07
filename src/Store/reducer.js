

const intialState = {
    rows: [],
    info: [],
    price: [],
    hide: true
}
const Reducer = (state = intialState, action) => {
    const newState = {...state};
    if(action.type === 'SETINFO'){
        newState.info = action.data;
    } else if(action.type === 'SETPRICE'){
        newState.price = action.data;
    } else if(action.type === 'SETHIDE'){
        newState.hide = action.data;
    }else if(action.type === 'SEARCH'){
        newState.rows = action.data;
    }
    console.log(newState);
    return newState;
}
export default Reducer;