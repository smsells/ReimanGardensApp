import React, { Component } from "react";
import { Link } from "react-router-dom";
import './AdminButton.css';

export class AdminButton extends Component {
  render(){
    return (
        <button className="admin-button">
            {this.props.children}
            <Link to={this.props.link}></Link>
        </button>
    );
  }
}