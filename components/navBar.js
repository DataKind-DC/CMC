import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button
} from 'reactstrap';


function NavBar(props){
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
      <Navbar style={{width: '100%'}} color="light" light expand="md">
        <NavbarBrand href="/">CMC Data Explorer</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav>
          </Nav>
          <NavbarText>
              <NavLink href="https://cmc.vims.edu/Home/About">About CMC</NavLink>
          </NavbarText>
        </Collapse>
      </Navbar>
  );
}

export default NavBar;