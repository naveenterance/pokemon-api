import React, { useState } from "react";
import Autocomplete from "react-autocomplete";
//Create a component to hold the autocomplete search and the set of div elements:
const AutocompleteSearch = () => {
  const [value, setValue] = useState(""); // state to store the selected value
  const [items, setItems] = useState([
    // array of div elements to search from
    { id: 1, name: "Div 1" },
    { id: 2, name: "Div 2" },
    { id: 3, name: "Div 3" },
    // Add more div elements as needed
  ]);

  const searchItems = (searchText) => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const renderItem = (item, isHighlighted) => (
    <div
      key={item.id}
      style={{ background: isHighlighted ? "lightgray" : "white" }}
    >
      {item.name}
    </div>
  );

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Autocomplete
      value={value}
      items={searchItems(value)}
      renderItem={renderItem}
      getItemValue={(item) => item.name}
      onChange={handleInputChange}
      renderMenu={(children) => <div className="dropdown">{children}</div>}
    />
  );
};

export default AutocompleteSearch;
