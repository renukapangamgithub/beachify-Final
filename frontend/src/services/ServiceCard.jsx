import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./service-card.css";

const ServiceCard = ({ item }) => {
    const { imgUrl, title, desc } = item;
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleFetchWeather = async () => {
        if (!city) return;

        setLoading(true);
        setError('');
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9a854e360df7bb5286b609e993fba197`
            );
            setWeather(response.data);
        } catch (err) {
            setError('City not found');
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='service__item'>
            <div className="service__img">
                <img src={imgUrl} alt={title} />
            </div>
            <h5>{title}</h5>

            {title === "Calculate Weather" ? (
                <div style={{ marginTop: "10px" }}>
                    <input
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        style={{
                            padding: "6px",
                            width: "100%",
                            maxWidth: "200px",
                            marginBottom: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ccc"
                        }}
                    />
                    <button
                        onClick={handleFetchWeather}
                        style={{
                            display: "block",
                            padding: "6px 12px",
                            backgroundColor: "#0084ff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            margin: "0 auto"
                        }}
                    >
                        Check Weather
                    </button>

                    {loading && <p style={{ marginTop: "10px" }}>Loading...</p>}
                    {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
                    {weather && (
                        <p style={{ marginTop: "10px" }}>
                            {weather.name}: {weather.main.temp}°C, {weather.weather[0].description}
                        </p>
                    )}
                </div>
            ) : title === "Best Tour Guide" ? (
                <div>
                    <p>{desc}</p>
                    <button
                        onClick={() => navigate('/plan-trip/tours')}
                        style={{
                            padding: "6px 12px",
                            backgroundColor: "#28a745",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            marginTop: "10px"
                        }}
                    >
                        Explore Tours
                    </button>
                </div>
            ) : (
                <p>{desc}</p>
            )}
        </div>
    );
};

export default ServiceCard;
