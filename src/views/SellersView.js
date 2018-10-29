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