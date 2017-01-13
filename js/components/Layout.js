import React from 'react';
import ReactDOM from 'react-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

const navbarInstance = (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">GDP Comparison</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1} href="/">Continent Comparisons: Tree Map and Histogram </NavItem>
      <NavItem eventKey={2} href="/#/comparison">GDP Comparison By Country</NavItem>
    </Nav>
  </Navbar>
);


class Layout extends React.Component{
  render(){
    return(
      <div>
        {navbarInstance}
        <div className="container">
          {this.props.children}
        </div>
      </div>
      
    );
  }
}

module.exports = Layout;