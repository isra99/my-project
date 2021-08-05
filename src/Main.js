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
                    weburl={this.props.info.weburl}
                    open={this.props.price.o} 
                    high={this.props.price.h} 
                    low={this.props.price.l} 
                    current={this.props.price.c} 
                    previous={this.props.price.pc}
                    loading={loading}
                />
            </div>
        );
    }
}

  export default Main;