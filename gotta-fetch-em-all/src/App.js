import './App.css';
import { useState, useEffect } from "react";
import DisplayLocations from './Components/DisplayLocations';

function App() {
  const [dataLocation, setDataLocation] = useState(null);
  const [dataPokemon, setDataPokemon] = useState(null);
  const [link, setLink] = useState(null);

  let readAPILocation = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/location");
    const data = await response.json();
    setDataLocation(data.results);
    console.log(data.results);
  };

  let readAPIPokemon = async () => {
    const response = await fetch(`${link}`);
    const data = await response.json();
    let rand = Math.floor(Math.random() * data.pokemon_encounters.length)
    console.log(rand)
    console.log(data.pokemon_encounters)
    setDataPokemon(data.pokemon_encounters[rand].pokemon.url);
  }

  useEffect(() => {
    readAPILocation();
  }, []);

  return (
    <div className="App">
      {dataLocation && dataLocation.map((location, index) => (
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
