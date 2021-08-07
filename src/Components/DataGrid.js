
import React, { useEffect, useState } from "react";
import { DataGrid } from '@material-ui/data-grid';
import { connect } from 'react-redux';
import axios from 'axios';
import Loader from './Loader'
import Main from '../Main';

let isFetching = false;
const columns = [
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

const DataTable = (props) => {
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, [value]);
  const fetchData = async () => {
    //alert(value)
    setLoading(true);
    await new Promise(resolve => 
      setTimeout(resolve, 5000)
      );
    await axios.get(`https://api.polygon.io/v1/meta/symbols/${value}/company?&apiKey=fLlAuMmLGw7lrlP7bl7lFvvagKR6eatF`)
      .then((response) => {
        props.SetInfo(response.data);
        setLoading(false);

      })
      .catch(err =>{
        console.log(err);
      })
      await axios.get(`https://api.polygon.io/v1/open-close/${value}/2020-10-14?adjusted=true&apiKey=fLlAuMmLGw7lrlP7bl7lFvvagKR6eatF`)
      .then((response) => {
        props.SetPrice(response.data);
      })
  }
  return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={!!props.rows?props.rows:[]}
          columns={columns}
          pageSize={10}
          onRowClick={(event) => {
            props.SetHide(false);
            setValue(event.row.ticker);
            fetchData();
          }}
        />
        {props.hide
          ? null
          : (loading
            ? 
            <Loader />
            : <Main 
                info={props.info}
                price={props.price}
                />)
        }
      </div>
    );
}


const mapStatetoProps = (state) => {
  console.log(state);
  return {
      hide: state.hide,
      info: state.info,
      price: state.price
  }
}
const mapDispatchtoProps = (dispatch) => {
  return {
    SetHide: (data) => dispatch({type: "SETHIDE", data:data}),
    SetInfo: (data) => dispatch({type: "SETINFO", data:data}),
    SetPrice: (data) => dispatch({type: "SETPRICE", data:data})
  }
}
export default connect (mapStatetoProps, mapDispatchtoProps)(DataTable);