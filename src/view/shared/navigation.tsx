import React, { FunctionComponent } from "react";
import { Nav, Navbar } from "react-bootstrap";

type NavigationProps = {
  title: string;
  backUrl?: string;
  hideMenuButton?: boolean;
  showBackButton?: boolean;
};

const Navigation: FunctionComponent<NavigationProps> = (navigationProps) => {
  return (
    <Navbar fixed="top" collapseOnSelect expand="xl" bg="light" variant="light" className={"yb-navigation"}>
      {navigationProps.showBackButton ? (
        <a href={navigationProps.backUrl}>
          <img
            src={"/assets/images/back_icon.svg"}
            alt={"Zurück Button"}
            width={20}
            style={{ position: "relative", top: "-2px" }}
          />
        </a>
      ) : (
        ""
      )}
      <Navbar.Brand href="/">{navigationProps.title}</Navbar.Brand>
      {navigationProps.hideMenuButton ? (
        ""
      ) : (
        <>
          <Navbar.Toggle aria-controls="responsive-navbar-nav">
            <img src={"/assets/images/menu_icon.svg"} alt={"Menü Icon"} />
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#">
                <img
                  className={"menu-icon"}
                  src={"/assets/images/menu_icons/profile_menu_icon.svg"}
                  alt={"Profile Icon"}
                />
                Profil
              </Nav.Link>
              <Nav.Link href="#">
                <img
                  className={"menu-icon"}
                  src={"/assets/images/menu_icons/badge_menu_icon.svg"}
                  alt={"Auszeichnungs Icon"}
                />
                Auszeichnungen
              </Nav.Link>
              <Nav.Link href="#">
                <img
                  className={"menu-icon"}
                  src={"/assets/images/menu_icons/offers_menu_icon.svg"}
                  alt={"Anfrage Icon"}
                />
                Meine Angebote
              </Nav.Link>
              <Nav.Link href="#">
                <img
                  className={"menu-icon"}
                  src={"/assets/images/menu_icons/request_menu_icon.svg"}
                  alt={"Angebot Icon"}
                />
                Meine Anfragen
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </>
      )}
    </Navbar>
  );
};

export default Navigation;
