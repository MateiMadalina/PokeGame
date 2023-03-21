import "./App.css";
import { useState, useEffect } from "react";
import DisplayLocations from "./Components/DisplayLocations";
import Sprite from "./Components/Sprite";
// import UsersPokemons from "./Components/UserPokemons";

function App() {
  const [dataLocation, setDataLocation] = useState(null);
  const [dataPokemon, setDataPokemon] = useState(null);
  const [presArea, setPresArea] = useState(true);
  const [dataPokemonName, setDataPokemonName] = useState(null);
  const [areaCondition, setAreaCondition] = useState(true);
  const [dataUserPokemon, setDataUserPokemon] = useState(null);
  const [dataUserPokemonName, setDataUserPokemonName] = useState(null);
  const [initialPokemonList, setInnitialPokemonList] = useState(["https://pokeapi.co/api/v2/pokemon/bulbasaur",
    "https://pokeapi.co/api/v2/pokemon/charizard",
    "https://pokeapi.co/api/v2/pokemon/poliwhirl"]);
  const [finalPokemonList, setFinalPokemonList] = useState([]);
  
  useEffect(() => {
    const readAPIUserSprite = async () => {
      const promises = initialPokemonList.map(async (pokemon) => {
        const response = await fetch(`${pokemon}`);
        const data = await response.json();
        const svg = data.sprites.other["dream_world"]["front_default"];
        const name = data.species.name.split("")
        name[0] = name[0].toUpperCase();
        const pokemonDetails = { "name": name.join(""), "svg": svg }
        return pokemonDetails
      });
      const pokemonDetails = await Promise.all(promises);
      setFinalPokemonList(pokemonDetails);
    };
    readAPIUserSprite();
  }, []);

  const readAPILocations = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/location");
    const data = await response.json();
    if (data.results) {
      setDataLocation(data.results);
    } else {
      console.log("No results")
    }
  };

  const readAPILocation = async (link) => {
    const response = await fetch(`${link}`);
    const data = await response.json();
    if (data.areas.length > 0) {
      const pokemonAreas = data.areas[0].url;
      readAPIPokemons(pokemonAreas);
    } else {
      setAreaCondition(false)
    }
  };

  const readAPIPokemons = async (url) => {
    const response = await fetch(`${url}`);
    const data = await response.json();
    let rand = Math.floor(Math.random() * data.pokemon_encounters.length);
    let URLPokemon = data.pokemon_encounters[rand].pokemon.url;
    readAPISprite(URLPokemon);
  };

  const readAPISprite = async (sprite) => {
    const response = await fetch(`${sprite}`);
    const data = await response.json();
    console.log(data);
    const svg = data.sprites.other["dream_world"]["front_default"];
    setDataPokemon(svg);
    const name = data.species.name.split("")
    name[0] = name[0].toUpperCase();
    name.join("");
    setDataPokemonName(name);
  };

  // const readAPIUserSprite = async (sprite) => {
  //   const response = await fetch(`${sprite}`);
  //   const data = await response.json();
  //   console.log(data);
  //   const svg = data.sprites.other["dream_world"]["front_default"];
  //   setDataUserPokemon(svg);
  //   const name = data.species.name.split("")
  //   name[0] = name[0].toUpperCase();
  //   name.join("");
  //   setDataUserPokemonName(name);
  // };

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
      ) : (areaCondition ? (
          <div>
            <Sprite svg={dataPokemon}
              name={dataPokemonName}
              click={() => {
                handlePress(true)
              }}
            />
            {/* {usersPokemonList.map((pokemon, index) => (
              <div key={index}>
                <UsersPokemons svg={dataUserPokemon}
                  name={dataUserPokemonName} />
              </div>
            ))} */}
          </div>)
        :
          (<div>
            <h3>There are no pokemon in this area.</h3>
            <button onClick={() => {
            handlePress(true);
            setAreaCondition(true);
            }}>Back</button>
          </div>)
      )}
    </div>
  );
}

export default App;
