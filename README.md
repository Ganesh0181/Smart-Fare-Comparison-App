# 🚖 Smart Fare Comparison App

A modern fare comparison platform that helps users compare ride prices across multiple cab providers such as Uber, Ola, and Rapido in real-time.

The application calculates route distance using Google Maps APIs and provides estimated fares for different ride categories including Bike, Auto, Mini, Sedan, and SUV services.

---

## 📌 Features

### 🚗 Ride Fare Comparison
- Compare Uber, Ola, and Rapido fares
- Bike, Auto, Mini, Sedan, SUV categories
- Instant fare estimation
- Best fare recommendation
- One-click booking redirection

### 🗺️ Google Maps Integration
- Route visualization
- Source and destination selection
- Distance calculation
- Interactive map
- Real-time route rendering

### 🎨 User Interface
- Clean modern design
- Responsive layout
- Fare cards
- Best fare highlighting
- Interactive controls

---

## 🏗️ System Architecture

```text
+------------------+
|      User        |
+--------+---------+
         |
         v
+------------------+
| React Frontend   |
| (UI + Maps)      |
+--------+---------+
         |
         v
+------------------+
| Express Backend  |
| Fare Engine      |
+--------+---------+
         |
         v
+------------------+
| Google Maps API  |
| Distance Service |
+------------------+
```

---

## ⚙️ Technology Stack

### Frontend
- React.js
- JavaScript
- CSS3
- Google Maps JavaScript API

### Backend
- Node.js
- Express.js

### DevOps
- Docker
- Docker Compose

---

## 📂 Project Structure

```text
smart_fare_app/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── assets/
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

---

## 🚀 Local Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Smart-Fare-Comparison-App.git
cd Smart-Fare-Comparison-App
```

---

### 2️⃣ Backend Setup

```bash
cd backend

npm install

node server.js
```

Backend runs on:

```text
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

Open another terminal:

```bash
cd frontend

npm install

npm start
```

Frontend runs on:

```text
http://localhost:3000
```

---

## 🐳 Docker Deployment

### Build Containers

```bash
docker-compose build
```

### Start Application

```bash
docker-compose up -d
```

### View Running Containers

```bash
docker ps
```

### Stop Containers

```bash
docker-compose down
```

---

## 🌐 Application URLs

### Frontend

```text
http://localhost:3000
```

### Backend

```text
http://localhost:5000
```

---

## 📊 Fare Calculation Logic

Example fare formulas:

### Uber

```text
Bike  = 20 + Distance × 8
Mini  = 50 + Distance × 12
Sedan = 80 + Distance × 18
SUV   = 120 + Distance × 22
```

### Ola

```text
Bike  = 15 + Distance × 7
Auto  = 25 + Distance × 9
Prime = 55 + Distance × 13
Sedan = 85 + Distance × 17
SUV   = 125 + Distance × 23
```

### Rapido

```text
Bike = 10 + Distance × 6
```

---

## 📸 Sample Workflow

1. Enter Pickup Location
2. Enter Destination
3. Click Compare
4. Route is generated on Google Maps
5. Distance is calculated
6. Fare estimates are generated
7. Cheapest ride is highlighted
8. Click Book to redirect to provider website

---

## 🔥 Future Enhancements

- Live Fare APIs
- Traffic-Based Pricing
- Weather Impact Analysis
- ETA Comparison
- Fare History Analytics
- Ride Recommendations
- Dark Mode
- AI-Based Price Prediction

---

## 👨‍💻 Author

**R. Vivek**

B.Tech Computer Science and Engineering

Mahatma Gandhi Institute of Technology (MGIT)

---

## 📜 License

This project is developed for educational and learning purposes.
