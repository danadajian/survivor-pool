CREATE TABLE picks
(
    id        SERIAL PRIMARY KEY,
    home_team VARCHAR(10)  NOT NULL,
    away_team VARCHAR(10)  NOT NULL,
    date      DATE         NOT NULL,
    winner    HOME_OR_AWAY NULL
);
