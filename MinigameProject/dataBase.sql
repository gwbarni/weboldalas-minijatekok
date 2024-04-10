CREATE DATABASE IF NOT EXISTS web_minigame;
USE web_minigame;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    jrk INT DEFAULT 0,
    hsze INT DEFAULT 0,
    cld INT DEFAULT 0
);

INSERT INTO users (username, password) VALUES ('tesztFelhasznalo', 'jelszo123');
