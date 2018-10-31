import React, { Component } from 'react';
import './App.css';

import SellersView from './views/SellersView';
import SalesView from './views/SalesView';
import SalesReportView from './views/SalesReportView';

import SellerDataDialog from './views/SellerDataDialog';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import { Add as AddIcon } from '@material-ui/icons'

import { Button } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

// Example of sellers list from API
// let sellers = [
//   {
//     "id": 48,
//     "name": "Rocky Booker"
//   },
//   {
//     "id": 95,
//     "name": "Clint Barrett"
//   },
//   {
//     "id": 2,
//     "name": "Maria Letícia Mourão"
//   }
// ];

const styles = theme => ({
  addFab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 5,
    right: theme.spacing.unit * 5,
  }
});

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sellers: [],
      sellerSales: [],
      salesReport: [],
      addDialogOpen: false
    };
    this.refresh();
    this.viewSales = this.viewSales.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  refresh() {
    (async () => {
      const response = await fetch('http://localhost:8081/seller/');
      const body = await response.json();
      if (response.status !== 200) {
        throw new Error(body.message);
      }
      return body;
    })().then(res => this.setState({sellers: res}))
    .catch(err => {console.log(err); alert('Failed to retrive the sellers');});
    
    this.loadReport();
    if (this.state.selectedSeller)
      this.viewSales(this.state.selectedSeller.id);
  }

  viewSales(sellerId) {
    (async () => {
      const res = {};

      // Retrieving seller
      let response = await fetch('http://localhost:8081/seller/' + sellerId);
      let body = await response.json();
      if (response.status !== 200) {
        throw new Error(body.message);
      }
      res.seller = body;

      // Retrieving seller's sales
      response = await fetch('http://localhost:8081/seller/' + sellerId + '/sales');
      body = await response.json();
      if (response.status !== 200) {
        throw new Error(body.message);
      }
      res.sales = body;

      return res;
    })().then(res => {
      // Adapting data to react state to show
      res.sales = res.sales.map(sale => {
        sale.date = new Date(sale.date);
        return sale;
      })
      return res;
    }).then(res => this.setState({ selectedSeller: res.seller, sellerSales: res.sales }))
      .catch(err => {console.log(err); alert('Failed to retrive sales');});
  }

  loadReport() {
    (async () => {
      let response = await fetch('http://localhost:8081/salesReport');
      let body = await response.json();
      if (response.status !== 200) {
        throw new Error(body.message);
      }
      return body;
    })().then(res => this.setState({ salesReport: res }))
      .catch(err => {console.log(err); alert('Failed to retrive sales report');});
  }

  render() {
    return (
      <div className="App">
        <main style={{margin: 32}}>
          <Grid container spacing={32} alignItems={'stretch'}>
            <Grid item xs={4}>
              <Card>
                <CardHeader title={'Week sales report'} />
                <CardContent>
                  <SalesReportView report={this.state.salesReport} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardHeader title={'Sellers'} />
                <CardContent>
                  <SellersView sellers={this.state.sellers} onSeeSales={this.viewSales} onDataChange={() => this.refresh()} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card>
                {this.state.selectedSeller
                ?
                  <CardHeader title={`${this.state.selectedSeller.name}'s sales`} />
                :
                  ''
                }
                <CardContent>
                  <SalesView sales={this.state.sellerSales} onDataChange={() => this.refresh()} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Button variant="fab" color="primary" className={this.props.classes.addFab} onClick={() => this.setState({ addDialogOpen: true })}>
            <AddIcon />
          </Button>
          <SellerDataDialog
            open={this.state.addDialogOpen}
            onDataChange={() => this.refresh()}
            onDoClose={() => this.setState({ addDialogOpen: false })} />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);