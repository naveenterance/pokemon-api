import React, { useState, useEffect } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

function t(url) {
  const truncatedUrl = url.split("/")[6];

  return truncatedUrl;
}

const App = () => {
  // note: the id field is mandatory
  const [items, setName] = useState([]);

  useEffect(() => {
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
        <span key={item.url} style={{ display: "block", textAlign: "left" }}>
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
    <div className="App">
      <header className="App-header">
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
      </header>
    </div>
  );
};

export default App;
