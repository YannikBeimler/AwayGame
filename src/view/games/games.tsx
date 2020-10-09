import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navigation from "../shared/navigation";

export function Games() {
  return (
    <>
      <Navigation title={"Kommende Spiele"} />
      <Container
        id={"entry-header"}
        className={"container-fluid"}
        style={{ backgroundColor: "#232323", height: "100%", overflowY: "auto" }}>
        <Row className={"match-box"}>
          <Col className={"match-box-content"}>
            <p className={"match-box-content-date text-center"}>Sa. 17. Oktober 2020</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
