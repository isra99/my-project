import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Accordion from './Accordion'
import Loader from './Loader'


export default function Content(props) {
    console.log('inside content'+props.name);
    return (
        <div>
            <Loader loading={props.loading} />
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <img width="100%" src={props.logo} />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <h1 onClick={() => window.open(props.weburl)}>{props.name}</h1>
                </Grid>
                <Grid item xs={12}>
                <Accordion 
                    open={props.open} 
                    high={props.high} 
                    low={props.low} 
                    current={props.current} 
                    previous={props.previous}
                    />
                </Grid>
            </Grid>
        </div>
    )
}