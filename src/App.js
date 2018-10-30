import React, { Component } from 'react';
import './App.css';

import SellersView from './views/SellersView';
import SalesView from './views/SalesView';
import './views/SalesReportView';
import SalesReportView from './views/SalesReportView';

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

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sellers: [],
      sellerSales: [],
      salesReport: []
    };
    this.refresh();
    this.loadReport();
    this.viewSales = this.viewSales.bind(this);
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
        <main>
          <div style={{float: 'left'}}>
            <h1>Week sales report:</h1>
            <SalesReportView report={this.state.salesReport} />
          </div>
          <div style={{float: 'left'}}>
            <h1>Sellers:</h1>
            <SellersView sellers={this.state.sellers} onSeeSales={this.viewSales} />
          </div>
          <div style={{float: 'left'}}>
            {this.state.selectedSeller ? <h1>{this.state.selectedSeller.name}'s sales</h1> : ''}
            <SalesView sales={this.state.sellerSales} />
          </div>
        </main>
      </div>
    );
  }
}

export default App;