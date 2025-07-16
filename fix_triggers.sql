-- Drop problematic triggers that use JSON functions
DROP TRIGGER IF EXISTS after_song_insert;
DROP TRIGGER IF EXISTS after_song_update;
DROP TRIGGER IF EXISTS after_song_delete;
DROP TRIGGER IF EXISTS after_album_insert;
DROP TRIGGER IF EXISTS after_album_update;
DROP TRIGGER IF EXISTS after_album_delete;
