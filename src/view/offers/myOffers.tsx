import React, { FunctionComponent, useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import Navigation from "../shared/navigation";
import { Game } from "../../../api/model/game";
import GamesApi from "../../api/GamesApi";
import moment from "moment";
import { Offer } from "../../../api/model/offer";
import { RouteComponentProps } from "react-router";
import OffersApi from "../../api/OffersApi";

type OffersParams = {
  id: string;
};

type OfferProps = RouteComponentProps<OffersParams>;

const MyOffers: FunctionComponent<OfferProps> = ({ match }) => {
  const [offers, setOffers] = useState<Offer[]>();
  const [game, setGame] = useState<Game>();
  const [show, setShow] = useState(false);
  const [offer, setOffer] = useState<Offer>();

  const handleClose = () => setShow(false);
  const handleClick = (offer: Offer) => {
    setOffer(offer);
    setShow(true);
  };
  const handleAccept = async () => {
    if (!offer?.id) throw new Error("No Offer selected");
    if (!offer?.addressId) throw new Error("No AddressId available");
    setShow(false);
  };

  useEffect(() => {
    const userId = match.params.id;
    const loadOffers = async () => {
      const offers = await OffersApi.readOffersByUser(userId);
      setOffers(offers);
    };
    const loadGame = async () => {
      const games = await GamesApi.readGames();
      const game = games.find((g) => g.id.toString() === userId);
      setGame(game);
    };
    loadOffers();
    loadGame();
  }, [setOffers, match.params.id]);

  return (
    <>
      <Navigation hideMenuButton={true} showBackButton={true} backUrl={`/mygames`} title={"Bewerbungen"} />
      <Container
        className={"container-fluid games-container"}
        style={{ backgroundColor: "#232323", height: "100%", overflowY: "auto" }}>
        <Row className={"match-box"}>
          <Col className={"match-box-content no-bg"}>
            <p className={"match-box-content-date text-center"}>{moment(game?.date).format("dd Do MMMM YYYY")}</p>
            <div className={"match-box-content-divider text-center"} />
            <p className={"match-box-content-time text-center"}>{moment(game?.date).format("LT")}</p>
            <img
              className={"logo-team-one"}
              src={`/assets/images/clubs/${game?.team1?.logoPath ?? "placeholder.png"}`}
              alt={game?.team1?.name ?? "loading"}
            />
            <img
              className={"logo-team-two"}
              src={`/assets/images/clubs/${game?.team2?.logoPath ?? "placeholder.png"}`}
              alt={game?.team2?.name ?? "loading"}
            />
          </Col>
        </Row>
        {offers?.map((offer) => {
          return (
            <>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Bewerbung akzeptieren</Modal.Title>
                </Modal.Header>
                <Modal.Body></Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Abbrechen
                  </Button>
                  <Button variant="primary" onClick={handleAccept}>
                    Annehmen
                  </Button>
                </Modal.Footer>
              </Modal>
              <div onClick={() => handleClick(offer)}>
                <Row className={"match-box"}>
                  <Col className={"match-box-content"} style={{ padding: "15px 15px 15px 80px" }}>
                    <img
                      src={"/assets/images/marker.png"}
                      height="70px"
                      style={{ position: "absolute", top: "calc(50% - 35px)", left: "15px" }}
                      alt={"marker-icon"}
                    />
                    <div style={{ margin: 0, fontSize: "16px", fontWeight: "bold", color: "white", width: "100%" }}>
                      Ab {offer.address?.city}
                      <span className="float-right">{moment(game?.date).format("LT")}</span>
                    </div>
                    <div
                      style={{ margin: "8px 0 0 0", fontSize: "13px", fontWeight: 300, color: "white", width: "100%" }}>
                      Anzahl Personen
                      <span className="float-right">{offer.places}</span>
                    </div>
                    <div style={{ margin: 0, fontSize: "13px", fontWeight: 300, color: "white", width: "100%" }}>
                      Verfügbare Plätze
                      <span className="float-right">{offer.freePlaces}</span>
                    </div>
                    <div style={{ margin: 0, fontSize: "13px", fontWeight: 300, color: "white", width: "100%" }}>
                      Sektor
                      <span className="float-right">{offer.sector}</span>
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

export default MyOffers;
