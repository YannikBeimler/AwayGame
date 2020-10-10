import React, { FunctionComponent, useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import Navigation from "../shared/navigation";
import moment from "moment";
import ApplicationApi from "../../api/ApplicationApi";
import { Application } from "../../../api/model/application";
import Login from "../shared/login";

const MyApplications: FunctionComponent = () => {
  const [show, setShow] = useState(false);
  const [applications, setApplications] = useState<Application[]>();
  const [application, setApplication] = useState<Application>();

  const handleClose = () => setShow(false);
  const handleClick = (application: Application) => {
    setApplication(application);
    setShow(true);
  };

  const handleAccept = async () => {
    setShow(false);
  };

  useEffect(() => {
    const loadApplications = async () => {
      const applications = await ApplicationApi.applicationByUser(Login.getCurrentUser().id);
      setApplications(applications);
    };
    loadApplications();
  }, [setApplications]);

  return (
    <>
      <Navigation hideMenuButton={true} showBackButton={true} backUrl={`/games`} title={"Meine Fahrten"} />
      <Container
        className={"container-fluid games-container"}
        style={{ backgroundColor: "#232323", height: "100%", overflowY: "auto" }}>
        {applications?.map((currentApplication) => {
          return (
            <>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Mitfahrgelegenheit anfragen</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Abbrechen
                  </Button>
                  <Button variant="primary" onClick={handleAccept}>
                    Anfragen
                  </Button>
                </Modal.Footer>
              </Modal>
              <div onClick={() => handleClick(currentApplication)}>
                <Row className={"match-box"}>
                  <Col className={"match-box-content"} style={{ padding: "15px 15px 15px 80px" }}>
                    <img
                      src={"/assets/images/marker.png"}
                      height="70px"
                      style={{ position: "absolute", top: "calc(50% - 35px)", left: "15px" }}
                      alt={"marker-icon"}
                    />
                    <div style={{ margin: 0, fontSize: "16px", fontWeight: "bold", color: "white", width: "100%" }}>
                      Ab {currentApplication?.address?.city}
                      <span className="float-right">{moment(application?.offer?.game?.date).format("LT")}</span>
                    </div>
                    <div
                      style={{ margin: "8px 0 0 0", fontSize: "13px", fontWeight: 300, color: "white", width: "100%" }}>
                      Akzeptiert
                      <span className="float-right">{currentApplication.accepted ? "Ja" : "Nein"}</span>
                    </div>
                    <div style={{ margin: 0, fontSize: "13px", fontWeight: 300, color: "white", width: "100%" }}>
                      Spiel
                      <span className="float-right">{currentApplication.offer?.gameString}</span>
                    </div>
                  </Col>
                </Row>
              </div>
            </>
          );
        })}
      </Container>
    </>
  );
};

export default MyApplications;
