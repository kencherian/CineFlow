# CineFlow 🎬

CineFlow is a full-stack movie discovery application designed to help users find films effortlessly. It features real-time search debouncing, genre filtering, and a custom analytics engine that tracks and displays trending movie searches. 

Recently migrated from a third-party Backend-as-a-Service (Appwrite) to a fully custom MERN stack, CineFlow demonstrates scalable database design, RESTful API integration, and modern frontend rendering.

---

## ✨ Key Features
* **Intelligent Search:** Implements 500ms debouncing to minimize TMDB API calls while typing, ensuring a highly responsive and rate-limit-friendly UI.
* **Trending Metrics Engine:** A custom Node.js/Express backend that intercepts user searches, logs them to MongoDB Atlas, and aggregates the top 5 trending search terms in real-time.
* **Dynamic Content Hydration:** Merges data from our internal MongoDB database (search metrics) with the external TMDB API (posters and movie metadata) on the fly.
* **Modern UI/UX:** Fully responsive, dark-mode-first design built with Vite, React, and Tailwind CSS v4. Includes skeleton loaders for seamless state transitions.

---

## 🛠️ Tech Stack

### Frontend (Client)
* **Framework:** React.js powered by Vite
* **Styling:** Tailwind CSS v4 & PostCSS
* **State Management & Hooks:** React Hooks (`useState`, `useEffect`), `react-use` (for debouncing)
* **Hosting:** Vercel

### Backend (Server)
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB Atlas
* **ODM:** Mongoose (for schema validation and querying)
* **Hosting:** Render

### External APIs
* **TMDB API (v4):** Core engine for fetching movie metadata, posters, and genre categorizations.

---

## 🏗️ Architecture & Migration Note
**Appwrite to MERN Migration:** CineFlow's architecture was intentionally refactored to eliminate dependency on third-party BaaS platforms. By building a custom Express server and defining strict Mongoose schemas (`Search.js`), the application now maintains complete ownership over its analytics data, reducing vendor lock-in and allowing for highly optimized database queries (e.g., MongoDB `$inc` and `upsert` operations).

---

## 💻 Local Installation & Setup

### Prerequisites
* Node.js installed
* MongoDB Atlas account (or local MongoDB server)
* TMDB API Read Access Token

### 1. Clone the Repository
```bash
git clone [https://github.com/yourusername/CineFlow.git](https://github.com/yourusername/CineFlow.git)
cd CineFlow