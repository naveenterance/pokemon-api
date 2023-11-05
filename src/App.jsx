import "./App.css";

import React, { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    const fetchAbilities = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
      const data = await response.json();
      const dittoAbilities = data.abilities.map(
        (ability) => ability.ability.name
      );
      setAbilities(dittoAbilities);
    };

    fetchAbilities();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(" https://pokeapi.co/api/v2/pokemon/ditto");
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, []);
  return (
    <div>
      <h1>Data:</h1>
      <ul>
        {[data].map((item) => (
          <>
            <li>{item?.species?.url}</li>
          </>
        ))}
      </ul>
      {abilities.length === 0 ? (
        <p>Loading abilities...</p>
      ) : (
        <ul>
          {abilities.map((ability) => (
            <li key={ability}>{ability}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
