import React, { useEffect, useState } from 'react';
import EvolveTable from './EvolveTable';
import { useWallet } from '../context/useWallet';

const LeaderboardPage = () => {
  const [topList, setTopList] = useState([]);
  const { account } = useWallet();


  const fetchLeaders = () => {
    // fetch("http://localhost:1299/api/evolve/top10")
    fetch("https://crypto-api-hsdj.onrender.com/api/evolve/top10")
      .then(res => res.json())
      .then(json => {
        if (json.data) setTopList(json.data);
      })
      .catch(err => console.log("Fetch error:", err));
  };

  useEffect(() => {
    fetchLeaders();
    
    // Optional: Refresh every 30 seconds to show other people's updates too
    const interval = setInterval(fetchLeaders, 10000);
    return () => clearInterval(interval);
  }, [account]);

  return <EvolveTable data={topList} title="🏆 Top 15 Leaders Board" />;
};

export default LeaderboardPage;