import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import '../App.css';
export default function CircularUnderLoad(props) {
  return (
    <div>
      {<ReactBootStrap.Spinner animation="border" />}
    </div>
  )
}