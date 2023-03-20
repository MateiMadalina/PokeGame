import "./App.css";
import { useState, useEffect } from "react";
import DisplayLocations from "./Components/DisplayLocations";
import Sprite from "./Components/Sprite";

function App() {
  const [dataLocation, setDataLocation] = useState(null);
  const [dataPokemon, setDataPokemon] = useState(null);
  const [presArea, setPresArea] = useState(true);

  const readAPILocations = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/location");
    const data = await response.json();
    setDataLocation(data.results);
    // console.log(data.results);
  };

  const readAPILocation = async (link) => {
    const response = await fetch(`${link}`);
    const data = await response.json();
    const pokemonAreas = data.areas[0].url;
    readAPIPokemons(pokemonAreas);
  };

  const readAPIPokemons = async (url) => {
    const response = await fetch(`${url}`);
    const data = await response.json();
    // console.log(data.pokemon_encounters);
    let rand = Math.floor(Math.random() * data.pokemon_encounters.length);
    let URLPokemon = data.pokemon_encounters[rand].pokemon.url;
    // console.log(URLPokemon);
    readAPISprite(URLPokemon);
    //setDataPokemon(data.pokemon_encounters[rand].pokemon.url);
  };

  const readAPISprite = async (sprite) => {
    const response = await fetch(`${sprite}`);
    const data = await response.json();
    const svg = data.sprites["front_default"];
    //  const svg = data.sprite.other["dream_world"]["front_default"];
    // console.log(data.sprites["front_default"]);

    // console.log(data["sprite"]["other"]["dream_world"]["front_default"]);
    // console.log(data);
    setDataPokemon(svg);
  };
  //console.log(dataPokemon)

  useEffect(() => {
    readAPILocations();
  }, []);

  const handlePress = (param) => {
    setPresArea(param);
  };

  return (
    <div className="App">
      {presArea ? (
        <div>
          {dataLocation &&
            dataLocation.map((location, index) => (
              <DisplayLocations
                key={index}
                location={location.url}
                name={location.name}
                click={() => {
                  readAPILocation(location.url);
                  handlePress(false);
                }}
              />
            ))}
        </div>
      ) : (
        <Sprite svg={dataPokemon} />
      )}
    </div>
  );
}

export default App;