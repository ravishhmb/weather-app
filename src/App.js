import React, { useState, useEffect } from "react";
const api = {
  key: "a338376f1ef51f0cf4068c8a82cc6018",
  base: "https://api.openweathermap.org/data/2.5/",
};

const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};

function App() {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("bengaluru");

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=a338376f1ef51f0cf4068c8a82cc6018`
      );
      const resJson = await response.json();
      setCity(resJson.main);
    };

    fetchApi();
  }, [search]);

  return (
    <main>
      <div className="searchBar">
        <input
          type="search"
          placeholder="Search..."
          className="search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      {!city ? (
        <div className="container">
          <h3>No Data found!</h3>
        </div>
      ) : (
        <div className="container">
          <p>{dateBuilder(new Date())}</p>
          <h2>{search}</h2>
          <h1>{city.temp} °C</h1>
        </div>
      )}
    </main>
  );
}

export default App;
