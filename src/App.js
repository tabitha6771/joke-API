import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [joke, setJoke] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchJoke = () => {
        setLoading(true);
        fetch('https://official-joke-api.appspot.com/random_joke')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setJoke(`${data.setup} - ${data.punchline}`);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchJoke();
    }, []);

    return (
        <div className="app">
            <h1>Joke Fetcher</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <>
                    <p className="joke">{joke}</p>
                    <button onClick={fetchJoke} className="joke-button">Tell another joke</button>
                </>
            )}
        </div>
    );
}

export default App;
