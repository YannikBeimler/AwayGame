import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";

export function LoginScreen() {
  return (
    <Container id={"entry-header"} className={"container-fluid"} style={{ backgroundColor: "#FFCF00", height: "100%" }}>
      <Row>
        <Col lg={12} md={12} sm={12} className={"text-center"}>
          <Image
            fluid
            src={"assets/images/yb.png"}
            alt={"Young Boys Logo"}
            style={{ marginTop: "100px", maxWidth: "250px" }}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "80px" }}>
        <Col lg={12} md={12} sm={12} className={"text-center"}>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Control type="text" placeholder="Benutzername" />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Control type="password" placeholder="Passwort" />
            </Form.Group>
            <Button
                href={"/games"}
              style={{
                marginTop: 20,
                backgroundColor: "#232323",
                color: "#FFCF00",
                fontWeight: "bold",
                width: "100%",
                textTransform: "uppercase",
                borderRadius: 0,
                border: "none"
              }}>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
      <Row
        style={{
          marginTop: 80
        }}>
        <Col lg={6} md={6} sm={6} xs={4} className={"text-left"}>
          <span>
            <a className={"yb-link-login"} href={"/register"}>
              registrieren
            </a>
          </span>
        </Col>
        <Col lg={6} md={6} sm={6} xs={8} className={"text-right"}>
          <span>
                       <a className={"yb-link-login"} href={"/reset-password"}>
              passwort vergessen?
            </a>
          </span>
        </Col>
      </Row>
    </Container>
  );
}
