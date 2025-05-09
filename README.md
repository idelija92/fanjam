# 🎸 FanJam

FanJam is a full-stack web application where fans and bands can connect through events.

---

## 🐳 Dockerized setup (runs backend + database in a container, frontend local)

### Requirements
- Docker + docker compose installed

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/idelija92/fanjam.git
cd fanjam
```

### 2. Start the backend and database using docker compose
```bash
cd backend
docker compose up --build
```

### 3. Start the frontend
#### In a new terminal/tab for frontend
```bash
cd ../frontend
npm install
npm start
```

---

#### Frontend: http://localhost:3000

#### Backend: http://localhost:8080

#### Database (pgAdmin): http://localhost:5050
##### Connect to the database fanjamdb using the following

```bash
Servers -> Register a server
Name: fanjamdb
Host name/address: db
```
