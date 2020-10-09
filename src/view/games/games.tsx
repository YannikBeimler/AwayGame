import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navigation from "../shared/navigation";

export function Games() {
  return (
    <>
      <Navigation title={"Kommende Spiele"} />
      <Container
        className={"container-fluid games-container"}
        style={{ backgroundColor: "#232323", height: "100%", overflowY: "auto" }}>
        <a href={"/games/1"}>
          <Row className={"match-box"}>
            <Col className={"match-box-content"}>
              <p className={"match-box-content-date text-center"}>Sa. 17. Oktober 2020</p>
              <div className={"match-box-content-divider text-center"} />
              <p className={"match-box-content-time text-center"}>19:00 Uhr</p>
              <img className={"logo-team-one"} src={"assets/images/clubs/servettefc.png"} alt={"Logo Team 1"} />
              <img className={"logo-team-two"} src={"assets/images/clubs/yb.png"} alt={"Logo Team 2"} />
            </Col>
          </Row>
        </a>
      </Container>
    </>
  );
}
