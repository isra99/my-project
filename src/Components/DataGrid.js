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

    componentDidMount() {
      alert(this.props.match.params.symbol);
        axios.get(`https://finnhub.io/api/v1/search?q=${this.props.match.params.symbol}&token=c3ldsgaad3if71c77vtg`)
            .then((resp) => {
              console.warn(resp.data.result[0])
                let data = [];
                for (var i = 0; i < resp.data.count; i++) {
                  data.push({
                    'id': i, 
                    'description': resp.data.result[i].description, 
                    'displaySymbol': resp.data.result[i].displaySymbol,
                    'symbol': resp.data.result[i].symbol,
                    'type': resp.data.result[i].type
                  });
                } 
                console.warn(data);
                this.setState({ 
                    rows: data
                });
            })
        }
        
    render(){
        return (
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={this.state.rows}
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