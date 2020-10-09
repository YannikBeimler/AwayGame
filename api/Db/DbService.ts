var sql = require("mssql");

import {Game} from '../model/game';
import { Team } from '../model/team';

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
    var conn = new sql.ConnectionPool(this.dbConfig);
    
    var response = [];
    await conn
      .connect()
      .then(async function () {    
        var req = new sql.Request(conn);
    
         await req.query(
          `SELECT
            tblGame.intGamePK,
            tblGame.datDate,
            strHomeTeam = T1.intTeamPK,
            strHomeTeam = T1.strName,
            strHomeLogo = T1.strLogoPath,
            strAwayTeam = T2.intTeamPK,
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
          response = recordset.recordset
          recordset.recordset.forEach(element => {
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