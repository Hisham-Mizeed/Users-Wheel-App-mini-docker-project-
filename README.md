# 🎡 Users Wheel App (Dockerized Fullstack Project)

A full-stack web application built using **React, Node.js, PostgreSQL, and Redis**, fully containerized with **Docker Compose**.

This application allows users to:

* 👥 View all users from the database
* ➕ Add new users
* ❌ Delete existing users
* 🎡 Spin a wheel to randomly select a user

---

## 🚀 Tech Stack

* **Frontend:** React
* **Backend:** Node.js + Express
* **Database:** PostgreSQL
* **Cache:** Redis
* **Containerization:** Docker & Docker Compose

---

## 🧠 Architecture

```
Frontend (React)
        ↓
Backend (Node.js API)
        ↓
PostgreSQL (Database)
        ↘
         Redis (Caching Layer)
```

---

## 📦 Project Structure

```
Docker_project/
│
├── backend/
│   ├── app.js
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── Dockerfile
│
├── database/
│   └── init.sql
│
├── docker-compose.yml
└── README.md
```

---

## ⚙️ How to Run the Project

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Hisham-Mizeed/Users-Wheel-App-Mini-Docker-Project.git
cd Docker_project
```

---

### 2️⃣ Run with Docker Compose

```bash
docker compose up --build
```

---

### 3️⃣ Access the Application

* 🌐 Frontend → http://localhost:3001
* 🔌 Backend API → http://localhost:3000
* 📊 Users Endpoint → http://localhost:3000/users

---

## 🔥 Features

* ✅ Fully Dockerized multi-container setup
* ✅ Backend integrated with PostgreSQL
* ✅ Redis caching for improved performance
* ✅ RESTful API (GET / POST / DELETE)
* ✅ Interactive spinning wheel UI
* ✅ Clean and scalable architecture

---

## 🧪 API Endpoints

### 📌 Get All Users

```
GET /users
```

---

### ➕ Add a User

```
POST /users
```

**Body:**

```json
{
  "name": "User Name"
}
```

---

### ❌ Delete a User

```
DELETE /users/:id
```

---

## 💾 Database Initialization

The database is automatically initialized using:

```
database/init.sql
```

This includes:

* Creating the users table
* Inserting sample data

---

## 🐳 Docker Services

* `frontend` → React app served via Nginx
* `backend` → Node.js API server
* `database` → PostgreSQL instance
* `redis` → Caching layer

---

## ⚠️ Notes

* Make sure Docker is installed and running
* Default ports used:

  * **3000** → Backend
  * **3001** → Frontend
  * **5432** → PostgreSQL
  * **6379** → Redis

---

## 🌟 Future Improvements

* 🔐 Add authentication system
* ✏️ Implement user editing feature
* 🎨 Enhance UI/UX and animations
* ☁️ Deploy to cloud platforms (AWS / Render / Vercel)
* 🔄 Add CI/CD pipeline

---

## 👨‍💻 Author

Developed by **Hisham Mizeed**

---

## ⭐ Support

If you like this project, don’t forget to give it a ⭐ on GitHub!
