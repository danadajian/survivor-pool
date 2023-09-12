CREATE TABLE picks
(
    id        SERIAL PRIMARY KEY,
    user_id VARCHAR(10)  NOT NULL,
    team_picked VARCHAR(10)  NOT NULL,
    week INT  NOT NULL
);
