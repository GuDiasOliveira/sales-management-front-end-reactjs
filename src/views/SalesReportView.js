import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


export default class SalesReportView extends Component {
  
  render() {
    return(
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Seller ID</TableCell>
            <TableCell>Seller name</TableCell>
            <TableCell>Daily sales average</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.report.map((reportItem, i) => (
            <SalesReportRow key={reportItem.seller.id} reportItem={reportItem} />
          ))}
        </TableBody>
      </Table>
    );
  }
}


class SalesReportRow extends Component {
  
  render() {
    return(
      <TableRow>
        <TableCell>{this.props.reportItem.seller.id}</TableCell>
        <TableCell>{this.props.reportItem.seller.name}</TableCell>
        <TableCell>{this.props.reportItem.dailySalesAverage}</TableCell>
      </TableRow>
    );
  }
}