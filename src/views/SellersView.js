import React, { Component } from 'react';

import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


export default class SellersView extends Component {

  render() {
    return(
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.sellers.map((seller, i) => (
            <SellerRow key={seller.id} seller={seller} onSeeSales={this.props.onSeeSales} />
          ))}
        </TableBody>
      </Table>
    );
  }
}


class SellerRow extends Component {

  constructor(props) {
    super(props);
    this.handleClickSeeSales = this.handleClickSeeSales.bind(this);
  }

  handleClickSeeSales(e) {
    this.props.onSeeSales(this.props.seller.id);
  }

  render() {
    return(
      <TableRow>
        <TableCell>{this.props.seller.id}</TableCell>
        <TableCell>{this.props.seller.name}</TableCell>
        <TableCell>
          <Button color='primary' variant='contained' onClick={this.handleClickSeeSales}>Report sales</Button>
        </TableCell>
      </TableRow>
    );
  }
}