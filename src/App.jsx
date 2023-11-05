import "./App.css";

import React, { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState([]);
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=20000"
      );
      const jsonData = await response.json();
      setName(jsonData.results);
    } catch (error) {
      console.log(error);
    }
  };

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
      <h1>abilities</h1>
      {abilities.length === 0 ? (
        <p>Loading abilities...</p>
      ) : (
        <ul>
          {abilities.map((ability) => (
            <li key={ability}>{ability}</li>
          ))}
        </ul>
      )}
      <h1>Names</h1>
      {name.map((item) => (
        <div key={item.name}>
          <h3>{item.name}</h3>
          <p>{item.url}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
