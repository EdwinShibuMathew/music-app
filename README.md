# 🎵 Edwin's Music App

A full-stack web application for managing your music collection with artists, albums, and songs. Built with React, Node.js, Express, and MySQL, featuring a beautiful Tailwind CSS interface.

![Music App](https://img.shields.io/badge/Music-App-blue?style=for-the-badge&logo=music)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?style=for-the-badge&logo=mysql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- **🎤 Artist Management**: Add, edit, and organize your favorite music artists
- **💿 Album Management**: Create and manage album collections with release years and listen counts
- **🎵 Song Management**: Build your music library by adding songs to albums
- **📊 Interactive Dashboard**: Beautiful home page with quick navigation and stats
- **🎨 Modern UI**: Responsive design with Tailwind CSS
- **🔍 Data Relationships**: Proper database relationships between artists, albums, and songs
- **📱 Mobile Friendly**: Responsive design that works on all devices

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Styled Components** - CSS-in-JS (legacy components)

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MySQL2** - MySQL database driver
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Database
- **MySQL** - Relational database
- **JSON data types** - For storing lists and complex data
- **Foreign key relationships** - Proper data integrity

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/music-app-ed.git
cd music-app-ed
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Database Setup
Run the SQL script in `model.sql` to create the database tables:
```sql
-- Run the contents of model.sql in your MySQL database
```

## 🎯 Usage

### Start the Backend Server
```bash
cd backend
npm start
```
The backend will run on `http://localhost:5000`

### Start the Frontend Development Server
```bash
cd frontend
npm start
```
The frontend will run on `http://localhost:3000`

### Access the Application
Open your browser and navigate to `http://localhost:3000`

## 📚 API Endpoints

### Artists
- `GET /artists/get` - Get all artists
- `GET /artists/get/:id` - Get artist by ID
- `POST /artists/create` - Create new artist
- `PUT /artists/update/:id` - Update artist
- `DELETE /artists/delete/:id` - Delete artist

### Albums
- `GET /albums/get` - Get all albums
- `GET /albums/get/:id` - Get album by ID
- `POST /albums/create` - Create new album
- `PUT /albums/update/:id` - Update album
- `DELETE /albums/delete/:id` - Delete album

### Songs
- `GET /songs/get` - Get all songs
- `GET /songs/get/:id` - Get song by ID
- `POST /songs/create` - Create new song
- `PUT /songs/update/:id` - Update song
- `DELETE /songs/delete/:id` - Delete song

## 🎨 Features in Detail

### Artist Management
- Add artists with name, genre, and monthly listeners
- View artist statistics and information
- Browse albums and songs by artist
- Edit and delete artist records

### Album Management
- Create albums linked to specific artists
- Track release years and listen counts
- View songs within each album
- Manage album information

### Song Management
- Add songs to specific albums
- Automatic artist assignment through album relationship
- Track release years
- Edit and delete songs

### User Interface
- Modern gradient backgrounds
- Card-based layouts
- Responsive tables
- Interactive buttons with hover effects
- Mobile-friendly design
- Navigation breadcrumbs

## 🗄️ Database Schema

### Artists Table
- `artist_id` (Primary Key)
- `artist_name`
- `genre`
- `monthly_listeners`
- `albumlists` (JSON)
- `songlists` (JSON)

### Albums Table
- `album_id` (Primary Key)
- `album_name`
- `release_year`
- `num_listens`
- `artist_id` (Foreign Key)
- `songlists` (JSON)

### Songs Table
- `song_id` (Primary Key)
- `song_name`
- `release_year`
- `album_id` (Foreign Key)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Edwin**
- GitHub: @EdwinShibuMathew https://github.com/EdwinShibuMathew/

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the beautiful styling system
- MySQL team for the robust database system
- All the open-source contributors who made this possible

## 📸 Screenshots

### Home Page
Beautiful landing page with gradient backgrounds and feature cards.

### Artist Management
Comprehensive artist management with statistics and relationships.

### Album & Song Management
Intuitive interfaces for managing your music collection.

---

Made with ❤️ by Edwin
