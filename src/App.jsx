import "./App.css";

import React, { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    const fetchAbilities = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
        const data = await response.json();
        const dittoAbilities = data.abilities.map(
          (ability) => ability.ability.name
        );
        setAbilities(dittoAbilities);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAbilities();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(" https://pokeapi.co/api/v2/pokemon/ditto");
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData);
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
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { restaurantList } from "./constants";

// const RestaurantCard = ({
//   cloudinaryImageId,
//   name,
//   cuisines,
//   area,
//   lastMileTravelString,
//   costForTwoString,
//   avgRating,
// }) => {
//   return (
//     <div className="card">
//       <img
//         src={
//           "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/" +
//           cloudinaryImageId
//         }
//       />
//       <h2>{name}</h2>
//       <h4>{cuisines.join(", ")}</h4>
//       <h4>{area}</h4>
//       <span>
//         <h4>
//           <i class="fa-solid fa-star"></i>
//           {avgRating}
//         </h4>
//         <h4>{lastMileTravelString}</h4>
//         <h4>{costForTwoString}</h4>
//       </span>
//     </div>
//   );
// };

// // Body Component for body section: It contain all restaurant cards
// // We are mapping restaurantList array and passing data to RestaurantCard component as props with unique key as index
// const Body = () => {
//   return (
//     <div className="restaurant-list">
//       {restaurantList.map((restaurant) => {
//         return <RestaurantCard key={restaurant.data.id} {...restaurant.data} />;
//       })}
//     </div>
//   );
// };

// const AppLayout = () => {
//   return (
//     <>
//       <Body />
//     </>
//   );
// };

export default App;
