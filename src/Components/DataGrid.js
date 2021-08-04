import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { withRouter } from 'react-router-dom';
import axios from 'axios'

const columns = [
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
    constructor(props){
        super(props);
        this.state = {
            rows: []
        };
    }        
    render(){
        return (
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={this.props.rows}
                columns={columns}
                pageSize={10}
                onRowClick={() => {
                  const win = window.open("/info/"+this.props.match.params.symbol, "_blank");
                  win.focus();
                }}
              />
            </div>
          );
    }
}

export default withRouter(DataTable);