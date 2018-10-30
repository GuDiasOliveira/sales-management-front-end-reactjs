import React, { Component } from 'react';


export default class SalesView extends Component {

  render() {
    return(
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {this.props.sales.map((sale, i) => (
            <SaleRow key={sale.id} sale={sale} />
          ))}
        </tbody>
      </table>
    );
  }
}


class SaleRow extends Component {

  render() {
    return(
      <tr>
        <td>{this.props.sale.id}</td>
        <td>{this.props.sale.date.toLocaleString()}</td>
        <td>$ {this.props.sale.value.toFixed(2)}</td>
      </tr>
    );
  }
}