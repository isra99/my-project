import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../App.css';

export default function CircularUnderLoad(props) {
  return (
    <div style={{display: !props.loading && "none"}} className="loader">
      <CircularProgress disableShrink />
    </div>
  )
}