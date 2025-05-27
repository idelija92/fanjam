DROP TABLE IF EXISTS song_votes; 
DROP TABLE IF EXISTS event_band; 
DROP TABLE IF EXISTS events; 
DROP TABLE IF EXISTS bands; 
DROP TABLE IF EXISTS users; 

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE bands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    genre VARCHAR(100),
    description TEXT
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    venue VARCHAR(150),
    location VARCHAR(150),
    date DATE,
    time TIME,
    type VARCHAR(50),
    setlist TEXT[]
);

CREATE TABLE event_band (
    event_id INT REFERENCES events(id) ON DELETE CASCADE,
    band_id INT REFERENCES bands(id) ON DELETE CASCADE,
    PRIMARY KEY (event_id, band_id)
);

CREATE TABLE song_votes (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    event_id INT REFERENCES events(id) ON DELETE CASCADE,
    song_title VARCHAR(255) NOT NULL,
    UNIQUE (user_id, event_id, song_title)
);

CREATE TABLE users_roles (
    user_id INT NOT NULL,
    roles VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


INSERT INTO users (username, email, password)
VALUES ('admin', 'admin@fanjam.com', '$2a$12$UpGHyhiOzs/fmGqeaZUNDOaQZVupDS7jY5UIq9qXiBfz8AwvGFwiy');

INSERT INTO users_roles (user_id, roles) VALUES (1, 'ADMIN');
