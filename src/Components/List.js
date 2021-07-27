import React from 'react';
import '../App.css'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

const List = () => {
    return (
    <div>
        <table>
            <tr><Link target="blank" to="/stock/AMZN">AMZN</Link></tr>
            <tr><Link target="blank" to="/stock/BRK.B">BRK.B</Link></tr>
            <tr><Link target="blank" to="/stock/AAPL">AAPL</Link></tr>
            <tr><Link target="blank" to="/stock/GOOG">GOOG</Link></tr>
            <tr><Link target="blank" to="/stock/MSFT">MSFT</Link></tr>
            <tr><Link target="blank" to="/stock/JPM">JPM</Link></tr>
            <tr><Link target="blank" to="/stock/FB">FB</Link></tr>
            <tr><Link target="blank" to="/stock/JNJ">JNJ</Link></tr>
            <tr><Link target="blank" to="/stock/TSLA">TSLA</Link></tr>
            <tr><Link target="blank" to="/stock/V">V</Link></tr>
      </table>
    </div>
    );
}
export default List;