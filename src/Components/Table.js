import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  table: {
    minWidth: 1300,
  },
});

function createData(name, price) {
  return { name, price};
}


export default function BasicTable(props) {
  const classes = useStyles();
  const rows = [
    createData('Open price of the day', props.info.open),
    createData('High price of the day', props.info.high),
    createData('Low price of the day', props.info.low),
    createData('Current price', props.info.current),
    createData('Previous close price', props.info.previous),
  ];
  //console.log(props.info.open)
  return (
    <TableContainer border={0}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
