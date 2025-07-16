import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import SongsModal from "./SongsModal";

const HOST_URL = process.env.REACT_APP_HOST_URL || 'http://localhost:5000';
const ALBUM_API_URL = `${HOST_URL}/albums`; 
const ARTIST_API_URL = `${HOST_URL}/artists`;

function Album() {
  const [albums, setAlbums] = useState([]); // Stores all albums
  const [form, setForm] = useState({ album_name: '', artist_id: '', release_year: '', num_listens: '' }); // Form data
  const [editingId, setEditingId] = useState(null); // Stores the ID of the album being edited

  const [artists, setArtists] = useState([]); // Stores all artists

  const [songs, setSongs] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [showSongsModal, setShowSongsModal] = useState(false);

  // Fetch all albums and artists when the component loads
  useEffect(() => {
    fetchAlbums();
    fetchArtists();
  }, []);

  const fetchAlbums = () => {
    axios.get(`${ALBUM_API_URL}/get`)
      .then(response => setAlbums(response.data))
      .catch(error => console.error(error));
  };

  const fetchArtists = () => {
    axios.get(`${ARTIST_API_URL}/get`)
      .then(response => setArtists(response.data))
      .catch(error => console.error(error));
  };

  // Handle input changes in the form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validate Input before Submit
  const validateForm = () => {
    if (!form.album_name || !form.artist_id || 
    !form.release_year || !form.num_listens) {
      alert("Please type all required fields");
      return false;
    }
    return true;
  };

  // Create a new album
  const createAlbum = () => {
    if (!validateForm()) return;

    axios.post(`${ALBUM_API_URL}/create`, form)
      .then(response => {
        console.log(response.data);
        setForm({ album_name: '', artist_id: '', release_year: '', num_listens: 0 }); // Clear form
        fetchAlbums(); // Refresh album list
      })
      .catch(error => console.error(error));
  };

  // Get album details and fill the form for editing
  const editAlbum = (id) => {
    axios.get(`${ALBUM_API_URL}/get/${id}`)
      .then(response => {
        setForm(response.data);
        setEditingId(id);
      })
      .catch(error => console.error(error));
  };

  // Update an existing album
  const updateAlbum = () => {
    if (!validateForm()) return;

    axios.put(`${ALBUM_API_URL}/update/${editingId}`, form)
      .then(response => {
        console.log(response.data);
        setForm({ album_name: '', artist_id: '', release_year: '', num_listens: 0 }); // Clear form
        setEditingId(null);
        fetchAlbums(); // Refresh album list
      })
      .catch(error => console.error(error));
  };

  // Delete an album
  const deleteAlbum = (id) => {
    axios.delete(`${ALBUM_API_URL}/delete/${id}`)
      .then(response => {
        console.log(response.data);
        fetchAlbums();
      }) // Refresh album list
      .catch(error => console.error(error));
  };

  const fetchSongs = (id) => {
    const theAlbum = albums.find(a => a.album_id === id);
    setSongs(JSON.parse(theAlbum.songlists || "[]"));
    setSelectedAlbum(theAlbum.album_name); 
    setShowSongsModal(true);
    window.scrollTo(0, 0); // Scroll Windows to to Top
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Album Management System</h1>
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            ← Back to HomePage
          </Link>
        </div>

        {/* Form */}
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Add a New Album</h2>
          <p className="text-gray-600 mb-6">
            Enter the album details and select the artist it belongs to.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Album Name</label>
              <input
                type="text"
                name="album_name"
                placeholder="Enter album name"
                value={form.album_name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Artist</label>
              <select
                name="artist_id"
                value={form.artist_id}
                onChange={handleChange}
                disabled={!!editingId}
                required
                className="form-select"
              >
                <option value="">Select Artist</option>
                {artists.map(artist => (
                  <option key={artist.artist_id} value={artist.artist_id}>
                    {artist.artist_name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Release Year</label>
              <input
                type="number"
                name="release_year"
                placeholder="Enter release year"
                value={form.release_year}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Listens</label>
              <input
                type="number"
                name="num_listens"
                placeholder="Enter listen count"
                value={form.num_listens}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="flex justify-start">
            {editingId ? (
              <button 
                onClick={updateAlbum} 
                disabled={showSongsModal}
                className="btn btn-primary mr-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Update Album
              </button>
            ) : (
              <button 
                onClick={createAlbum} 
                disabled={showSongsModal}
                className="btn btn-success mr-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Album
              </button>
            )}
            {editingId && (
              <button 
                onClick={() => {
                  setEditingId(null);
                  setForm({ album_name: "", artist_id: "", release_year: "", num_listens: "" });
                }}
                className="btn bg-gray-500 hover:bg-gray-600 text-white"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Song Modal */}
        {showSongsModal && (
          <SongsModal
            type="Album"
            title={selectedAlbum}
            songlists={songs}
            closeModal={() => setShowSongsModal(false)}
          />
        )}

        {/* Album List */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Album List</h2>
          
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Album Name</th>
                  <th>Artist</th>
                  <th>Release Year</th>
                  <th>Listens</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {albums.map((album) => {
                  const artist = artists.find(a => a.artist_id === album.artist_id);
                  return (
                    <tr key={album.album_id} className="hover:bg-gray-50">
                      <td className="font-medium text-gray-900">{album.album_id}</td>
                      <td className="font-medium text-gray-900">{album.album_name}</td>
                      <td>{artist?.artist_name || "Unknown Artist"}</td>
                      <td>{album.release_year}</td>
                      <td>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {album.num_listens?.toLocaleString() || 0}
                        </span>
                      </td>
                      <td>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => editAlbum(album.album_id)}
                            className="btn btn-primary text-sm py-1 px-2"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => deleteAlbum(album.album_id)}
                            className="btn btn-danger text-sm py-1 px-2"
                          >
                            Delete
                          </button>
                          <button 
                            onClick={() => fetchSongs(album.album_id)}
                            className="btn bg-purple-600 hover:bg-purple-700 text-white text-sm py-1 px-2"
                          >
                            Songs
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {albums.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No albums found. Add your first album above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Album;