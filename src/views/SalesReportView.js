import React, { Component } from 'react';


export default class SalesReportView extends Component {
  
  render() {
    return(
      <table>
        <thead>
          <tr>
            <th>Seller ID</th>
            <th>Seller name</th>
            <th>Daily sales average</th>
          </tr>
        </thead>
        <tbody>
          {this.props.report.map((reportItem, i) => (
            <SalesReportRow key={reportItem.seller.id} reportItem={reportItem} />
          ))}
        </tbody>
      </table>
    );
  }
}


class SalesReportRow extends Component {
  
  render() {
    return(
      <tr>
        <td>{this.props.reportItem.seller.id}</td>
        <td>{this.props.reportItem.seller.name}</td>
        <td>{this.props.reportItem.dailySalesAverage}</td>
      </tr>
    );
  }
}