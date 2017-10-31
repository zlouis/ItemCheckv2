CREATE database IF NOT EXSITS warehouse;
USE warehouse;

DROP TABLE IF EXISTS warehouse;

CREATE TABLE storage
(
id int NOT NULL AUTO_INCREMENT,
PRIMARY KEY(id),
link VARCHAR(255),
item VARCHAR(255),
stock VARCHAR(255)
);  