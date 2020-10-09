import {Game} from '../model/game';
import { Team } from '../model/team';
import {Offer} from "../model/offer";
import {User} from "../model/user";
import {Address} from "../model/address";

var sql = require("mssql");

class DbService {

  dbConfig = {
    server: "awaygamedb.database.windows.net", // Use your SQL server name
    database: "AwayGameDB", // Database to connect to
    user: "younghackers", // Use your username
    password: "YBHackathon20", // Use your password
    port: 1433,
    // Since we're on Windows Azure, we need to set the following options
    options: {
      encrypt: true
    }
   };

   constructor() {}
   
  async getGames() {
      const conn = new sql.ConnectionPool(this.dbConfig);

      const response = [];
      await conn
      .connect()
      .then(async function () {
          const req = new sql.Request(conn);

          await req.query(
          `SELECT
            tblGame.intGamePK,
            tblGame.datDate,
            intHomeTeamPK = T1.intTeamPK,
            strHomeTeam = T1.strName,
            strHomeLogo = T1.strLogoPath,
            intAwayTeamPK = T2.intTeamPK,
            strAwayTeam = T2.strName,
            strAwayLogo = T2.strLogoPath,
            tblAddress.*
          FROM
            tblGame
            INNER JOIN tblTeam AS T1
                    ON T1.intTeamPK = tblGame.intTeam1FK
            INNER JOIN tblAddress
                    ON tblAddress.intAddressPK = T1.intAddressFK
            INNER JOIN tblTeam AS T2
                    ON T2.intTeamPK = tblGame.intTeam2FK
          WHERE
            tblGame.datDate > GETDATE()`)
        .then(function (recordset) {
          conn.close();
          recordset.recordset.forEach(element => {
              const homeTeam = new Team(element["intHomeTeamPK"], element["strHomeTeam"], element["strHomeLogo"]);
              const awayTeam = new Team(element["intAwayTeamPK"], element["strAwayTeam"], element["strAwayLogo"]);
              response.push(new Game(element["intGamePK"], element["datDate"], homeTeam, awayTeam));
          });
        })
        .catch(function (err) {
          console.log(err);
          conn.close();
        })
      })
      .catch(function (err) {
        console.log(err);
        conn.close();
      });
      return response;
  }

    async getOffersForGame(gameID: number) {
        const conn = new sql.ConnectionPool(this.dbConfig);

        const response = [];
        await conn
            .connect()
            .then(async function () {
                const req = new sql.Request(conn);

                await req.query(
                    `SELECT 
              tblOffer.intOfferPK,
              tblOffer.blnTransportation,
              tblOffer.datDate,
              tblOffer.intPlaces,
              tblAddress.intAddressPK,
              tblAddress.strCity, 
              tblAddress.strStreet,
              tblAddress.decLatitude,
              tblAddress.decLongitude
          FROM
              tblOffer
              INNER JOIN tblUser
                      ON tblUser.intUserPK = tblOffer.intUserFK
              INNER JOIN tblAddress
                      ON tblAddress.intAddressPK = tblOffer.intAddressFK
          WHERE
              tblOffer.intGameFK = ` + gameID)
                    .then(function (recordset) {
                        conn.close();
                        recordset.recordset.forEach(element => {
                            const address = new Address(element["intAddressPK"], element["strStreet"], element["strCity"], element["decLatitude"], element["decLongitude"]);
                            const offer = new Offer(element["intOfferPK"], element["blnTransportation"], element["datDate"], element["intPlaces"]);
                            offer.address = address;
                            response.push(offer);
                        });
                    })
                    .catch(function (err) {
                        console.log(err);
                        conn.close();
                    })
            })
            .catch(function (err) {
                console.log(err);
                conn.close();
            });
        return response;
    }
}

export default new DbService();
