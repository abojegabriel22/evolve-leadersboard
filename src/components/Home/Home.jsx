import React, { useEffect, useState } from 'react';
import EvolveTable from '../EvolveTable';
import './Home.css';

const HomeComponent = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("https://crypto-api-hsdj.onrender.com/api/evolve")
      .then(res => res.json())
      .then(json => setList(json.data))
      .catch(err => console.log(err));
  }, []);

  return <EvolveTable data={list} title="All Project Holders" />;
};

export default HomeComponent;