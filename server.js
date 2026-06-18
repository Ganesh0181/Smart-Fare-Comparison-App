const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// =========================
// Health Check Route
// =========================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Smart Fare Backend Running 🚀",
    port: PORT,
  });
});

// =========================
// Helper Functions
// =========================
function getPeakHourFactor() {
  const hour = new Date().getHours();

  // Morning and evening traffic
  if ((hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 21)) {
    return 1.18;
  }

  return 1.0;
}

function getTrafficFactor(distance) {
  if (distance <= 5) return 1.05;
  if (distance <= 15) return 1.1;
  if (distance <= 35) return 1.15;
  return 1.22;
}

function getWeatherFactor(weather = "Clear") {
  const w = weather.toLowerCase();

  if (w.includes("rain")) return 1.15;
  if (w.includes("storm")) return 1.25;
  if (w.includes("fog")) return 1.1;
  if (w.includes("cloud")) return 1.05;

  return 1.0;
}

function getSurgeFactor(distance) {
  if (distance <= 5) return 1.08;
  if (distance <= 20) return 1.12;
  if (distance <= 40) return 1.15;
  return 1.2;
}

function getEta(distance, type) {
  let speed = 35;

  if (type === "Bike") speed = 34;
  if (type === "Auto") speed = 28;
  if (type === "Mini") speed = 32;
  if (type === "Prime") speed = 34;
  if (type === "Sedan") speed = 35;
  if (type === "SUV") speed = 33;

  const minutes = Math.round((distance / speed) * 60);

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  return `${h} hr ${m} min`;
}

function calculateFares(distance, weather = "Clear") {
  const d = Number(distance);

  const peakFactor = getPeakHourFactor();
  const trafficFactor = getTrafficFactor(d);
  const weatherFactor = getWeatherFactor(weather);
  const surgeFactor = getSurgeFactor(d);

  const multiplier = peakFactor * trafficFactor * weatherFactor * surgeFactor;

  const baseRides = [
    { provider: "Rapido Bike", type: "Bike", baseFare: 10, perKm: 6 },
    { provider: "Ola Bike", type: "Bike", baseFare: 15, perKm: 7 },
    { provider: "Uber Bike", type: "Bike", baseFare: 20, perKm: 8 },

    { provider: "Rapido Auto", type: "Auto", baseFare: 25, perKm: 9 },
    { provider: "Uber Auto", type: "Auto", baseFare: 30, perKm: 10 },
    { provider: "Ola Auto", type: "Auto", baseFare: 35, perKm: 11 },

    { provider: "Uber Mini", type: "Mini", baseFare: 50, perKm: 12 },
    { provider: "Ola Mini", type: "Mini", baseFare: 55, perKm: 13 },

    { provider: "Ola Prime", type: "Prime", baseFare: 75, perKm: 17 },
    { provider: "Uber Sedan", type: "Sedan", baseFare: 80, perKm: 18 },

    { provider: "Uber SUV", type: "SUV", baseFare: 120, perKm: 22 },
    { provider: "Ola SUV", type: "SUV", baseFare: 130, perKm: 23 },
  ];

  const fares = baseRides.map((ride) => {
    const normalFare = ride.baseFare + d * ride.perKm;
    const finalFare = Math.round(normalFare * multiplier);

    const surgeAmount = finalFare - Math.round(normalFare);

    return {
      provider: ride.provider,
      type: ride.type,
      baseFare: ride.baseFare,
      perKm: ride.perKm,
      normalFare: Math.round(normalFare),
      surgeAmount,
      fare: finalFare,
      eta: getEta(d, ride.type),
      factors: {
        peakHourFactor: Number(peakFactor.toFixed(2)),
        trafficFactor: Number(trafficFactor.toFixed(2)),
        weatherFactor: Number(weatherFactor.toFixed(2)),
        surgeFactor: Number(surgeFactor.toFixed(2)),
      },
    };
  });

  fares.sort((a, b) => a.fare - b.fare);

  const cheapest = fares[0];

  const fastest = [...fares].sort((a, b) => {
    const getMinutes = (eta) => {
      if (eta.includes("hr")) {
        const parts = eta.match(/\d+/g).map(Number);
        return parts[0] * 60 + (parts[1] || 0);
      }
      return Number(eta.match(/\d+/)[0]);
    };

    return getMinutes(a.eta) - getMinutes(b.eta);
  })[0];

  const recommended =
    cheapest.provider === fastest.provider ? cheapest : fares[0];

  return {
    fares,
    cheapest,
    fastest,
    recommended,
    summary: {
      distance: Number(d.toFixed(2)),
      weather,
      peakHour: peakFactor > 1,
      trafficImpact:
        trafficFactor >= 1.2
          ? "High"
          : trafficFactor >= 1.1
          ? "Medium"
          : "Low",
      expectedFareIncrease: `${Math.round((multiplier - 1) * 100)}%`,
    },
  };
}

// =========================
// Fare Estimation API
// =========================
app.post("/api/estimate", (req, res) => {
  try {
    const { distance, weather } = req.body;

    if (!distance || isNaN(distance) || Number(distance) <= 0) {
      return res.status(400).json({
        success: false,
        error: "Valid distance required",
      });
    }

    const result = calculateFares(Number(distance), weather || "Clear");

    res.json({
      success: true,
      distance: result.summary.distance,
      weather: result.summary.weather,
      trafficImpact: result.summary.trafficImpact,
      expectedFareIncrease: result.summary.expectedFareIncrease,
      cheapest: result.cheapest,
      fastest: result.fastest,
      recommended: result.recommended,
      fares: result.fares,
      summary: result.summary,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

// =========================
// Route + Fare Estimation API
// =========================
app.post("/api/route-estimate", (req, res) => {
  try {
    const { pickup, destination, distance, weather } = req.body;

    if (!pickup || !destination) {
      return res.status(400).json({
        success: false,
        error: "Pickup and destination required",
      });
    }

    if (!distance || isNaN(distance) || Number(distance) <= 0) {
      return res.status(400).json({
        success: false,
        error: "Valid distance required",
      });
    }

    const result = calculateFares(Number(distance), weather || "Clear");

    res.json({
      success: true,
      pickup,
      destination,
      distance: result.summary.distance,
      weather: result.summary.weather,
      trafficImpact: result.summary.trafficImpact,
      expectedFareIncrease: result.summary.expectedFareIncrease,
      cheapest: result.cheapest,
      fastest: result.fastest,
      recommended: result.recommended,
      fares: result.fares,
      summary: result.summary,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

// =========================
// 404 Route
// =========================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route Not Found",
  });
});

// =========================
// Start Server
// =========================
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Smart Fare Backend Running on Port ${PORT}`);
});