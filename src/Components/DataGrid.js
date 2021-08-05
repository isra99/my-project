import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { connect } from 'react-redux';
import axios from 'axios';
import Loader from './Loader'
import Main from '../Main';

let isFetching = false;
let isEmpty = true; const columns = [
  { field: 'id', headerName: 'ID', width: 120 },
  {
    field: 'description',
    headerName: 'Description',
    width: 300,
    editable: false,
  },
  {
    field: 'displaySymbol',
    headerName: 'Display Symbol',
    width: 300,
    editable: false,
  },
  {
    field: 'symbol',
    headerName: 'Symbol',
    width: 300,
    editable: false,
  },
  {
    field: 'type',
    headerName: 'Type',
    sortable: false,
    width: 300,
  },
];

class DataTable extends React.Component {
    render(){
        return (
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={!!this.props.rows?this.props.rows:[]}
                columns={columns}
                pageSize={10}
                onRowClick={(event) => {
                  isEmpty = false;
                  axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${event.row.symbol}&token=c3ldsgaad3if71c77vtg`)
                  .then((response) => {
                    this.props.dispatch({
                      type: "DECREMENT",
                      data: response.data
                    });
                  })
                  axios.get(`https://finnhub.io/api/v1/quote?symbol=${event.row.symbol}&token=c3ldsgaad3if71c77vtg`)
                      .then((response) => {
                        this.props.dispatch({
                          type: "INC",
                          data: response.data
                        });
                      })
                }}
              />
              {isEmpty
                ? <h2></h2>
                : (isFetching
                  ? 
                  <Loader loading={isFetching}/>
                  : <Main 
                      info={this.props.info}
                      price={this.props.price}
                      />)
              }
            </div>
          );
    }
}


const mapStatetoProps = (state) => {
  console.log(state);
  return {
      info: state.info,
      price: state.price
  }
}
export default connect (mapStatetoProps)(DataTable);