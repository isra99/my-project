

const intialState = {
    inputValue: "apple",
    rows: []
}
const Reducer = async (state = intialState, action) => {
    const newState = {...state};
    newState.inputValue = action.type;
    newState.rows = action.data;
    console.log(newState.rows);
    return newState;
}
export default Reducer;