
DELETE FROM tblApplication;
DELETE FROM tblOffer;
DELETE FROM tblGame;
DELETE FROM tblTeam;
DELETE FROM tblAddress;
DELETE FROM tblUser;

INSERT tblUser VALUES('yb fan', 'ybfan@bern.ch', 'password')
INSERT tblUser VALUES('offer 1', 'a', 'password')
INSERT tblUser VALUES('offer 2', 'a', 'password')
INSERT tblUser VALUES('offer 3', 'a', 'password')
INSERT tblUser VALUES('request 1', 'a', 'password')
INSERT tblUser VALUES('request 2', 'a', 'password')
INSERT tblUser VALUES('request 3', 'a', 'password')

INSERT tblAddress VALUES('Papiermühlestrasse 71', 'Bern', 46.963097, 7.464860)
INSERT tblAddress VALUES('St. Jakobs-Strasse 400', '4052 Basel', 47.541397, 7.620335)
INSERT tblAddress VALUES('Zürcherstrasse 464', '9015 St. Gallen', 47.408457, 9.305782)
INSERT tblAddress VALUES('Route des Plaines-du-Loup 7', '1018 Lausanne', 46.5330135,6.6196132)
INSERT tblAddress VALUES('Via Trevano 100', '6900 Lugano', 46.0241319,8.9586046)
INSERT tblAddress VALUES('Route des Jeunes 16', '1212 Lancy', 46.1778456,6.1252683)
INSERT tblAddress VALUES('Rue des Echutes 38', '1950 Sion', 46.2333545,7.3737172)
INSERT tblAddress VALUES('Horwerstrasse 91', '6005 Luzern', 47.0311916,8.3033145)
INSERT tblAddress VALUES('Lettstrasse 74', '9490 Vaduz', 47.1404862,9.5089209)
INSERT tblAddress VALUES('Badenerstrasse 500', '8048 Zürich', 47.3829834,8.5027308)
INSERT tblAddress VALUES('OfferAdresse 1', 'Bern', 47.408457, 9.305782)
INSERT tblAddress VALUES('OfferAdresse 2', 'Bern', 47.408457, 9.305782)
INSERT tblAddress VALUES('OfferAdresse 3', 'Bern', 47.408457, 9.305782)
INSERT tblAddress VALUES('RequestAdresse 1', 'Bern', 47.408457, 9.305782)

INSERT tblUser2Address VALUES(2, 11)
INSERT tblUser2Address VALUES(3, 12)
INSERT tblUser2Address VALUES(4, 13)

INSERT tblTeam VALUES('BSC Young Boys', '', 1)
INSERT tblTeam VALUES('FC Basel 1893', '', 2)
INSERT tblTeam VALUES('FC St.Gallen 1879', '', 3)
INSERT tblTeam VALUES('FC Lausanne-Sport', '', 4)
INSERT tblTeam VALUES('FC Lugano', '', 5)
INSERT tblTeam VALUES('Servette FC', '', 6)
INSERT tblTeam VALUES('FC Sion', '', 7)
INSERT tblTeam VALUES('FC Luzern', '', 8)
INSERT tblTeam VALUES('FC Vaduz', '', 9)
INSERT tblTeam VALUES('FC Zürich', '', 10)

INSERT tblGame VALUES('20201017 19:00', 6, 1)
INSERT tblGame VALUES('20201025 16:00', 1, 8)
INSERT tblGame VALUES('20201101 16:00', 5, 1)
INSERT tblGame VALUES('20201108 16:00', 1, 3)
INSERT tblGame VALUES('20201129 16:00', 4, 1)

INSERT tblOffer VALUES(1, 2, CONVERT(bit, 1), 11, '20201017 16:00', 2)
INSERT tblOffer VALUES(1, 2, CONVERT(bit, 1), 12, '20201017 16:00', 1)

INSERT tblApplication VALUES(1, 5, 14, '20201017 16:30', NULL)