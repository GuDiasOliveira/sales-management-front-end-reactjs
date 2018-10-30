import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


export default class SalesView extends Component {

  render() {
    return(
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.sales.map((sale, i) => (
            <SaleRow key={sale.id} sale={sale} />
          ))}
        </TableBody>
      </Table>
    );
  }
}


class SaleRow extends Component {

  render() {
    return(
      <TableRow>
        <TableCell>{this.props.sale.id}</TableCell>
        <TableCell>{this.props.sale.date.toLocaleString()}</TableCell>
        <TableCell>$ {this.props.sale.value.toFixed(2)}</TableCell>
      </TableRow>
    );
  }
}