import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">🎵 Music App</h1>
            </div>
            <div className="flex items-center space-x-8">
              <Link 
                to="/artist" 
                className="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-100"
              >
                👤 Artists
              </Link>
              <Link 
                to="/album" 
                className="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-100"
              >
                💿 Albums
              </Link>
              <Link 
                to="/song" 
                className="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-100"
              >
                🎵 Songs
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Welcome to 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"> Edwin's</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Music App</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Manage your music collection with ease. Create, edit, and organize your favorite artists, albums, and songs all in one place.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {/* Artists Card */}
            <Link to="/artist" className="group">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-6xl mb-4">👤</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Manage Artists</h3>
                <p className="text-gray-600 mb-4">
                  Add and organize your favorite music artists. Keep track of their genres and popularity.
                </p>
                <div className="text-indigo-600 font-medium group-hover:text-indigo-700">
                  Explore Artists →
                </div>
              </div>
            </Link>

            {/* Albums Card */}
            <Link to="/album" className="group">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-6xl mb-4">💿</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Browse Albums</h3>
                <p className="text-gray-600 mb-4">
                  Discover album collections, release years, and listen counts from your favorite artists.
                </p>
                <div className="text-indigo-600 font-medium group-hover:text-indigo-700">
                  View Albums →
                </div>
              </div>
            </Link>

            {/* Songs Card */}
            <Link to="/song" className="group">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-6xl mb-4">🎵</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Add Songs</h3>
                <p className="text-gray-600 mb-4">
                  Build your song library by adding tracks to albums and organizing your music collection.
                </p>
                <div className="text-indigo-600 font-medium group-hover:text-indigo-700">
                  Add Songs →
                </div>
              </div>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="mt-20 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Quick Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">🎤</div>
                <div className="text-lg font-semibold text-gray-900">Artists</div>
                <div className="text-gray-600">Manage your favorite artists</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">💽</div>
                <div className="text-lg font-semibold text-gray-900">Albums</div>
                <div className="text-gray-600">Organize album collections</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-2">🎶</div>
                <div className="text-lg font-semibold text-gray-900">Songs</div>
                <div className="text-gray-600">Build your music library</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
