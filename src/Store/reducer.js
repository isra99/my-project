import axios from 'axios'

//const [data, setData] = useState(null)
let data;
const fetch = async (x) => {
    const response = await axios.all(`https://finnhub.io/api/v1/search?q=${x}&token=c3ldsgaad3if71c77vtg`);
    data = response.data;
    return data;
}

const fetchData = (x) => {
    //alert(x);
    let data;
    axios.get(`https://finnhub.io/api/v1/search?q=${x}&token=c3ldsgaad3if71c77vtg`)
        .then((resp) => {
            console.warn(resp.data.result[0]);
            var i;
            for (i = 0; i < resp.data.count; i++) {
                data.push({
                'id': i, 
                'description': resp.data.result[i].description, 
                'displaySymbol': resp.data.result[i].displaySymbol,
                'symbol': resp.data.result[i].symbol,
                'type': resp.data.result[i].type
                });
            } 
        })
        return data;
    }

const intialState = {
    inputValue: "apple",
    //rows: fetch("apple")
}
const Reducer = async (state = intialState, action) => {
    const newState = {...state}
    newState.inputValue = action.type;
    var i;
    let mRow =[];
    var i;
    console.log('= = = = = Test Fetching = = = = =');
    const response = await axios.get(`https://finnhub.io/api/v1/search?q=${'apple'}&token=c3ldsgaad3if71c77vtg`);
    const x = response.data;
    console.log(x);
    
    console.log('= = = = = Test Data = = = = =');
    console.log(mRow);
    newState.rows = mRow;
    return newState;
}

export default Reducer;