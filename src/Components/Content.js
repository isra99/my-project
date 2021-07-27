import React from 'react';
import Grid from '@material-ui/core/Grid';
import Accordion from './Accordion'
import Loader from './Loader'
import { withRouter } from 'react-router-dom';

class Content extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <Loader loading={this.props.loading} />
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <img width="100%" src={this.props.logo} />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <h1>{this.props.name}</h1>
                    </Grid>
                    <Grid item xs={12}>
                    <Accordion 
                        open={this.props.open} 
                        high={this.props.high} 
                        low={this.props.low} 
                        current={this.props.current} 
                        previous={this.props.previous}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withRouter(Content);