import React, { FunctionComponent, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navigation from "../shared/navigation";
import { Game } from "../../../api/model/game";
import GamesApi from "../../api/GamesApi";
import moment from "moment";
import { Link } from "react-router-dom";
import { Offer } from "../../../api/model/offer";
import { RouteComponentProps } from "react-router";
import OffersApi from "../../api/OffersApi";

type OffersParams = {
  id: string;
};

type OfferProps = RouteComponentProps<OffersParams>;

const Offers: FunctionComponent<OfferProps> = ({ match }) => {
  const [offers, setOffers] = useState<Offer[]>();
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    const gameId = match.params.id;
    const loadOffers = async () => {
      const offers = await OffersApi.readOffersByGame(gameId);
      setOffers(offers);
    };
    const loadGame = async () => {
      const games = await GamesApi.readGames();
      const game = games.find((g) => g.id.toString() === gameId);
      setGame(game);
    };
    loadOffers();
    loadGame();
  }, [setOffers, match.params.id]);

  return (
    <>
      <Navigation
        hideMenuButton={true}
        showBackButton={true}
        backUrl={`/games/${game?.id}`}
        title={"Mitfahrgelegenheit suchen"}
      />
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
            <Link to={`/offers/${offer.id}`} key={offer.id}>
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
                    <span className="float-right">1337</span>
                  </div>
                  <div style={{ margin: 0, fontSize: "13px", fontWeight: 300, color: "white", width: "100%" }}>
                    Sektor
                    <span className="float-right">{"XXX"}</span>
                  </div>
                </Col>
              </Row>
            </Link>
          );
        })}
      </Container>
    </>
  );
};

export default Offers;
