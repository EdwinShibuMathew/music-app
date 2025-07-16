import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HOST_URL = process.env.REACT_APP_HOST_URL || "http://localhost:5000";
const SONG_API_URL = `${HOST_URL}/songs`;
const ALBUM_API_URL = `${HOST_URL}/albums`;
const ARTIST_API_URL = `${HOST_URL}/artists`;

function Song() {
  const [songs, setSongs] = useState([]); // Stores all songs
  const [form, setForm] = useState({
    song_name: "",
    release_year: "",
    album_id: "",
  }); // Form data
  const [editingId, setEditingId] = useState(null); // Currently editing song ID

  const [albums, setAlbums] = useState([]); // Stores all albums
  const [artists, setArtists] = useState([]); // Stores all artists

  // Fetch all songs when the component loads
  useEffect(() => {
    fetchSongs();
    fetchAlbums();
    fetchArtists();
  }, []);

  const fetchSongs = () => {
    axios
      .get(`${SONG_API_URL}/get`)
      .then((response) => setSongs(response.data))
      .catch((error) => console.error(error));
  };

  const fetchAlbums = () => {
    axios
      .get(`${ALBUM_API_URL}/get`)
      .then((response) => setAlbums(response.data))
      .catch((error) => console.error(error));
  };

  const fetchArtists = () => {
    axios
      .get(`${ARTIST_API_URL}/get`)
      .then((response) => setArtists(response.data))
      .catch((error) => console.error(error));
  };

  // Handle input changes in the form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validate Input before Submit
  const validateForm = () => {
    if (!form.song_name || !form.release_year || !form.album_id) {
      alert("Please type all required fields");
      return false;
    }
    return true;
  };

  // Create a new song
  const createSong = () => {
    if (!validateForm()) return;

    axios
      .post(`${SONG_API_URL}/create`, form)
      .then((response) => {
        console.log(response.data);
        setForm({ song_name: "", release_year: "", album_id: "" }); // Clear form
        fetchSongs(); // Refresh song list
      })
      .catch((error) => console.error(error));
  };

  // Get song details and fill the form for editing
  const editSong = (id) => {
    axios
      .get(`${SONG_API_URL}/get/${id}`)
      .then((response) => {
        setForm(response.data);
        setEditingId(id);
      })
      .catch((error) => console.error(error));
  };

  // Update an existing song
  const updateSong = () => {
    if (!validateForm()) return;

    axios
      .put(`${SONG_API_URL}/update/${editingId}`, form)
      .then((response) => {
        console.log(response.data);
        setForm({ song_name: "", release_year: "", album_id: "" }); // Clear form
        setEditingId(null);
        fetchSongs(); // Refresh song list
      })
      .catch((error) => console.error(error));
  };

  // Delete a song
  const deleteSong = (id) => {
    axios
      .delete(`${SONG_API_URL}/delete/${id}`)
      .then((response) => {
        console.log(response.data);
        fetchSongs();
      }) // Refresh song list
      .catch((error) => console.error(error));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Song Management System</h1>
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            ← Back to HomePage
          </Link>
        </div>

        {/* Form */}
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Add a New Song</h2>
          <p className="text-gray-600 mb-6">
            Enter the song details and select the album it belongs to.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Song Name</label>
              <input
                type="text"
                name="song_name"
                placeholder="Enter song name"
                value={form.song_name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Release Year</label>
              <input
                type="text"
                name="release_year"
                placeholder="Enter release year"
                value={form.release_year}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Album</label>
              <select
                name="album_id"
                value={form.album_id}
                onChange={handleChange}
                disabled={!!editingId}
                required
                className="form-select"
              >
                <option value="">Select Album (Artist)</option>
                {albums.map((album) => {
                  const artist = artists.find(
                    (ar) => ar.artist_id === album.artist_id
                  );
                  return (
                    <option key={album.album_id} value={album.album_id}>
                      {album.album_name} - {artist?.artist_name || "Unknown Artist"}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="flex justify-start">
            {editingId ? (
              <button 
                onClick={updateSong} 
                className="btn btn-primary mr-4"
              >
                Update Song
              </button>
            ) : (
              <button 
                onClick={createSong} 
                className="btn btn-success mr-4"
              >
                Add Song
              </button>
            )}
            {editingId && (
              <button 
                onClick={() => {
                  setEditingId(null);
                  setForm({ song_name: "", release_year: "", album_id: "" });
                }}
                className="btn bg-gray-500 hover:bg-gray-600 text-white"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Song List */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Song List</h2>
          
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Song Name</th>
                  <th>Release Year</th>
                  <th>Album Name</th>
                  <th>Artist Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {songs.map((song) => {
                  const album = albums.find((a) => a.album_id === song.album_id);
                  const artist = artists.find(
                    (ar) => ar.artist_id === album?.artist_id
                  );

                  return (
                    <tr key={song.song_id} className="hover:bg-gray-50">
                      <td className="font-medium text-gray-900">{song.song_id}</td>
                      <td className="font-medium text-gray-900">{song.song_name}</td>
                      <td>{song.release_year}</td>
                      <td>{album?.album_name || "Unknown"}</td>
                      <td>{artist?.artist_name || "Unknown"}</td>
                      <td>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => editSong(song.song_id)}
                            className="btn btn-primary text-sm py-1 px-2"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => deleteSong(song.song_id)}
                            className="btn btn-danger text-sm py-1 px-2"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {songs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No songs found. Add your first song above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Song;
