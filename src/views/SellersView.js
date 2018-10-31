import React, { Component } from 'react';

import IconButton from '@material-ui/core/IconButton';
import { RemoveRedEye, Edit, Add } from '@material-ui/icons';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from '@material-ui/core/TablePaginationActions';

import PropTypes from 'prop-types';

import SellerDataDialog from './SellerDataDialog';
import SaleDataDialog from './SaleDataDialog';


TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const rowsPerPage = 10;

export default class SellersView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  render() {
    const { page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.sellers.length - page * rowsPerPage);
    return(
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.sellers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((seller, i) => (
            <SellerRow key={seller.id} seller={seller} onSeeSales={this.props.onSeeSales} onDataChange={this.props.onDataChange} />
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 57 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TablePagination
            colSpan={3}
            count={this.props.sellers.length}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[]}
            page={page}
            onChangePage={this.handleChangePage}
            ActionsComponent={TablePaginationActions}
          />
        </TableFooter>
      </Table>
    );
  }
}

SellersView.propTypes = {
  sellers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  })),
  onSeeSales: PropTypes.func.isRequired,
  onDataChange: PropTypes.func.isRequired,
}


class SellerRow extends Component {

  constructor(props) {
    super(props);
    this.handleClickSeeSales = this.handleClickSeeSales.bind(this);
    this.state = {
      editDialogOpen: false,
      newSaleDialogOpen: false,
    }
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
          <IconButton color='primary' variant='contained' onClick={this.handleClickSeeSales}>
            <RemoveRedEye />
          </IconButton>
          <IconButton color='primary' variant='contained' onClick={() => this.setState({ editDialogOpen: true })}>
            <Edit />
          </IconButton>
          <IconButton color='primary' variant='contained' onClick={() => this.setState({ newSaleDialogOpen: true })}>
            <Add />
          </IconButton>
        </TableCell>
        <SellerDataDialog
          open={this.state.editDialogOpen}
          seller={this.props.seller}
          onDataChange={this.props.onDataChange}
          onDoClose={() => this.setState({ editDialogOpen: false })} />
        <SaleDataDialog
          open={this.state.newSaleDialogOpen}
          seller={this.props.seller}
          onDataChange={this.props.onDataChange}
          onDoClose={() => this.setState({ newSaleDialogOpen: false })} />
      </TableRow>
    );
  }
}

SellerRow.propTypes = {
  seller: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }),
  onSeeSales: PropTypes.func.isRequired,
  onDataChange: PropTypes.func.isRequired,
}