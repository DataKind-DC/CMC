import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from 'reactstrap';


function NavBar(props){
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
      <Navbar color="light" light expand="md">
        <NavbarBrand style={{fontWeight: 500}} href="/">CMC Data Explorer</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavbarText>
                <NavLink onClick={props.toggle_modal}>Parameter Definitions</NavLink>
            </NavbarText>
          </Nav>
            <NavbarText>
                <NavLink href="https://cmc.vims.edu/Home/About">About CMC</NavLink>
            </NavbarText>
        </Collapse>
      </Navbar>
  );
}

export default NavBar;