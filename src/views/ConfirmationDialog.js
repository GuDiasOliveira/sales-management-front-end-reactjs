import React from 'react';
import Button from '@material-ui/core/Button';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';


class ConfirmationDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: this.props.open
    };
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({ open: nextProps.open });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleYes = () => {
    this.setState({ open: false });
    this.props.onYes();
  }

  handleNo = () => {
    this.setState({ open: false });
    this.props.onNo();
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          {this.props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {this.props.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleNo} color="primary" autoFocus>
            {this.props.noText || 'Cancel'}
          </Button>
          <Button onClick={this.handleYes} color="primary">
            {this.props.yesText || 'Ok'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}


export default ConfirmationDialog;