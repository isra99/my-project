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
    field: 'ticker',
    headerName: 'Ticker',
    width: 300,
    editable: false,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 300,
    editable: false,
  },
  {
    field: 'market',
    headerName: 'Market',
    width: 300,
    editable: false,
  },
  {
    field: 'locale',
    headerName: 'Locale',
    sortable: false,
    width: 300,
  },
  {
    field: 'primary_exchange',
    headerName: 'Primary Exchange',
    sortable: false,
    width: 300,
  },
  {
    field: 'type',
    headerName: 'type',
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
                  console.log(event.row);
                  axios.get(`https://api.polygon.io/v1/meta/symbols/${event.row.ticker}/company?&apiKey=fLlAuMmLGw7lrlP7bl7lFvvagKR6eatF`)
                  .then((response) => {
                    this.props.dispatch({
                      type: "DECREMENT",
                      data: response.data
                    });
                  })
                  axios.get(`https://api.polygon.io/v1/open-close/${event.row.ticker}/2020-10-14?adjusted=true&apiKey=fLlAuMmLGw7lrlP7bl7lFvvagKR6eatF`)
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