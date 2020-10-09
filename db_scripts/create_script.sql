
DROP TABLE IF EXISTS tblApplication;
DROP TABLE IF EXISTS tblOffer;
DROP TABLE IF EXISTS tblGame;
DROP TABLE IF EXISTS tblTeam;
DROP TABLE IF EXISTS tblUser2Address;
DROP TABLE IF EXISTS tblAddress;
DROP TABLE IF EXISTS tblUser;

CREATE TABLE tblUser (
	intUserPK int IDENTITY(1,1) NOT NULL,
	strName nvarchar(255) NOT NULL,
	strMail nvarchar(255) NOT NULL,
	strPassword nvarchar(255) NOT NULL,
    PRIMARY KEY (intUserPK)
)

CREATE UNIQUE INDEX tblUser_strName
ON tblUser (strName);

CREATE TABLE tblAddress (
    intAddressPK int IDENTITY(1,1) NOT NULL,
    strStreet nvarchar(255) NOT NULL,
    strCity nvarchar(255) NOT NULL,
    decLatitude decimal(3,6)  NOT NULL,
    decLongitude decimal(3,6)  NOT NULL,
    PRIMARY KEY (intAddressPK)
);

CREATE TABLE tblUser2Address (
	intUser2AddressPK int IDENTITY(1,1) NOT NULL,
    intUserFK int FOREIGN KEY REFERENCES tblUser(intUserPK),
    intAddressFK int FOREIGN KEY REFERENCES tblAddress(intAddressPK),
    PRIMARY KEY (intUser2AddressPK)
)

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
    blnTransportation bit,
    intAddressFK int FOREIGN KEY REFERENCES tblAddress(intAddressPK),
    datDate smalldatetime NOT NULL,
    intFreePlaces int,
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