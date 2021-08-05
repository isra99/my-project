import React from 'react';
import Content from './Components/Content';

let loading = false;

class Main extends React.Component {
    render(){
        return (
            <div>
                <Content 
                    name={this.props.info.name}
                    logo={this.props.info.logo}
                    weburl={this.props.info.url}
                    open={this.props.price.open} 
                    high={this.props.price.high} 
                    low={this.props.price.low} 
                    current={this.props.price.close} 
                    previous={this.props.price.preMarket}
                    loading={loading}
                />
            </div>
        );
    }
}

  export default Main;