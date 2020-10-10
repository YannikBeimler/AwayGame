
DELETE FROM tblApplication;
DELETE FROM tblOffer;
DELETE FROM tblGame;
DELETE FROM tblTeam;
DELETE FROM tblUser;
DELETE FROM tblAddress;

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
INSERT tblAddress VALUES('RequestAdresse 2', 'Bern', 47.408457, 9.305782)
INSERT tblAddress VALUES('RequestAdresse 3', 'Bern', 47.408457, 9.305782)

INSERT tblUser VALUES(NULL, 'ybfan', 'ybfan@bern.ch', '')
INSERT tblUser VALUES(11, 'offer1', 'a', '')
INSERT tblUser VALUES(12, 'offer2', 'a', '')
INSERT tblUser VALUES(13, 'offer3', 'a', '')
INSERT tblUser VALUES(14, 'request1', 'a', '')
INSERT tblUser VALUES(15, 'request2', 'a', '')
INSERT tblUser VALUES(16, 'request3', 'a', '')

INSERT tblTeam VALUES('BSC Young Boys', 'yb.png', 1)
INSERT tblTeam VALUES('FC Basel 1893', 'fcbasel.png', 2)
INSERT tblTeam VALUES('FC St.Gallen 1879', 'fcstgallen.png', 3)
INSERT tblTeam VALUES('FC Lausanne-Sport', 'lausanne.png', 4)
INSERT tblTeam VALUES('FC Lugano', 'fclugano.png', 5)
INSERT tblTeam VALUES('Servette FC', 'servettefc.png', 6)
INSERT tblTeam VALUES('FC Sion', 'fcsion.png', 7)
INSERT tblTeam VALUES('FC Luzern', 'fcluzern.png', 8)
INSERT tblTeam VALUES('FC Vaduz', 'fcvaduz.png', 9)
INSERT tblTeam VALUES('FC Zürich', 'fczuerich.png', 10)

INSERT tblGame VALUES('20201017 19:00', 6, 1)
INSERT tblGame VALUES('20201025 16:00', 1, 8)
INSERT tblGame VALUES('20201101 16:00', 5, 1)
INSERT tblGame VALUES('20201108 16:00', 1, 3)
INSERT tblGame VALUES('20201129 16:00', 4, 1)

INSERT tblOffer VALUES(1, 2, 'Zusammen nach Genf', CONVERT(bit, 1), 11, '20201017 16:00', 2, 0, 'B13')
INSERT tblOffer VALUES(2, 2, 'Sportwagen', CONVERT(bit, 1), 12, '20201025 12:00', 1, 0, 'B13')
INSERT tblOffer VALUES(2, 3, 'Kleinbus', CONVERT(bit, 1), 12, '20201025 13:00', 4, 3, 'C4')

INSERT tblApplication VALUES(1, 5, 14, '20201017 16:30', NULL)
