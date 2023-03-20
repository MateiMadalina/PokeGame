import './App.css';
import { useState, useEffect } from "react";
import DisplayLocations from './Components/DisplayLocations';

function App() {
  const [data, setData] = useState(null);

  let readAPI = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/location");
    const data = await response.json();
    setData(data.results);
    console.log(data.results)
  };

  useEffect(() => {
    readAPI();
  }, []);

  return (
    <div className="App">
      {data && data.map((location, index) => (
        <DisplayLocations 
          key={index}
          location={location.url}
          name = {location.name}
          />
      ))}
    </div>
  );
}

export default App;
