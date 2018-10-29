import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
      sellers: []
    };
    this.refresh();
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

  render() {
    return (
      <div className="App">
        <main>
          <h1>Sellers:</h1>
          <SellersView sellers={this.state.sellers} />
        </main>
      </div>
    );
  }
}

export default App;


class SellersView extends Component {

  render() {
    return(
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {this.props.sellers.map((seller, i) => (
            <SellerRow key={seller.id} seller={seller} />
          ))}
        </tbody>
      </table>
    );
  }
}


class SellerRow extends Component {

  render() {
    return(
      <tr>
        <td>{this.props.seller.id}</td>
        <td>{this.props.seller.name}</td>
      </tr>
    );
  }
}