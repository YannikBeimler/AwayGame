import React, { FunctionComponent, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navigation from "../shared/navigation";
import { RouteComponentProps } from "react-router";
import GamesApi from "../../api/GamesApi";
import { Game } from "../../../api/model/game";
import moment from "moment";
import { Link } from "react-router-dom";

type GameDetailParams = {
  id: string;
};

type GameDetailProps = RouteComponentProps<GameDetailParams>;

const GameDetail: FunctionComponent<GameDetailProps> = ({ match }) => {
  const [game, setGame] = useState<Game>();

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
        title={`${game?.team1?.name ?? ""} - ${game?.team2?.name ?? ""}`}
        backUrl={"/games"}
        showBackButton={true}
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
        <Link to={`/games/${game?.id}/offers/new`}>
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
        </Link>
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
};

export default GameDetail;
