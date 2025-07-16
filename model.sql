-- Delete tables to avoid foreign key conflicts
DROP TABLE IF EXISTS Song;
DROP TABLE IF EXISTS Album;
DROP TABLE IF EXISTS Artist;

-- Create Artist table
CREATE TABLE Artist (
    artist_id INT AUTO_INCREMENT PRIMARY KEY,
    artist_name VARCHAR(255) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    albumlists JSON DEFAULT NULL,
    songlists JSON DEFAULT NULL,
    monthly_listeners INT DEFAULT 0
);

-- Create Album table
CREATE TABLE Album (
    album_id INT AUTO_INCREMENT PRIMARY KEY,
    album_name VARCHAR(255) NOT NULL,
    release_year INT NOT NULL,
    num_listens INT DEFAULT 0,
    songlists JSON DEFAULT NULL,
    artist_id INT NOT NULL,
    FOREIGN KEY (artist_id) REFERENCES Artist(artist_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create Song table
CREATE TABLE Song (
    song_id INT AUTO_INCREMENT PRIMARY KEY,
    song_name VARCHAR(255) NOT NULL,
    release_year INT NOT NULL,
    album_id INT NOT NULL,
    FOREIGN KEY (album_id) REFERENCES Album(album_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Trigger to update Artist's albumlists after inserting an Album
DELIMITER $$
CREATE TRIGGER after_album_insert
AFTER INSERT ON Album
FOR EACH ROW
BEGIN
    UPDATE Artist
    SET albumlists = JSON_ARRAY_APPEND(
        COALESCE(albumlists, JSON_ARRAY()),
        '$',
        JSON_OBJECT(
            'album_id', NEW.album_id,
            'album_name', NEW.album_name,
            'release_year', NEW.release_year,
            'num_listens', NEW.num_listens
        )
    )
    WHERE artist_id = NEW.artist_id;
END;
$$
DELIMITER ;

-- Trigger to update Artist's albumlists after updating an Album
DELIMITER $$
CREATE TRIGGER after_album_update
AFTER UPDATE ON Album
FOR EACH ROW
BEGIN
    UPDATE Artist
    SET albumlists = JSON_SET(
        albumlists,
        CONCAT('$[', JSON_UNQUOTE(JSON_SEARCH(albumlists, 'one', NEW.album_id, NULL, '$[*].album_id')), '].album_name'),
        NEW.album_name,
        CONCAT('$[', JSON_UNQUOTE(JSON_SEARCH(albumlists, 'one', NEW.album_id, NULL, '$[*].album_id')), '].release_year'),
        NEW.release_year,
        CONCAT('$[', JSON_UNQUOTE(JSON_SEARCH(albumlists, 'one', NEW.album_id, NULL, '$[*].album_id')), '].num_listens'),
        NEW.num_listens
    )
    WHERE artist_id = NEW.artist_id;
END;
$$
DELIMITER ;

-- Trigger to update Artist's and Album's songlists after inserting a Song
DELIMITER $$
CREATE TRIGGER after_song_insert
AFTER INSERT ON Song
FOR EACH ROW
BEGIN
    UPDATE Album
    SET songlists = JSON_ARRAY_APPEND(
        COALESCE(songlists, JSON_ARRAY()),
        '$',
        JSON_OBJECT(
            'song_id', NEW.song_id,
            'song_name', NEW.song_name,
            'release_year', NEW.release_year
        )
    )
    WHERE album_id = NEW.album_id;

    UPDATE Artist
    SET songlists = JSON_ARRAY_APPEND(
        COALESCE(songlists, JSON_ARRAY()),
        '$',
        JSON_OBJECT(
            'song_id', NEW.song_id,
            'song_name', NEW.song_name,
            'release_year', NEW.release_year
        )
    )
    WHERE artist_id = (SELECT artist_id FROM Album WHERE album_id = NEW.album_id);
END;
$$
DELIMITER ;

-- Trigger to update Artist's and Album's songlists after updating a Song
DELIMITER $$
CREATE TRIGGER after_song_update
AFTER UPDATE ON Song
FOR EACH ROW
BEGIN
    UPDATE Album
    SET songlists = JSON_REPLACE(
        songlists,
        CONCAT('$[', JSON_UNQUOTE(JSON_SEARCH(songlists, 'one', OLD.song_id, NULL, '$[*].song_id')), '].song_name'),
        NEW.song_name,
        CONCAT('$[', JSON_UNQUOTE(JSON_SEARCH(songlists, 'one', OLD.song_id, NULL, '$[*].song_id')), '].release_year'),
        NEW.release_year
    )
    WHERE album_id = NEW.album_id;

    UPDATE Artist
    SET songlists = JSON_REPLACE(
        songlists,
        CONCAT('$[', JSON_UNQUOTE(JSON_SEARCH(songlists, 'one', OLD.song_id, NULL, '$[*].song_id')), '].song_name'),
        NEW.song_name,
        CONCAT('$[', JSON_UNQUOTE(JSON_SEARCH(songlists, 'one', OLD.song_id, NULL, '$[*].song_id')), '].release_year'),
        NEW.release_year
    )
    WHERE artist_id = (SELECT artist_id FROM Album WHERE album_id = NEW.album_id);
END;
$$
DELIMITER ;

-- Insert sample data for Artists, Albums, and Songs
INSERT INTO Artist (artist_name, genre, monthly_listeners) VALUES
('Taylor Swift', 'Pop', 85000000),
('Eminem', 'Hip-Hop', 55000000),
('The Beatles', 'Rock', 62000000),
('Beyoncé', 'R&B', 47000000),
('Drake', 'Hip-Hop', 65000000),
('Ed Sheeran', 'Pop', 70000000);

INSERT INTO Album (album_name, release_year, num_listens, artist_id) VALUES
('1989', 2014, 50000000, 1),
('Reputation', 2017, 45000000, 1),
('Lover', 2019, 40000000, 1);

INSERT INTO Song (song_name, release_year, album_id) VALUES
('Style', 2014, 1),
('Blank Space', 2014, 1),
('I Did Something Bad', 2017, 2);
