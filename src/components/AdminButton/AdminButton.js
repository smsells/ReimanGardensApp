import React, { Component } from "react";
import './AdminButton.css';

export class AdminButton extends Component {
  render(){
    return (
        <button className="admin-button">
            {this.props.children}
        </button>
    );
  }
}