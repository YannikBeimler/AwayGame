import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navigation from "../shared/navigation";

export function GameDetail() {
  return (
    <>
      <Navigation title={"Servette FC - YB"} backUrl={"/games"} showBackButton={true} />
      <Container
        className={"container-fluid games-container"}
        style={{ backgroundColor: "#232323", height: "100%", overflowY: "auto" }}>
        <Row className={"match-box"}>
          <Col className={"match-box-content no-bg"}>
            <p className={"match-box-content-date text-center"}>Sa. 17. Oktober 2020</p>
            <div className={"match-box-content-divider text-center"} />
            <p className={"match-box-content-time text-center"}>19:00 Uhr</p>
            <img className={"logo-team-one"} src={"/assets/images/clubs/servettefc.png"} alt={"Logo Team 1"} />
            <img className={"logo-team-two"} src={"/assets/images/clubs/yb.png"} alt={"Logo Team 2"} />
          </Col>
        </Row>
        <a href={"/"}>
          <Row className={"match-box match-box-button"}>
            <Col className={"match-box-content match-box-button"}>
              <img
                className={"match-box-button-icon"}
                src={"/assets/images/car_right.svg"}
                alt={"Auto Symbol nach rechts"}
              />
              <p className={"text-center"}>Ich suche eine Mitfahrgelegenheit</p>
            </Col>
          </Row>
        </a>
        <a href={"/"}>
          <Row className={"match-box match-box-button"}>
            <Col className={"match-box-content match-box-button"}>
              <img
                className={"match-box-button-icon"}
                src={"/assets/images/car_left.svg"}
                alt={"Auto Symbol nach rechts"}
              />
              <p className={"text-center"}>Ich biete eine Mitfahrgelegenheit</p>
            </Col>
          </Row>
        </a>
        <a href={"/"}>
          <Row className={"match-box match-box-button"}>
            <Col className={"match-box-content match-box-button"}>
              <img
                className={"match-box-button-icon"}
                src={"/assets/images/train.svg"}
                alt={"Auto Symbol nach rechts"}
              />
              <p className={"text-center"}>Ich reise mit dem Öffentlichen Verkehr an</p>
            </Col>
          </Row>
        </a>
      </Container>
    </>
  );
}
