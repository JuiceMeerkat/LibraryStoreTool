/* This is just for future reference, when writing a data dictionary, some other kind of planning (even if it happened to come after acutally coding it this time) or just typing up the project for the ARKWRIGHT project phase (you probably won't even get there anyways.*/

CREATE TABLE users (
	userId SERIAL NOT NULL,
	username VARCHAR(100) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	password VARCHAR NOT NULL,
	role TEXT NOT NULL CHECK ( role IN ('operator', 'admin', 'user')),
	created_at TIMESTAMP DEFAULT NOW(),
	PRIMARY KEY (userId)
)