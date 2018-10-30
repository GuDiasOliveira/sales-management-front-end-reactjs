import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from '@material-ui/core/TablePaginationActions';
import PropTypes from 'prop-types';


TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const rowsPerPage = 10;

export default class SalesReportView extends Component {

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
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.report.length - page * rowsPerPage);
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
          {this.props.report.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((reportItem, i) => (
            <SalesReportRow key={reportItem.seller.id} reportItem={reportItem} />
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
            count={this.props.report.length}
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