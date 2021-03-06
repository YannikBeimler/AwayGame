import { Game } from "../model/game";
import { Team } from "../model/team";
import { Offer } from "../model/offer";
import { Address } from "../model/address";
import { Application } from "../model/application";
import { User } from "../model/user";

const sql = require("mssql");

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

        await req
          .query(
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
            tblGame.datDate > GETDATE()`
          )
          .then(function (recordset) {
            conn.close();
            recordset.recordset.forEach((element) => {
              const homeTeam = new Team(element["intHomeTeamPK"], element["strHomeTeam"], element["strHomeLogo"]);
              const awayTeam = new Team(element["intAwayTeamPK"], element["strAwayTeam"], element["strAwayLogo"]);
              response.push(new Game(element["intGamePK"], element["datDate"], homeTeam, awayTeam));
            });
          })
          .catch(function (err) {
            console.log(err);
            conn.close();
          });
      })
      .catch(function (err) {
        console.log(err);
        conn.close();
      });
    return response;
  }

  async getOffersForGame(gameId: number) {
    const conn = new sql.ConnectionPool(this.dbConfig);
    const response = [];
    await conn
      .connect()
      .then(async function () {
        const req = new sql.Request(conn);

        await req
          .query(
            `SELECT 
            vieOffer.intOfferPK,
            vieOffer.strTitle,
            vieOffer.blnTransportation,
            vieOffer.datDate,
            vieOffer.intPlaces,
            vieOffer.intFreePlaces,
            vieOffer.intFixPeopleCount,
            vieOffer.strSector,
            tblAddress.intAddressPK,
            tblAddress.strCity, 
            tblAddress.strStreet,
            tblAddress.decLatitude,
            tblAddress.decLongitude,
            vieOffer.strUserName
        FROM
            vieOffer
            INNER JOIN tblUser
                    ON tblUser.intUserPK = vieOffer.intUserFK
            INNER JOIN tblAddress
                    ON tblAddress.intAddressPK = vieOffer.intAddressFK
        WHERE
            vieOffer.intGameFK = ` + gameId
          )
          .then(function (recordset) {
            conn.close();
            recordset.recordset.forEach((element) => {
              const address = new Address(
                element["intAddressPK"],
                element["strStreet"],
                element["strCity"],
                element["decLatitude"],
                element["decLongitude"]
              );
              const offer = new Offer(
                element["intOfferPK"],
                element["strTitle"],
                element["blnTransportation"],
                element["datDate"],
                element["intPlaces"],
                element["intFreePlaces"],
                element["intFixPeopleCount"],
                element["strSector"]
              );
              offer.address = address;
              offer.userString = element["strUserName"];
              response.push(offer);
            });
          })
          .catch(function (err) {
            console.log(err);
            conn.close();
          });
      })
      .catch(function (err) {
        console.log(err);
        conn.close();
      });
    return response;
  }

  async getOffersForUser(userId: number) {
    const conn = new sql.ConnectionPool(this.dbConfig);

    const response = [];
    await conn
      .connect()
      .then(async function () {
        const req = new sql.Request(conn);

        await req
          .query(
            `SELECT
                    vieOffer.intOfferPK,
                    vieOffer.intGameFK,
                    vieOffer.strTitle,
                    vieOffer.blnTransportation,
                    vieOffer.datDate,
                    vieOffer.intPlaces,
                    vieOffer.intFreePlaces,
                    vieOffer.intFixPeopleCount,
                    vieOffer.strSector,
                    tblAddress.intAddressPK,
                    tblAddress.strCity, 
                    tblAddress.strStreet,
                    tblAddress.decLatitude,
                    tblAddress.decLongitude,
                    strGameTitle = vieGame.strTitle
                 FROM
                    vieOffer
                    INNER JOIN vieGame
                        ON vieGame.intGamePK = vieOffer.intGameFK
                      INNER JOIN tblAddress
                              ON tblAddress.intAddressPK = vieOffer.intAddressFK
                    WHERE
                    vieOffer.intUserFK = ` + userId
          )
          .then(function (recordset) {
            conn.close();
            recordset.recordset.forEach((element) => {
              const address = new Address(
                element["intAddressPK"],
                element["strStreet"],
                element["strCity"],
                element["decLatitude"],
                element["decLongitude"]
              );
              const offer = new Offer(
                element["intOfferPK"],
                element["strTitle"],
                element["blnTransportation"],
                element["datDate"],
                element["intPlaces"],
                element["intFreePlaces"],
                element["intFixPeopleCount"],
                element["strSector"]
              );
              offer.address = address;
              offer.gameId = element["intGameFK"];
              offer.gameString = element["strGameTitle"];
              response.push(offer);
            });
          })
          .catch(function (err) {
            console.log(err);
            conn.close();
          });
      })
      .catch(function (err) {
        console.log(err);
        conn.close();
      });
    return response;
  }

  async getApplicationByUser(userId: number) {
    const conn = new sql.ConnectionPool(this.dbConfig);

    const response = [];
    await conn
      .connect()
      .then(async function () {
        const req = new sql.Request(conn);

        await req
          .query(
            `SELECT
                tblApplication.intApplicationPK,
                vieOffer.strTitle,
                tblApplication.datDate,
                tblApplication.blnAccepted,
                vieOffer.intOfferPK,
                vieOffer.blnTransportation,
                vieOffer.datDate,
                vieOffer.intPlaces,
                vieOffer.intFreePlaces,
                vieOffer.intFixPeopleCount,
                vieOffer.strSector,
                tblAddress.intAddressPK,
                tblAddress.strCity, 
                tblAddress.strStreet,
                tblAddress.decLatitude,
                tblAddress.decLongitude,
                strGameTitle = vieGame.strTitle
            FROM
                tblApplication
                INNER JOIN vieOffer
                        ON vieOffer.intOfferPK = tblApplication.intOfferFK
                INNER JOIN vieGame
                        ON vieGame.intGamePK = vieOffer.intGameFK
                INNER JOIN tblAddress
                        ON tblAddress.intAddressPK = tblApplication.intAddressFK
            WHERE
                tblApplication.intUserFK = ` + userId
          )
          .then(function (recordset) {
            conn.close();
            recordset.recordset.forEach((element) => {
              const address = new Address(
                element["intAddressPK"],
                element["strStreet"],
                element["strCity"],
                element["decLatitude"],
                element["decLongitude"]
              );
              const offer = new Offer(
                element["intOfferPK"],
                element["strTitle"],
                element["blnTransportation"],
                element["datDate"],
                element["intPlaces"],
                element["intFreePlaces"],
                element["intFixPeopleCount"],
                element["strSector"]
              );
              offer.gameString = element["strGameTitle"];
              const application = new Application(
                element["intApplicationPK"],
                element["datDate"],
                element["blnAccepted"],
                element["intPlaces"]
              );
              offer.address = address;
              application.offer = offer;
              response.push(application);
            });
          })
          .catch(function (err) {
            console.log(err);
            conn.close();
          });
      })
      .catch(function (err) {
        console.log(err);
        conn.close();
      });
    return response;
  }

  async getAddressesByUser(userId: number) {
    const conn = new sql.ConnectionPool(this.dbConfig);

    const response = [];
    await conn
      .connect()
      .then(async function () {
        const req = new sql.Request(conn);

        await req
          .query(
            `SELECT
                tblAddress.intAddressPK,
                tblAddress.strCity, 
                tblAddress.strStreet,
                tblAddress.decLatitude,
                tblAddress.decLongitude
            FROM
                tblAddress
                INNER JOIN tblUser
                        ON tblUser.intAddressFK = tblAddress.intAddressPK
            WHERE
                tblUser.intUserPK = ` + userId
          )
          .then(function (recordset) {
            conn.close();
            recordset.recordset.forEach((element) => {
              const address = new Address(
                element["intAddressPK"],
                element["strStreet"],
                element["strCity"],
                element["decLatitude"],
                element["decLongitude"]
              );
              response.push(address);
            });
          })
          .catch(function (err) {
            console.log(err);
            conn.close();
          });
      })
      .catch(function (err) {
        console.log(err);
        conn.close();
      });
    return response;
  }

  async getAddressByUser(userId: number) {
    const conn = new sql.ConnectionPool(this.dbConfig);

    let response = new Address(-1, "", "", -1, -1);
    await conn
      .connect()
      .then(async function () {
        const req = new sql.Request(conn);

        await req
          .query(
            `SELECT TOP 1
                tblAddress.intAddressPK,
                tblAddress.strCity, 
                tblAddress.strStreet,
                tblAddress.decLatitude,
                tblAddress.decLongitude
            FROM
                tblAddress
                INNER JOIN tblUser
                        ON tblUser.intAddressFK = tblAddress.intAddressPK
            WHERE
                tblUser.intUserPK = ` + userId
          )
          .then(function (recordset) {
            conn.close();

            const element = recordset.recordset[0];
            response = new Address(
              element["intAddressPK"],
              element["strStreet"],
              element["strCity"],
              element["decLatitude"],
              element["decLongitude"]
            );
          })
          .catch(function (err) {
            console.log(err);
            conn.close();
          });
      })
      .catch(function (err) {
        console.log(err);
        conn.close();
      });
    return response;
  }

  async addOffer(offer: Offer) {
    const conn = new sql.ConnectionPool(this.dbConfig);

    const response = [];
    await conn
      .connect()
      .then(async function () {
        const req = new sql.Request(conn);

        await req
          .query(
            `INSERT tblOffer (intGameFK, intUserFK, strTitle, blnTransportation, intAddressFK, datDate, intPlaces, intFixPeopleCount, strSector)
            VALUES (
              ${offer.gameId},
              ${offer.userId},
              '${offer.title}',
              CONVERT(bit, 1),
              ${offer.addressId},
              GETDATE(), -- ${offer.date}
              ${offer.places},
              ${offer.peopleCount},
              '${offer.sector}'
            )`
          )
          .then(function (recordset) {
            console.log(recordset.recordset[0]);
            conn.close();
          })
          .catch(function (err) {
            console.log(err);
            response.push(err);
            conn.close();
          });
      })
      .catch(function (err) {
        console.log(err);
        response.push(err);
        conn.close();
      });
    return response;
  }

  async addApplication(application: Application) {
    const conn = new sql.ConnectionPool(this.dbConfig);

    const response = [];
    await conn
      .connect()
      .then(async function () {
        const req = new sql.Request(conn);

        await req
          .query(
            `INSERT tblApplication (intOfferFK, intUserFK, intAddressFK, datDate)
            VALUES (
              ${application.offerId},
              ${application.userId},
              ${application.addressId},
              GETDATE()
            )`
          )
          .then(function (recordset) {
            conn.close();
          })
          .catch(function (err) {
            console.log(err);
            conn.close();
          });
      })
      .catch(function (err) {
        console.log(err);
        conn.close();
      });
    return response;
  }

  async addAddress(userId: Number, address: Address) {
    console.log("AddAddress");
    const conn = new sql.ConnectionPool(this.dbConfig);

    const response = [];
    await conn
      .connect()
      .then(async function () {
        const req = new sql.Request(conn);

        const queryString = `INSERT tblAddress(strStreet, strCity, decLatitude, decLongitude)
            VALUES (
              '${address.street}',
              '${address.city}',
              ${address.latitude},
              ${address.longitude}
            )
            
            DECLARE @intAddressID int
            SELECT @intAddressID = MAX(tblAddress.intAddressPK) FROM tblAddress
            
            UPDATE tblUser
            SET
                intAddressFK = @intAddressID
            WHERE
                intUserPK = ${userId}`;
        console.log(queryString);

        await req
          .query(queryString)
          .then(function (recordset) {
            conn.close();
            console.log(recordset.recordset[0]);
          })
          .catch(function (err) {
            console.log(err);
            conn.close();
          });
      })
      .catch(function (err) {
        console.log(err);
        conn.close();
      });
    return response;
  }

  async updateAddress(address: Address) {
    console.log("UpdateAddress");
    const conn = new sql.ConnectionPool(this.dbConfig);

    const response = [];
    await conn
      .connect()
      .then(async function () {
        const req = new sql.Request(conn);

        await req
          .query(
            `UPDATE tblAddress
            SET
              strStreet = '${address.street}',
              strCity = '${address.city}',
              decLatitude = ${address.latitude},
              decLongitude = ${address.longitude}
            WHERE
              intAddressPK = ${address.id}`
          )
          .then(function (recordset) {
            conn.close();
          })
          .catch(function (err) {
            console.log(err);
            conn.close();
          });
      })
      .catch(function (err) {
        console.log(err);
        conn.close();
      });
    return response;
  }

  async getUserIdByName(name: string) {
    const conn = new sql.ConnectionPool(this.dbConfig);

    let response = new User(-1, "Logged Out");
    await conn
      .connect()
      .then(async function () {
        const req = new sql.Request(conn);

        await req
          .query(
            `SELECT
                tblUser.intUserPK,
                tblUser.intAddressFK
            FROM
                tblUser
            WHERE
                tblUser.strName = '${name}'`
          )
          .then(function (recordset) {
            conn.close();
            const element = recordset.recordset[0];
            response = new User(element["intUserPK"], name, element["intAddressFK"]);
          })
          .catch(function (err) {
            console.log(err);
            conn.close();
          });
      })
      .catch(function (err) {
        console.log(err);
        conn.close();
      });
    return response;
  }

  async replyApplication(applicationId: Number, answer: number) {
    const conn = new sql.ConnectionPool(this.dbConfig);

    let response = 0;
    await conn
      .connect()
      .then(async function () {
        const req = new sql.Request(conn);

        await req
          .query(
            `UPDATE tblApplication
            SET
              blnAccepted = ${answer}
            WHERE
              intApplicationPK = ` + applicationId
          )
          .then(function (recordset) {
            conn.close();
          })
          .catch(function (err) {
            console.log(err);
            conn.close();
          });
      })
      .catch(function (err) {
        console.log(err);
        conn.close();
      });
    return response;
  }
}

export default new DbService();
