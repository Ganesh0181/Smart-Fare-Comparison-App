import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const API_URL = "http://localhost:5000";

function App() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [fares, setFares] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const pickupRef = useRef(null);
  const destinationRef = useRef(null);

  useEffect(() => {
    if (!window.google || !window.google.maps) {
      console.log("Google Maps not loaded");
      return;
    }

    if (mapInstanceRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 12,
      center: { lat: 17.385044, lng: 78.486671 },
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    mapInstanceRef.current = map;

    const directionsRenderer = new window.google.maps.DirectionsRenderer({
      suppressMarkers: false,
      polylineOptions: { strokeWeight: 5 },
    });

    directionsRenderer.setMap(map);
    directionsRendererRef.current = directionsRenderer;

    if (window.google.maps.places) {
      const pickupAuto = new window.google.maps.places.Autocomplete(
        pickupRef.current
      );

      pickupAuto.addListener("place_changed", () => {
        const place = pickupAuto.getPlace();
        setPickup(place.formatted_address || place.name || "");
      });

      const destAuto = new window.google.maps.places.Autocomplete(
        destinationRef.current
      );

      destAuto.addListener("place_changed", () => {
        const place = destAuto.getPlace();
        setDestination(place.formatted_address || place.name || "");
      });
    }
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current && window.google) {
      setTimeout(() => {
        window.google.maps.event.trigger(mapInstanceRef.current, "resize");
      }, 300);
    }
  }, [isMapExpanded]);

  const handleCompare = () => {
    if (!pickup.trim() || !destination.trim()) {
      alert("Enter pickup and destination");
      return;
    }

    if (!window.google || !window.google.maps) {
      alert("Google Maps not loaded");
      return;
    }

    setLoading(true);
    setFares([]);
    setDistance(null);
    setDuration("");

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: pickup,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      async (result, status) => {
        if (status !== "OK") {
          setLoading(false);
          alert("Route error. Please check locations.");
          return;
        }

        directionsRendererRef.current.setDirections(result);

        const leg = result.routes[0].legs[0];
        let kmDistance = leg.distance.value / 1000;

        // Demo correction for two-wheeler route style
        kmDistance = kmDistance * 0.49;

        setDistance(kmDistance.toFixed(2));
        setDuration(leg.duration.text);

        try {
          const res = await fetch(`${API_URL}/api/estimate`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ distance: kmDistance }),
          });

          const data = await res.json();

          console.log("API Response:", data);

          if (!res.ok) {
            alert(data.error || "Backend error");
            return;
          }

          setFares(Array.isArray(data) ? data : data.fares || []);
        } catch (err) {
          console.error(err);
          alert("Backend server error. Check port 5000.");
        } finally {
          setLoading(false);
        }
      }
    );
  };

  const handleBooking = (ride) => {
    alert(`Booking confirmed!\n${ride.provider} - ₹${ride.fare}`);

    if (ride.provider.includes("Uber")) {
      window.open("https://m.uber.com/", "_blank");
    } else if (ride.provider.includes("Ola")) {
      window.open("https://www.olacabs.com/", "_blank");
    } else if (ride.provider.includes("Rapido")) {
      window.open("https://rapido.bike/", "_blank");
    }
  };

  const getIcon = (provider) => {
    if (provider.includes("Bike")) return "🏍️";
    if (provider.includes("Auto")) return "🛺";
    if (provider.includes("SUV") || provider.includes("Prime")) return "🚙";
    return "🚗";
  };

  const best =
    fares.length > 0
      ? fares.reduce((min, curr) => (curr.fare < min.fare ? curr : min))
      : null;

  return (
    <div className="app">
      <div
        className={`map ${isMapExpanded ? "expanded" : "collapsed"}`}
        onClick={() => setIsMapExpanded(true)}
      >
        <div ref={mapRef} className="map-inner"></div>
      </div>

      {isMapExpanded && (
        <button
          className="close-map"
          onClick={(e) => {
            e.stopPropagation();
            setIsMapExpanded(false);
          }}
        >
          ← Back
        </button>
      )}

      <div className="card">
        <h2 className="title">🚗 Smart Fare</h2>

        <input
          ref={pickupRef}
          className="input"
          placeholder="Pickup location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
        />

        <input
          ref={destinationRef}
          className="input"
          placeholder="Drop location"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <button className="btn" onClick={handleCompare} disabled={loading}>
          {loading ? "Comparing..." : "Compare"}
        </button>

        {distance && (
          <p className="distance">
            Distance: <b>{distance} km</b>
            {duration && (
              <>
                {" "}
                | Time: <b>{duration}</b>
              </>
            )}
          </p>
        )}

        {fares.length > 0 && (
          <div className="results">
            <h3>Fare Comparison</h3>

            {fares.map((item, i) => {
              const isBest = best && item.provider === best.provider;

              return (
                <div key={i} className={`fare ${isBest ? "best" : ""}`}>
                  <div className="ride-left">
                    <span className="vehicle-emoji">
                      {getIcon(item.provider)}
                    </span>

                    <div className="ride-text">
                      <div className="ride-name">{item.provider}</div>
                      <div className="ride-price">₹{item.fare}</div>
                    </div>
                  </div>

                  <div className="ride-actions">
                    <button
                      className="book-btn"
                      onClick={() => handleBooking(item)}
                    >
                      Book
                    </button>

                    {isBest && <span className="badge">🏆 Best</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;