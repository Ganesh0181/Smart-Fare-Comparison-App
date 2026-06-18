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

<img width="1536" height="1024" alt="System Architecture" src="https://github.com/user-attachments/assets/e2e4f282-6e0b-42b2-aa7e-b35e8a6dc3f8" />

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

## 📂 Project Architecture

<img width="1536" height="1024" alt="Project Architecture" src="https://github.com/user-attachments/assets/f82040bd-8979-4594-bca5-921ae53d0cf4" />

---

## 📸 Project Screenshots

### Home Page

<img width="1600" height="861" alt="Home Page" src="https://github.com/user-attachments/assets/c4f67f8e-0c9d-4515-af18-375b47a23b80" />

### Fare Comparison Results

<img width="1600" height="924" alt="Fare Comparison Results" src="https://github.com/user-attachments/assets/00a8b6a9-5220-4067-a125-ed81746fcb29" />


<img width="1600" height="945" alt="Google Map Route View" src="https://github.com/user-attachments/assets/66069840-e51c-4ab7-ae70-c562a32deb75" />

### Google Map Route View

<img width="1600" height="897" alt="Best Fare Highlight" src="https://github.com/user-attachments/assets/0c535313-7d67-4f4e-9dab-bb0070e51426" />

### Booking Redirect

<img width="1600" height="898" alt="Booking Redirect" src="https://github.com/user-attachments/assets/c7a801a3-d526-4588-90d2-29faabec4f73" />

---

## 📂 Project Structure

```text
Smart-Fare-Comparison-App/
│
├── backend/
│   ├── node_modules/
│   ├── .env
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   ├── auto.svg
│   │   │   ├── cab.svg
│   │   │   ├── ola-bike.svg
│   │   │   ├── rapido-bike.svg
│   │   │   └── uber-bike.svg
│   │   │
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   │
│   ├── Dockerfile
│   ├── package.json
│   └── package-lock.json
│
├── docker-compose.yml
└── README.md
```

---

## 🚀 Local Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Ganesh0181/Smart-Fare-Comparison-App.git
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

**S.Ganesh chary**

B.Tech Computer Science and Engineering  
Mahatma Gandhi Institute of Technology (MGIT)

---

## 📜 License

This project is developed for educational and learning purposes.
