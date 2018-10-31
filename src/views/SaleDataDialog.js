import React from 'react';

import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';

import dateFormat from 'dateformat';


class SaleDataDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: this.props.open || false,
      sale: Object.assign({}, this.props.sale || {
        id: 0,
        date: new Date(),
        value: 0.0,
        seller: this.props.seller
      }),
      saleDate: dateFormat(new Date(), 'yyyy-mm-dd')
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ open: nextProps.open || false });
    if (!nextProps.open && !this.state.sale.id) {
      const { sale } = this.state;
      sale.date = new Date();
      sale.value = 0.0;
      this.setState({ sale, saleDate: dateFormat(sale.date, 'yyyy-mm-dd') });
    }
  }

  handleDataChange = field => event => {
    const { sale } = this.state;
    sale[field] = event.target.value;
    console.log(event.target.value);
    this.setState({ sale });
  }

  handleDateChange = event => {
    const { sale } = this.state;
    try {
      sale.date = new Date(event.target.value);
    } catch {
    }
    this.setState({ sale, saleDate: event.target.value });
  }

  handleSubmit = () => {
    const sale = Object.assign({}, this.state.sale);
    const { id } = sale;
    delete sale.id;
    sale.sellerId = sale.seller.id;
    delete sale.seller;
    (async () => {
      const response = await fetch('http://localhost:8081/sale/' + (id || ''), {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sale),
      })
      if (response.status !== 200) {
        throw new Error('Failed to submit the sale');
      }
    })().then(() => this.props.onDataChange()).catch(err => console.error(err));
    this.props.onDoClose();
  }

  render() {
    return(
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}>
        <DialogTitle>
          Sale
        </DialogTitle>
        <DialogContent>
          <TextField
            style={{display: 'block'}}
            type="date"
            value={this.state.saleDate}
            onChange={this.handleDateChange}
            label="Sale's date"
          />
          <TextField
            type="currency"
            label="Value $"
            onChange={this.handleDataChange('value')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.onDoClose()} color="primary" autoFocus>
            Cancel
          </Button>
          <Button onClick={() => this.handleSubmit()} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

SaleDataDialog.propTypes = {
  open: PropTypes.bool,
  sale: PropTypes.shape({
    id: PropTypes.number,
    date: PropTypes.date,
    value: PropTypes.number,
    seller: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    }),
  }),
  seller: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }),
  onDataChange: PropTypes.func.isRequired,
  onDoClose: PropTypes.func.isRequired,
}


export default SaleDataDialog;