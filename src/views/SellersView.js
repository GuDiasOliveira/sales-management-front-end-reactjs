import React, { Component } from 'react';


export default class SellersView extends Component {

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
            <SellerRow key={seller.id} seller={seller} onSeeSales={this.props.onSeeSales} />
          ))}
        </tbody>
      </table>
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
      <tr>
        <td>{this.props.seller.id}</td>
        <td>{this.props.seller.name}</td>
        <td>
          <button onClick={this.handleClickSeeSales}>Report sales</button>
        </td>
      </tr>
    );
  }
}