import { withRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Content from './Components/Content';
import axios from 'axios'

let loading = false;

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: [],
            price: []
        };
    }
    componentDidMount() {
        axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${this.props.match.params.symbol}&token=c3ldsgaad3if71c77vtg`)
            .then((resp) => {
                 this.setState({ info: resp.data });
            })
        axios.get(`https://finnhub.io/api/v1/quote?symbol=${this.props.match.params.symbol}&token=c3ldsgaad3if71c77vtg`)
            .then((resp) => {
                 this.setState({ price: resp.data });
            })
    }
    render(){
        console.warn(this.props.match.params.symbol);
        return (
            <div>
                <Content 
                    name={this.state.info.name}
                    logo={this.state.info.logo}
                    weburl={this.state.info.weburl}
                    open={this.state.price.o} 
                    high={this.state.price.h} 
                    low={this.state.price.l} 
                    current={this.state.price.c} 
                    previous={this.state.price.pc}
                    loading={loading}
                />
            </div>
        );
    }
}

export default withRouter(Main);