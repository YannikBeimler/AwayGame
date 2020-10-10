DROP VIEW IF EXISTS vieGame;
DROP VIEW IF EXISTS vieOffer;
DROP TABLE IF EXISTS tblApplication;
DROP TABLE IF EXISTS tblOffer;
DROP TABLE IF EXISTS tblGame;
DROP TABLE IF EXISTS tblTeam;
DROP TABLE IF EXISTS tblUser;
DROP TABLE IF EXISTS tblAddress;

CREATE TABLE tblAddress (
    intAddressPK int IDENTITY(1,1) NOT NULL,
    strStreet nvarchar(255) NOT NULL,
    strCity nvarchar(255) NOT NULL,
    decLatitude decimal(11, 8)  NOT NULL,
    decLongitude decimal(11, 8)  NOT NULL,
    PRIMARY KEY (intAddressPK)
);

CREATE TABLE tblUser (
	intUserPK int IDENTITY(1,1) NOT NULL,
    intAddressFK int NULL,
	strName nvarchar(255) NOT NULL,
	strMail nvarchar(255) NOT NULL,
	strPassword nvarchar(255) NOT NULL,
    PRIMARY KEY (intUserPK)
)

CREATE UNIQUE INDEX tblUser_strName
ON tblUser (strName);

CREATE TABLE tblTeam (
    intTeamPK int IDENTITY(1,1) NOT NULL,
    strName nvarchar(255) NOT NULL,
    strLogoPath nvarchar(255),
    intAddressFK int FOREIGN KEY REFERENCES tblAddress(intAddressPK),
    PRIMARY KEY (intTeamPK)
);

CREATE TABLE tblGame (
    intGamePK int IDENTITY(1,1) NOT NULL,
    datDate smalldatetime NOT NULL,
    intTeam1FK int FOREIGN KEY REFERENCES tblTeam(intTeamPK),
    intTeam2FK int FOREIGN KEY REFERENCES tblTeam(intTeamPK),
    PRIMARY KEY (intGamePK)
);

CREATE TABLE tblOffer (
    intOfferPK int IDENTITY(1,1) NOT NULL,
    intGameFK int FOREIGN KEY REFERENCES tblGame(intGamePK),
    intUserFK int FOREIGN KEY REFERENCES tblUser(intUserPK),
    strTitle nvarchar(255),
    blnTransportation bit,
    intAddressFK int FOREIGN KEY REFERENCES tblAddress(intAddressPK),
    datDate smalldatetime NOT NULL,
    intPlaces int,
    intFixPeopleCount int,
    strSector nvarchar(255),
    PRIMARY KEY (intOfferPK)
);

CREATE TABLE tblApplication (
    intApplicationPK int IDENTITY(1,1) NOT NULL,
    intOfferFK int FOREIGN KEY REFERENCES tblOffer(intOfferPK),
    intUserFK int FOREIGN KEY REFERENCES tblUser(intUserPK),
    intAddressFK int FOREIGN KEY REFERENCES tblAddress(intAddressPK),
    datDate smalldatetime NOT NULL,
    blnAccepted bit NULL,
    PRIMARY KEY (intApplicationPK)
);

CREATE VIEW vieGame AS
SELECT
    tblGame.intGamePK,
    strTitle = T1.strName + ' - ' + T2.strName
FROM
    tblGame
    INNER JOIN tblTeam AS T1
            ON T1.intTeamPK = tblGame.intTeam1FK
    INNER JOIN tblTeam AS T2
            ON T2.intTeamPK = tblGame.intTeam2FK


CREATE VIEW vieOffer AS
SELECT
    tblOffer.*,
    intFreePlaces = tblOffer.intPlaces - (
        SELECT
			COUNT(*)
		FROM
			tblApplication
		WHERE
			tblApplication.blnAccepted = 1
			AND
			tblApplication.intOfferFK = tblOffer.intOfferPK
    ),
    strUserName = tblUser.strName
FROM
    tblOffer
    INNER JOIN tblUser
            ON tblUser.intUserPK = tblOffer.intUserFK