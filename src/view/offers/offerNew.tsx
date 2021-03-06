import React, { FunctionComponent, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Navigation from "../shared/navigation";
import { RouteComponentProps } from "react-router";
import { useHistory } from "react-router-dom";
import GamesApi from "../../api/GamesApi";
import { Game } from "../../../api/model/game";
import OffersApi from "../../api/OffersApi";
import Login from "../shared/login";

type GameDetailParams = {
  id: string;
};

type GameDetailProps = RouteComponentProps<GameDetailParams>;

const OfferNew: FunctionComponent<GameDetailProps> = ({ match }) => {
  const [game, setGame] = useState<Game>();
  const history = useHistory();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!game) {
      console.log("no game");
      return;
    }
    const offer = {
      gameId: game.id,
      title: event.target.description.value,
      userId: Login.getCurrentUser().id,
      addressId: Login.getCurrentUser().adressFK ?? 1,
      places: Number(event.target.freePlaces.value),
      peopleCount: Number(event.target.peopleCount.value),
      sector: event.target.sector.value
    };
    await OffersApi.createOffer(JSON.stringify(offer));
    history.push(`/games/${game?.id}`);
  };

  useEffect(() => {
    const gameId = match.params.id;
    const loadGame = async () => {
      const games = await GamesApi.readGames();
      const game = games.find((g) => g.id.toString() === gameId);
      setGame(game);
    };
    loadGame();
  }, [setGame, match.params.id]);

  return (
    <>
      <Navigation
        title={"Mitfahrgelegenheit anbieten"}
        backUrl={`games/${game?.id}`}
        showBackButton={true}
        hideMenuButton={true}
      />
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
        <Row className={"match-box new-offer-box"}>
          <Col className={"match-box-content"} style={{ padding: "20px" }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId={"formDescription"}>
                <Form.Label>Beschreibung</Form.Label>
                <Form.Control type={"text"} name={"description"} />
              </Form.Group>
              <Form.Group controlId={"formStartTime"}>
                <Form.Label>Abfahrtszeit</Form.Label>
                <Form.Control type={"text"} name={"startTime"} />
              </Form.Group>
              <Form.Group controlId={"formSector"}>
                <Form.Label>Stadion Sektor</Form.Label>
                <Form.Control type={"text"} name={"sector"} />
              </Form.Group>
              <Form.Group controlId={"formPeopleCount"}>
                <Form.Label>Anzahl Personen (Wie gross ist deine Gruppe?)</Form.Label>
                <Form.Control type={"number"} name={"peopleCount"} />
              </Form.Group>
              <Form.Group controlId={"formFreePlaces"}>
                <Form.Label>Anzahl freie Plätze</Form.Label>
                <Form.Control type={"number"} name={"freePlaces"} />
              </Form.Group>
              <Button
                type={"submit"}
                style={{
                  marginTop: 20,
                  backgroundColor: "#FFCF00",
                  color: "#323232",
                  fontWeight: "bold",
                  width: "100%",
                  textTransform: "uppercase",
                  borderRadius: 0,
                  border: "none"
                }}>
                Gelegenheit anbieten
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OfferNew;
