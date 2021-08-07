import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from 'react-bootstrap';
import '../App.css';
export default function CircularUnderLoad(props) {
  return (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
      {<ReactBootStrap.Spinner animation="border" />}
    </div>
  )
}