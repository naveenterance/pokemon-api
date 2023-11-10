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
          onHover={() => setDivContent(t(item.url))}
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
            // onError={(i) => (i.target.style.display = "none")}
          />
        </span>
      </>
    );
  };

  return (
    <>
      <div className="md:float-right w-1/8 p-4">
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
      <div className="container max-w-md m-8 float-left">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-2 gap-1">
            <div className="col-span-1 md:col-span-1 border-b-4 border-indigo-500">
              <div className="flex">
                <div>
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
                        //onError={(i) => (i.target.style.display = "none")}
                      />
                      <div className="text-2xl">
                        {item?.species?.name.toUpperCase()}
                      </div>
                    </figure>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-1">
              <div className="flex  " data-tip="hello">
                <div>
                  {stats.map((stat) => (
                    <div key={stat.stat.name} className="flex">
                      <img
                        src={`icons/${stat.stat.name}.png`}
                        className="w-8 h-8 p-1"
                      />

                      {stat.base_stat}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-1">
              <div className="flex">
                <div>
                  <div class="flex">
                    {types.map((type) => (
                      // <li key={type}>{type}</li>
                      <img src={`icons/${type}.png`} className="w-8 h-8" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-1">
              <div className="flex">
                <div>
                  {abilities.map((ability) => (
                    <div key={ability} className="text-bold flex ">
                      <img
                        src="https://raw.githubusercontent.com/naveenterance/pokemon-api/master/icons/pokemon.png"
                        className="w-8 h-8 p-1"
                      />
                      {ability.toUpperCase()}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
