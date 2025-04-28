# 🎸 FanJam

FanJam is a full-stack web application where fans and bands can connect through events.

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/idelija92/fanjam.git
cd fanjam
```

### 2. Start the backend
```bash
cd backend
mvn spring-boot:run
```
#### Edit with your db credentials
```bash
cp src/main/resources/application-sample.properties src/main/resources/application.properties
```

### 3. Start the frontend
#### In a new terminal/tab for frontend
```bash
cd ../frontend
npm install
npm start
```

---

## Dockerized setup (runs backend + database in a container, frontend local)

### Requirements
- Docker + docker compose installed

### Quick Start
```bash
git clone https://github.com/idelija92/fanjam.git
cd fanjam
docker compose up --build
```
#### Frontend: http://localhost:3000

#### Backend: http://localhost:8080

#### Database (pgAdmin): http://localhost:5050
