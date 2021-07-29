import axios from 'axios'

const fetchData = (x) => {
    alert(x);
    let data = [];
    axios.get(`https://finnhub.io/api/v1/search?q=${x}&token=c3ldsgaad3if71c77vtg`)
        .then((resp) => {
            console.warn(resp.data.result[0])
            for (var i = 0; i < resp.data.count; i++) {
                data.push({
                'id': i, 
                'description': resp.data.result[i].description, 
                'displaySymbol': resp.data.result[i].displaySymbol,
                'symbol': resp.data.result[i].symbol,
                'type': resp.data.result[i].type
                });
            } 
        })
        console.warn(data);
        return data;
    }

const intialState = {
    inputValue: "apple",
    rows: fetchData("apple")
}
const reducer = (state = intialState, action) => {
    const newState = {...state}
    newState.inputValue = action.type;
    newState.rows = fetchData(action.type);
}

export default reducer;