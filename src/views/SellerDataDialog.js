import React from 'react';

import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';


class SellerDataDialog extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.open || false,
      seller: Object.assign({}, this.props.seller || {
        id: 0,
        name: ''
      })
    };
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({ open: nextProps.open || false });
  }

  handleDataChange = field => event => {
    const { seller } = this.state;
    seller[field] = event.target.value;
    this.setState({ seller });
  }

  handleSubmit = () => {
    const { seller } = this.state;
    const { id } = seller;
    delete seller.id;
    (async () => {
      const response = await fetch('http://localhost:8081/seller/' + (id || ''), {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(seller),
      })
      if (response.status !== 200) {
        throw new Error('Failed to submit the seller');
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
          Seller
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={this.state.seller.name}
            onChange={this.handleDataChange('name')}
            margin="normal"
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


SellerDataDialog.propTypes = {
  open: PropTypes.bool,
  seller: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }),
  onDataChange: PropTypes.func.isRequired,
  onDoClose: PropTypes.func.isRequired,
}


export default SellerDataDialog;