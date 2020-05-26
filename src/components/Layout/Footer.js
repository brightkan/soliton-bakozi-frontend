import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';


const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
           Soliton Bakozi &copy; Copyright {new Date().getFullYear()}.
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
