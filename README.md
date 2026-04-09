# 🎡 Users Wheel App (Dockerized Fullstack Project)

A full-stack web application built with **React, Node.js, PostgreSQL, and Redis**, fully containerized using **Docker Compose**.

The app allows users to:

* View users from a database
* Add new users
* Delete users
* Spin a wheel 🎡 to randomly select a user

---

## 🚀 Tech Stack

* **Frontend:** React
* **Backend:** Node.js + Express
* **Database:** PostgreSQL
* **Cache:** Redis
* **Containerization:** Docker & Docker Compose

---

## 🧠 Architecture

Frontend (React) → Backend (Node.js API) → PostgreSQL (DB)
↘ Redis (Caching Layer)

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

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Hisham-Mizeed/Users-Wheel-App-Mini-Docker-Project.git
cd Docker_project
```

---

### 2️⃣ Run using Docker Compose

```bash
docker compose up --build
```

---

### 3️⃣ Access the app

* Frontend → http://localhost:3001
* Backend API → http://localhost:3000
* Users endpoint → http://localhost:3000/users

---

## 🔥 Features

* ✅ Full Dockerized environment
* ✅ Backend connected to PostgreSQL
* ✅ Redis caching for performance
* ✅ REST API (GET / POST / DELETE)
* ✅ Interactive spinning wheel UI
* ✅ Clean multi-container architecture

---

## 🧪 API Endpoints

### Get all users

```
GET /users
```

### Add user

```
POST /users
Body:
{
  "name": "User Name"
}
```

### Delete user

```
DELETE /users/:id
```

---

## 💾 Database Initialization

The database is automatically initialized using:

```
database/init.sql
```

Includes:

* Users table creation
* Sample data

---

## 🐳 Docker Services

* `frontend` → React app served with Nginx
* `backend` → Node.js API
* `database` → PostgreSQL
* `redis` → Caching layer

---

## ⚠️ Notes

* Make sure Docker is installed
* Ports used:

  * 3000 → Backend
  * 3001 → Frontend
  * 5432 → PostgreSQL
  * 6379 → Redis

---

## 🌟 Future Improvements

* Authentication system
* User editing feature
* Better UI/UX animations
* Deployment (Render / AWS / Vercel)
* CI/CD pipeline

---

## 👨‍💻 Author

Developed by **Hisham Mizeed**

---

## ⭐ If you like this project

Give it a star ⭐ on GitHub!

