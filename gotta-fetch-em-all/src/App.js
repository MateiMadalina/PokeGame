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

  let readAPIPokemon = async (link) => {
    const response = await fetch(`${link}`);
    const data = await response.json();
    const pokemonAreas = data.areas[0].url;
    let readAPISprite = async (url) => {
      const response = await fetch(`${url}`);
      const data = await response.json();
      console.log(data);
    }
    readAPISprite(pokemonAreas);
  
    // let rand = Math.floor(Math.random() * pokemonAreas.pokemon_encounters.length)
    // console.log(rand)
    // console.log(data.pokemon_encounters)
    // setDataPokemon(data.pokemon_encounters[rand].pokemon.url);
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
          click={() => {readAPIPokemon(location.url)}}
          />
      ))}
    </div>
  );
}

export default App;
