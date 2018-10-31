import React, { Component } from 'react';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from '@material-ui/core/TablePaginationActions';
import PropTypes from 'prop-types';

import ConfirmationDialog from './ConfirmationDialog';


TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const rowsPerPage = 10;

export default class SalesView extends Component {

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
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.sales.length - page * rowsPerPage);
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
          {this.props.sales.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((sale, i) => (
            <SaleRow key={sale.id} sale={sale} onDataChange={this.props.onDataChange} />
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 48 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TablePagination
            colSpan={3}
            count={this.props.sales.length}
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


class SaleRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deleteDialogOpen: false
    };
  }

  handleDeleteSale = () => {
    (async () => {
      let response = await fetch('http://localhost:8081/sale/' + this.props.sale.id, {
        method: 'DELETE',
      });
      if (response.status !== 200) {
        throw new Error('Failed to delete the sale with id ' + this.props.sale.id);
      }
    })().then(() => this.props.onDataChange()).catch(err => console.error(err));
    this.setState({ deleteDialogOpen: false });
  }

  render() {
    return(
      <TableRow>
        <TableCell>{this.props.sale.id}</TableCell>
        <TableCell>{this.props.sale.date.toLocaleString()}</TableCell>
        <TableCell>$ {this.props.sale.value.toFixed(2)}</TableCell>
        <TableCell>
          <IconButton color='secondary' variant='contained' onClick={() => this.setState({ deleteDialogOpen: true })}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
        <ConfirmationDialog
          title="Delete sale?"
          content="Are you sure?"
          onYes={this.handleDeleteSale}
          onNo={() => {}}
          open={this.state.deleteDialogOpen}
        />
      </TableRow>
    );
  }
}