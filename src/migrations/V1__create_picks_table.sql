CREATE TABLE picks
(
    id           uuid NOT NULL PRIMARY KEY,
    username         VARCHAR(255) NOT NULL,
    team_picked  VARCHAR(50) NOT NULL,
    week         INT         NOT NULL,
    season       INT  NOT NULL,
    timestamp timestamp   default current_timestamp
);
