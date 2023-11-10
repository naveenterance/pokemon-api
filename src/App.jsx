import React, { useState, useEffect } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

function t(url = "") {
  const truncatedUrl = url.split("/")[6];

  return truncatedUrl;
}

const App = () => {
  // note: the id field is mandatory
  const [items, setItems] = useState([]);
  const [properties, setProperties] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [stats, setStats] = useState([]);
  const [divContent, setDivContent] = useState(
    Math.floor(Math.random() * 1000) + 1
  );

  const fetchInfo = async (a) => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + a);
    const data = await response.json();
    setProperties(data);
    const pAbilities = data.abilities.map((ability) => ability.ability.name);
    setAbilities(pAbilities);
    setStats(data.stats);
  };

  fetchInfo(divContent);
  const mouse = () => {
    setDivContent(Math.floor(Math.random() * 1000) + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon/?limit=20000"
        );
        const jsonData = await response.json();
        setItems(jsonData.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <>
        <span
          key={item.url}
          style={{ display: "block", textAlign: "left" }}
          onMouseEnter={() => setDivContent(t(item.url))}
        >
          {item.name}
          <img
            src={
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
              t(item.url) +
              ".png"
            }
            alt="no img"
          />
        </span>
      </>
    );
  };

  return (
    <>
      <div>
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
          />
        </div>
      </div>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <h1>Data:</h1>

        {[properties].map((item) => (
          <figure>
            {" "}
            <img
              className="w-32 h-32"
              src={
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                t(item?.species?.url) +
                ".png"
              }
              alt="no img"
            />
          </figure>
        ))}

        <div>
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
        </div>
        <div>
          <h1>Stats</h1>
          {stats.map((stat) => (
            <div key={stat.stat.name}>
              <p>
                {stat.stat.name}: {stat.base_stat}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
