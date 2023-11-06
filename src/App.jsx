import "./App.css";

import React, { useState, useEffect } from "react";

import { useRef } from "react";

const SearchElement = () => {
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon/?limit=100"
        );
        const jsonData = await response.json();
        setName(jsonData.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    const searchTerm = searchRef.current.value;
    const divElement = document.getElementById("pokeList");
    const foundElement = divElement.querySelector(`[data-key="${searchTerm}"]`);
    const [name, setName] = useState([]);

    if (foundElement) {
      // Found the element
      console.log(foundElement);
    } else {
      // Element not found
      console.log("Element not found.");
    }
  };

  return (
    <>
      <div>
        <input type="text" ref={searchRef} />
        <button onClick={handleSearch}>Search</button>

        <div id="myDiv">
          <div data-key="dun">Element 1</div>
          <div data-key="element2">Element 2</div>
          <div data-key="element3">Element 3</div>
        </div>
      </div>
    </>
  );
};

//oldcode from here on
// --------------
// --------------
// --------------

const App = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState([]);
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    const fetchAbilities = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/2");
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
      const response = await fetch(" https://pokeapi.co/api/v2/pokemon/2");
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon/?limit=100"
        );
        const jsonData = await response.json();
        setName(jsonData.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div>
        <h1>Search</h1>

        <h1>Data:</h1>
        <ul>
          {[data].map((item) => (
            <li>{item?.species?.url}</li>
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
        <div id="pokeList">
          <h1>Names</h1>
          {name.map((item) => (
            <div key={item.name}>
              <h3>{item.name}</h3>
              <p>{item.url}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchElement;
