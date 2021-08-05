import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../App.css';

export default function CircularUnderLoad(props) {
  return (
    <div className="loader">
      <CircularProgress disableShrink />
    </div>
  )
}