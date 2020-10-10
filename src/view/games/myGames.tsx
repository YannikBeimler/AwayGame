import React, { FunctionComponent, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navigation from "../shared/navigation";
import { Game } from "../../../api/model/game";
import GamesApi from "../../api/GamesApi";
import moment from "moment";
import { Link } from "react-router-dom";
import { User } from "../../../api/model/user";
import Login from "../shared/login";
import OffersApi from "../../api/OffersApi";
import { Offer } from "../../../api/model/offer";

const MyGames: FunctionComponent = () => {
  const [games, setGames] = useState<Game[]>();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const user = Login.getCurrentUser();
    setUser(user);

    const loadGames = async () => {
      const games = await GamesApi.readGames();
      const offers = await OffersApi.readOffersByUser(user.id.toString());
      const gamesByUser: Game[] = [];
      offers.forEach((offer) => {
        const gameByOffer = games.find((game) => game.id === offer.gameId);
        if (gameByOffer) gamesByUser.push(gameByOffer);
      });
      setGames(gamesByUser);
    };

    loadGames();
  }, [setGames]);

  return (
    <>
      <Navigation title={"Meine Spiele"} />
      <Container
        className={"container-fluid games-container"}
        style={{ backgroundColor: "#232323", height: "100%", overflowY: "auto" }}>
        {games?.map((game) => {
          return (
            <Link to={`/mygames/${game.id}`} key={game.id}>
              <Row className={"match-box"}>
                <Col className={"match-box-content"}>
                  <p className={"match-box-content-date text-center"}>{moment(game.date).format("dd Do MMMM YYYY")}</p>
                  <div className={"match-box-content-divider text-center"} />
                  <p className={"match-box-content-time text-center"}>{moment(game.date).format("LT")}</p>
                  <img
                    className={"logo-team-one"}
                    src={`assets/images/clubs/${game.team1?.logoPath}`}
                    alt={game.team1?.name}
                  />
                  <img
                    className={"logo-team-two"}
                    src={`assets/images/clubs/${game.team2?.logoPath}`}
                    alt={game.team2?.name}
                  />
                </Col>
              </Row>
            </Link>
          );
        })}

        <p style={{ color: "#FFCF00" }}>
          Logged in {user?.name} | ID: {user?.id}
        </p>
      </Container>
    </>
  );
};

export default MyGames;
