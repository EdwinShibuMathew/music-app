import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import SongsModal from "./SongsModal";
import AlbumsModal from "./AlbumsModal";

const HOST_URL = process.env.REACT_APP_HOST_URL || 'http://localhost:5000';
const ARTIST_API_URL = `${HOST_URL}/artists`;

function Artist() {
  const [artists, setArtists] = useState([]); // Stores all artists
  const [form, setForm] = useState({ artist_name: '', monthly_listeners: '', genre: '' }); // Form data
  const [editingId, setEditingId] = useState(null); // Stores the ID of the artist being edited

  const [songs, setSongs] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [showSongsModal, setShowSongsModal] = useState(false);

  const [albums, setAlbums] = useState([]); 
  const [showAlbumsModal, setShowAlbumsModal] = useState(false); 

  // Fetch all artists when the component loads
  useEffect(() => {
    fetchArtists();
  }, []);

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
    if (!form.artist_name || 
    !form.monthly_listeners || !form.genre) {
      alert("Please type all required fields");
      return false;
    }
    return true;
  };

  // Create a new artist
  const createArtist = () => {
    if (!validateForm()) return;

    axios.post(`${ARTIST_API_URL}/create`, form)
      .then(response => {
        console.log(response.data);
        setForm({ artist_name: '', monthly_listeners: '', genre: '' }); // Clear form
        fetchArtists(); // Refresh artist list
      })
      .catch(error => console.error(error));
  };

  // Get artist details and fill the form for editing
  const editArtist = (id) => {
    axios.get(`${ARTIST_API_URL}/get/${id}`)
      .then(response => {
        setForm(response.data);
        setEditingId(id);
      })
      .catch(error => console.error(error));
  };

  // Update an existing artist
  const updateArtist = () => {
    if (!validateForm()) return;

    axios.put(`${ARTIST_API_URL}/update/${editingId}`, form)
      .then(response => {
        console.log(response.data);
        setForm({ artist_name: '', monthly_listeners: '', genre: '' }); // Clear form
        setEditingId(null);
        fetchArtists(); // Refresh artist list
      })
      .catch(error => console.error(error));
  };

  // Delete an artist
  const deleteArtist = (id) => {
    axios.delete(`${ARTIST_API_URL}/delete/${id}`)
      .then(response => {
        console.log(response.data);
        fetchArtists();
      }) // Refresh artist list
      .catch(error => console.error(error));
  };

  const fetchSongs = (id) => {
    const theArtist = artists.find(a => a.artist_id === id);
    setSongs(JSON.parse(theArtist.songlists || "[]"));
    setSelectedArtist(theArtist.artist_name);  
    setShowSongsModal(true);
    setShowAlbumsModal(false);
    window.scrollTo(0, 0); // Scroll Windows to to Top
  };

  const fetchAlbums = (id) => {
    const theArtist = artists.find(a => a.artist_id === id);
    setAlbums(JSON.parse(theArtist.albumlists || "[]"));
    setSelectedArtist(theArtist.artist_name); 
    setShowAlbumsModal(true);
    setShowSongsModal(false);
    window.scrollTo(0, 0); // Scroll Windows to to Top
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Artist Management System</h1>
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            ← Back to HomePage
          </Link>
        </div>

        {/* Form */}
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Add a New Artist</h2>
          <p className="text-gray-600 mb-6">
            Enter the artist details to add them to your music collection.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Artist Name</label>
              <input
                type="text"
                name="artist_name"
                placeholder="Enter artist name"
                value={form.artist_name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Listeners</label>
              <input
                type="number"
                name="monthly_listeners"
                placeholder="Enter monthly listeners"
                value={form.monthly_listeners}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
              <input
                type="text"
                name="genre"
                placeholder="Enter genre"
                value={form.genre}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="flex justify-start">
            {editingId ? (
              <button 
                onClick={updateArtist} 
                disabled={showSongsModal || showAlbumsModal}
                className="btn btn-primary mr-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Update Artist
              </button>
            ) : (
              <button 
                onClick={createArtist} 
                disabled={showSongsModal || showAlbumsModal}
                className="btn btn-success mr-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Artist
              </button>
            )}
            {editingId && (
              <button 
                onClick={() => {
                  setEditingId(null);
                  setForm({ artist_name: "", monthly_listeners: "", genre: "" });
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
            type="Artist"
            title={selectedArtist}
            songlists={songs}
            closeModal={() => setShowSongsModal(false)}
          />
        )}

        {/* Album Modal */}
        {showAlbumsModal && (
          <AlbumsModal
            type="Artist"
            title={selectedArtist}
            albumlists={albums}
            closeModal={() => setShowAlbumsModal(false)}
          />
        )}

        {/* Artist List */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Artist List</h2>
          
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Artist Name</th>
                  <th>Monthly Listeners</th>
                  <th>Genre</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {artists.map((artist) => (
                  <tr key={artist.artist_id} className="hover:bg-gray-50">
                    <td className="font-medium text-gray-900">{artist.artist_id}</td>
                    <td className="font-medium text-gray-900">{artist.artist_name}</td>
                    <td>{artist.monthly_listeners?.toLocaleString()}</td>
                    <td>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {artist.genre}
                      </span>
                    </td>
                    <td>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => editArtist(artist.artist_id)}
                          className="btn btn-primary text-sm py-1 px-2"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => deleteArtist(artist.artist_id)}
                          className="btn btn-danger text-sm py-1 px-2"
                        >
                          Delete
                        </button>
                        <button 
                          onClick={() => fetchSongs(artist.artist_id)}
                          className="btn bg-purple-600 hover:bg-purple-700 text-white text-sm py-1 px-2"
                        >
                          Songs
                        </button>
                        <button 
                          onClick={() => fetchAlbums(artist.artist_id)}
                          className="btn bg-yellow-600 hover:bg-yellow-700 text-white text-sm py-1 px-2"
                        >
                          Albums
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {artists.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No artists found. Add your first artist above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Artist;