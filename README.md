# 🎸 FanJam

FanJam is a full-stack web application where fans and bands can connect through events, registrations, and more.

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
cp src/main/resources/application-sample.properties src/main/resources/application.properties
```
#### Edit with your db credentials
```bash
mvn spring-boot:run
```

### 3. Start the frontend
#### In a new terminal/tab for frontend
```bash
cd ../frontend
npm install
npm start
```
