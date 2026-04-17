import React, { useEffect, useState } from 'react';
import EvolveTable from '../EvolveTable';
import './Home.css';

const HomeComponent = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true); // Start as true
  const [error, setError] = useState(null);

  useEffect(() => {
    // setLoading(true);
    fetch("https://crypto-api-hsdj.onrender.com/api/evolve")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data from server");
        return res.json();
      })
      .then((json) => {
        setList(json.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load the leaderboard. Please try again later.");
        setLoading(false);
      });
  }, []);

  // 1. Loader State
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-white">
        <div className="text-center">
          <div className="spinner-border text-warning" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Fetching Holders Data...</p>
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-white">
        <div className="text-center bg-dark p-5 rounded shadow-lg border border-danger">
          <h3 className="text-danger">⚠️ Connection Error</h3>
          <p className>{error}</p>
          <button 
            className="btn btn-outline-light mt-3" 
            onClick={() => window.location.reload()}
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  // 3. Empty Data State
  if (list.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-white">
        <div className="text-center">
          <h4 className="text-muted">No holders found yet.</h4>
          <p>Be the first to connect your wallet!</p>
        </div>
      </div>
    );
  }

  // 4. Success State
  return <EvolveTable data={list} title="All Project Holders" />;
};

export default HomeComponent;