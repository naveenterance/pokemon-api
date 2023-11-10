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
  const [types, setType] = useState([]);
  const [stats, setStats] = useState([]);
  const [divContent, setDivContent] = useState(
    Math.floor(Math.random() * 1000) + 1
  );

  const fetchInfo = async (a) => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + a);
    const data = await response.json();
    setProperties(data);
    const pAbilities = data.abilities.map((ability) => ability.ability.name);
    const pTypes = data.types.map((type) => type.type.name);
    setType(pTypes);
    setAbilities(pAbilities);
    setStats(data.stats);
  };

  fetchInfo(divContent);
  const mouse = () => {
    setDivContent(Math.floor(Math.random() * 10) + 1);
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
              "https://img.pokemondb.net/artwork/large/" + item.name + ".jpg"
            }
            width="50"
            height="50"
          />
          <img
            src={
              "https://img.pokemondb.net/sprites/black-white/anim/shiny/" +
              item.name +
              ".gif"
            }
            onError={(i) => (i.target.style.display = "none")}
          />
        </span>
      </>
    );
  };

  return (
    <>
      <div className="float-right">
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
      <div>
        <h1>Data:</h1>

        {[properties].map((item) => (
          <figure>
            {" "}
            <img
              src={
                "https://img.pokemondb.net/artwork/large/" +
                item?.species?.name +
                ".jpg"
              }
              width="100"
              height="100"
            />
            <img
              src={
                "https://img.pokemondb.net/sprites/black-white/anim/shiny/" +
                item?.species?.name +
                ".gif"
              }
              onError={(i) => (i.target.style.display = "none")}
            />
            <h1>{item?.species?.name}</h1>
          </figure>
        ))}

        <div>
          <h2>Abilities</h2>
          <ul>
            {abilities.map((ability) => (
              <li key={ability}>{ability}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>type</h2>
          <ul>
            {types.map((type) => (
              <li key={type}>{type}</li>
            ))}
          </ul>
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
