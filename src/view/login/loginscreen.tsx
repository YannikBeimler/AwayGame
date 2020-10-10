import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { User } from "../../../api/model/user";
import LoginApi from "../../api/LoginApi";
import { useHistory } from "react-router-dom";

export function LoginScreen() {
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState<string>();

  useEffect(() => {
    logoutUser();
  });

  const logoutUser = () => {
    const u = { id: -1, name: "Logged Out" };
    const nullUser = u as User;
    localStorage.setItem("currentUser", JSON.stringify(nullUser));
  };

  const loginUser = async (username?: string) => {
    if (username) {
      const user = await LoginApi.getUser(username);
      if (user.id > 0) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        return true;
      }
    }
    logoutUser();
    return false;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (await loginUser(event.target.username.value)) history.push(`/games`);
    else setErrorMsg("User nicht gefunden!");
  };

  return (
    <Container
      id={"entry-header"}
      className={"container-fluid login-container"}
      style={{ backgroundColor: "#FFCF00", height: "100%" }}>
      <Row>
        <Col lg={12} md={12} sm={12} className={"text-center"}>
          <Image
            fluid
            src={"assets/images/clubs/yb.png"}
            alt={"Young Boys Logo"}
            style={{ marginTop: "100px", maxWidth: "180px" }}
          />
        </Col>
      </Row>

      <Row>
        <Col style={{ marginTop: "30px" }} lg={12} md={12} sm={12} className={"text-center"}>
          <p>&nbsp;{errorMsg}&nbsp;</p>
        </Col>
      </Row>

      <Row style={{ marginTop: "40px" }}>
        <Col lg={12} md={12} sm={12} className={"text-center"}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Control type="text" placeholder="Benutzername" name={"username"} />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Control type="password" placeholder="Passwort" name={"password"} />
            </Form.Group>
            <Button
              type={"submit"}
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
