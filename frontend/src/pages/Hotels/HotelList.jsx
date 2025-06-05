import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import HotelImage from '../../assets/images/Hotel1.jpg';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png',
});

// Reverse geocode using OpenStreetMap
const reverseGeocode = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await response.json();
    return data.address;
  } catch (err) {
    console.error('Reverse geocoding failed:', err);
    return null;
  }
};

const HotelList = () => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [locationText, setLocationText] = useState('');
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const BASE_URL = 'http://localhost:5000/api/hotels';

  const enrichHotelsWithGeocode = async (hotelList) => {
    return await Promise.all(
      hotelList.map(async (hotel) => {
        const lat = hotel.latitude ?? hotel.lat;
        const lng = hotel.longitude ?? hotel.lng;

        if (lat == null || lng == null) {
          console.warn(`Skipping hotel "${hotel.name}" due to missing coordinates.`);
          return { ...hotel, geocodedAddress: null };
        }

        const address = await reverseGeocode(lat, lng);
        return { ...hotel, geocodedAddress: address || {} };
      })
    );
  };

  const fetchHotels = async () => {
    setError('');

    if ((lat && !lng) || (!lat && lng)) {
      setError('Please enter both latitude and longitude, or use location name.');
      return;
    }

    if (!lat && !lng && !locationText) {
      setError('Please enter either latitude/longitude or location name.');
      return;
    }

    setLoading(true);

    try {
      const params = {};
      if (lat && lng) {
        params.lat = lat;
        params.lng = lng;
      } else if (locationText) {
        params.location = locationText;
      }

      const response = await axios.get(`${BASE_URL}/search`, { params });
      const rawHotels = Array.isArray(response.data?.data) ? response.data.data : [];
      const enriched = await enrichHotelsWithGeocode(rawHotels);
      setHotels(enriched);
    } catch (err) {
      setError('Failed to fetch hotels.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const defaultCenter = [20.5937, 78.9629];
  const mapCenter = hotels.length
    ? [
        hotels[0].latitude ?? hotels[0].lat ?? defaultCenter[0],
        hotels[0].longitude ?? hotels[0].lng ?? defaultCenter[1],
      ]
    : defaultCenter;

  return (
    // Outer div with fixed background image covering whole page
    <div
      className="bg-fixed bg-center bg-cover min-h-screen"
      style={{ backgroundImage: `url(${HotelImage})` }}
    >
      {/* Hero Banner - transparent bg so background image shows through */}
      <section
        className="w-full h-[80vh] flex flex-col items-center justify-center text-white text-center relative -mt-7 bg-transparent"
      >
        <div className="absolute inset-0 bg-opacity-40 z-0" />
        <div className="z-10 px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-md uppercase tracking-wide">
            Search Hotels
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-100">
            Find the best places to stay near your favorite beaches.
          </p>
        </div>
      </section>

      {/* Input Form - semi-transparent white bg for readability */}
      <div className="bg-white bg-opacity-90 shadow-lg p-6 rounded-lg mt-[-3rem] mx-auto max-w-5xl flex flex-wrap justify-center gap-4 z-10 relative">
        <input
          type="number"
          placeholder="Enter Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          className="border px-4 py-2 rounded-lg w-40"
        />
        <input
          type="number"
          placeholder="Enter Longitude"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          className="border px-4 py-2 rounded-lg w-40"
        />
        <input
          type="text"
          placeholder="Juhu Beach"
          value={locationText}
          onChange={(e) => setLocationText(e.target.value)}
          className="border px-4 py-2 rounded-lg w-60"
        />
        <button
          onClick={fetchHotels}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* Loading and Error */}
      {loading && <p className="text-center mt-6 text-white">Loading hotels...</p>}
      {error && <p className="text-center text-red-600 mt-4">{error}</p>}

      {/* Hotel List */}
      {hotels.length > 0 && (
        <div className="max-w-5xl mx-auto mt-8 px-4 bg-white bg-opacity-90 rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">Results:</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotels.map((hotel, idx) => {
              const g = hotel.geocodedAddress || {};
              const locationSnippet =
                `${g.city || g.town || g.village || ''}${g.state ? ', ' + g.state : ''}${
                  g.country ? ', ' + g.country : ''
                }` || hotel.city || 'Location not available';

              return (
                <li
                  key={hotel.hotelId || hotel._id || idx}
                  className={`p-4 rounded-lg border-l-4 ${
                    hotel.source === 'amadeus'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-green-500 bg-green-50'
                  }`}
                >
                  <h3 className="text-lg font-bold mb-1">{hotel.name}</h3>
                  <p className="text-sm mb-1">
                    <strong>Location:</strong> {locationSnippet}
                  </p>
                  <p className="text-sm mb-1">
                    <strong>Source:</strong> {hotel.source || 'N/A'}
                  </p>
                  {hotel.rating && (
                    <p className="text-sm">
                      <strong>Rating:</strong> {hotel.rating}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Map */}
          <MapContainer
            center={mapCenter}
            zoom={13}
            className="w-full h-[400px] mt-10 rounded-lg overflow-hidden"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {hotels.map((hotel, idx) => {
              const lat = hotel.latitude ?? hotel.lat;
              const lng = hotel.longitude ?? hotel.lng;
              if (lat == null || lng == null) return null;

              const address = hotel.geocodedAddress || {};
              const popupText = address.city || address.state || hotel.city || 'Unknown';

              return (
                <Marker key={hotel.hotelId || hotel._id || idx} position={[lat, lng]}>
                  <Popup>
                    <strong>{hotel.name}</strong>
                    <br />
                    {popupText}
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      )}

      {!loading && !error && hotels.length === 0 && (
        <p className="text-center mt-6 text-white">No hotels found.</p>
      )}
    </div>
  );
};

export default HotelList;
