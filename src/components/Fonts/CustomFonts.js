import {React, Component} from 'react';

export class CustomBody extends Component {

  render() {
    return(
      <div>
        <p style={{fontFamily:"verdana", fontSize: 18, color:"black"}}>
          {this.props.children}
        </p>
      </div>
    )
  }

}

export class CustomHeaderLarge extends Component {

  render() {
    return(
      <div>
        <p style={{fontFamily:"verdana", fontSize: 25, color:"#606C38"}}>
          {this.props.children}
        </p>
      </div>
    )
  }

}

export class CustomHeaderSmall extends Component {

  render() {
    return(
      <div>
        <p style={{fontFamily:"verdana", fontSize: 22, color:"#606C38"}}>
          {this.props.children}
        </p>
      </div>
    )
  }

}

export class CustomLink extends Component {

  render() {
    return(
      <div>
        <p style={{fontFamily:"Arial", fontSize: 12, color:"#FEFAE0"}}>
          {this.props.children}
        </p>
      </div>
    )
  }

}

