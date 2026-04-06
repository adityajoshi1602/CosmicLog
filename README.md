# 🌌 CosmicLog

**CosmicLog** is a full-stack MERN application built for astronomy enthusiasts, stargazers, and astrophotographers. It provides a community-driven platform to log celestial sightings, upload photographic evidence, and stay updated with the latest discoveries using the official NASA API.

---

## ✨ Features

- **Secure Authentication:** User registration and login utilizing JSON Web Tokens (JWT) stored securely in HTTP-only cookies.
- **Log Celestial Sightings:** Create detailed posts about astronomical observations, including the celestial object, location, and date.
- **Image Uploads:** Seamlessly upload astrophotography and evidence using **ImageKit.io** integration via `multipart/form-data`.
- **NASA APOD Integration:** A dynamic home page featuring NASA's Astronomy Picture of the Day (supports both images and embedded videos).
- **Trending in the Cosmos:** A dedicated discovery page that randomly selects trending space topics (e.g., James Webb, Supernova, Exoplanets) and fetches live data from the **NASA Image and Video Library API**.
- **Responsive UI:** A beautiful, dark-themed, space-inspired user interface built with React and Tailwind CSS.

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS (Styling)
- React Router DOM (Navigation)
- Axios (HTTP client with interceptors & credentials configured)
- Context API (State management for Authentication)

### Backend
- Node.js & Express.js
- MongoDB & Mongoose (Database & Schemas)
- JSON Web Tokens (JWT) & bcryptjs (Security & Auth)
- Cookie-Parser (Handling HTTP-only cookies)
- Multer / ImageKit (Image processing & cloud storage)

### External APIs
- [NASA Open APIs](https://api.nasa.gov/) (APOD & Image/Video Library)

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
- Node.js installed
- MongoDB installed locally or a MongoDB Atlas cluster URI
- An [ImageKit.io](https://imagekit.io/) account for image hosting

---

## 1. Clone the Repository

```bash
git clone https://github.com/yourusername/cosmiclog.git
cd cosmiclog
```



2. Backend Setup
```
cd backend
npm install
```
Create a .env file in the root of the backend folder and add:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```
# ImageKit Credentials
```
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=your_url_endpoint
```
Start the backend server:
```
npm run dev
```
3. Frontend Setup
```
cd frontend
npm install
```
Create a .env file in the root of the frontend folder:
```
VITE_API_URL=http://localhost:5000/api
```
Start the Vite development server:
```
npm run dev
```
Frontend will run at:

http://localhost:5173
🔑 Key Architectural Decisions
Cookie-Based Auth

To prevent XSS attacks, JWTs are not stored in localStorage. Instead, the backend issues an httpOnly cookie upon login, and the frontend Axios instance is configured with:

withCredentials: true

This ensures cookies are sent securely with every request.

## 📦 Multipart Form Data

When creating a post, both text data and image files are packaged using the browser’s native `FormData` API. This allows the backend to efficiently process structured data and file uploads within a single request.

---

## 🛣️ API Endpoints Reference

### Authentication (`/api/auth`)
- `POST /register` → Register a new user  
- `POST /login` → Authenticate user and receive an HTTP-only cookie  
- `POST /logout` → Clear authentication cookie  

### Posts / Logs (`/api/post`)
- `GET /` → Fetch all community logs  
- `POST /create` → Create a new log (requires authentication)  

### NASA Integration (`/api/nasa`)
- `GET /apod` → Fetch Astronomy Picture of the Day  
- `GET /apod//trending` → Fetch random trending topic data from NASA Image & Video Library  

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

### Steps to Contribute

Fork the repository  
Create a new feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
Commit your changes:
```
git commit -m "Add some AmazingFeature"
```
Push to your branch:
```
git push origin feature/AmazingFeature
```
Open a Pull Request

“Look up at the stars and not down at your feet.”
— Stephen Hawking


If you want a stronger GitHub-ready version next, the logical upgrade is adding badges, screenshots, and a deployed demo link.
