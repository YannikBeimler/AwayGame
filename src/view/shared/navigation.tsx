import React, { FunctionComponent } from "react";
import { Nav, Navbar } from "react-bootstrap";

type NavigationProps = {
  title: string;
};

const Navigation: FunctionComponent<NavigationProps> = (navigationProps) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className={"yb-navigation"}>
      <Navbar.Brand href="#home">{navigationProps.title}</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav">
        <img src={"assets/images/menu_icon.svg"} />
      </Navbar.Toggle>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#">Profil</Nav.Link>
          <Nav.Link href="#">Auszeichnungen</Nav.Link>
          <Nav.Link href="#">Meine Angebote</Nav.Link>
          <Nav.Link href="#s">Meine Anfragen</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
