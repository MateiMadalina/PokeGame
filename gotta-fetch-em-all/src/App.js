import "./App.css";
import { useState, useEffect } from "react";
import DisplayLocations from "./Components/DisplayLocations";
import Sprite from "./Components/Sprite";
import UserPokemons from "./Components/UserPokemons";
import ProgressBar from "./Components/ProgressBar";

function App() {
  const [dataLocation, setDataLocation] = useState(null);
  const [dataPokemon, setDataPokemon] = useState(null);
  const [presArea, setPresArea] = useState(true);
  const [dataPokemonName, setDataPokemonName] = useState(null);
  const [areaCondition, setAreaCondition] = useState(true);
  const [initialPokemonList, setInitialPokemonList] = useState([
    "https://pokeapi.co/api/v2/pokemon/charizard",
    "https://pokeapi.co/api/v2/pokemon/pikachu",
    "https://pokeapi.co/api/v2/pokemon/poliwhirl"
  ]);
  const [finalPokemonList, setFinalPokemonList] = useState([]);
  const [choosenPokemon, setChoosenPokemon] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pcFighter, setPcFighter] = useState(null);
  const [myFighter, setMyFighter] = useState(null);
  const [playerHP, setPlayerHp] = useState(null);
  const [computerHP, setComputerHP] = useState(null);
  const [pcHp, setPcHp] = useState(100);
  const [myHp, setMyHp] = useState(100);

  const readAPIUserSprite = async () => {
    const promises = initialPokemonList.map(async (pokemon) => {
      const response = await fetch(`${pokemon}`);
      const data = await response.json();
      const svg = data.sprites.other["dream_world"]["front_default"];
      const name = data.species.name.split("");
      name[0] = name[0].toUpperCase();
      const pokemonDetails = {
        name: name.join(""),
        svg: svg,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        random: Math.floor(Math.random() * (255 - 217 + 1) + 217),
      };
      return pokemonDetails;
    });
    const pokemonDetails = await Promise.all(promises);
    setFinalPokemonList(pokemonDetails);
  };

  useEffect(() => {
    readAPIUserSprite();
  }, []);

  const readAPILocations = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/location");
    const data = await response.json();
    if (data.results) {
      setDataLocation(data.results);
    } else {
      console.log("No results");
    }
  };

  const readAPILocation = async (link) => {
    const response = await fetch(`${link}`);
    const data = await response.json();
    if (data.areas.length > 0) {
      const pokemonAreas = data.areas[0].url;
      readAPIPokemons(pokemonAreas);
    } else {
      setAreaCondition(false);
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
    const svg = data.sprites.other["dream_world"]["front_default"];
    setDataPokemon(svg);
    const name = data.species.name.split("");
    name[0] = name[0].toUpperCase();
    name.join("");
    setDataPokemonName(name);
    setPcFighter({
      name: data.species.name,
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      random: Math.floor(Math.random() * (255 - 217 + 1) + 217),
    });
  };

  useEffect(() => {
    readAPILocations();
  }, []);

  const handlePress = (param) => {
    setPresArea(param);
  };

  const handleAbilityChoosenPlayer = (details) => {
    setMyFighter({
      hp: details.hp,
      attack: details.attack,
      defense: details.defense,
      random: details.random,
    });
  };

  const formula = (B, D, Z) => {
    return ((((2 / 5 + 2) * B * 60) / D / 50 + 2) * Z) / 255;
  };

  const handleFight = async (pc, my) => {
    let playerTurn = true;

    while (pc.hp > 0 && my.hp > 0) {
      const pcTotal = formula(pc.attack, pc.defense, pc.random);
      const myTotal = formula(my.attack, my.defense, my.random);

      if (playerTurn) {
        pc.hp -= myTotal;
        await new Promise((resolve) => setTimeout(resolve, 500));
        setComputerHP(`Health: ${pc.hp}`);
        setPcHp(pc.hp);
      } else {
        my.hp -= pcTotal;
        await new Promise((resolve) => setTimeout(resolve, 500));
        setPlayerHp(`Health: ${my.hp}`);
        setMyHp(my.hp);
      }

      playerTurn = !playerTurn;
    }

    if (pc.hp <= 0 && my.hp >= 0) {
      console.log("You won!");
      setPlayerHp("You won!");
      await new Promise((resolve) => setTimeout(resolve, 5000));
      initialPokemonList.push(`https://pokeapi.co/api/v2/pokemon/${pc.name}`);
      readAPIUserSprite();
      handlePress(true);
      setChoosenPokemon(true);
      setPlayerHp("");
      setComputerHP("");
      setMyHp(100);
      setPcHp(100);
    } else if (pc.hp >= 0 && my.hp <= 0) {
      console.log("You lost!");
      setPlayerHp("You lost!");
      await new Promise((resolve) => setTimeout(resolve, 5000));
      handlePress(true);
      setChoosenPokemon(true);
      setPlayerHp("");
      setComputerHP("");
      setMyHp(100);
      setPcHp(100);
    }
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
      ) : areaCondition ? (
        <div id="all">
          <div id="PokemonPC">
            <h2>Your opponent is:</h2>
            <div className="progressBar">
            <ProgressBar value={pcHp} max={100} />
            </div>
            <Sprite
              svg={dataPokemon}
              name={dataPokemonName}
              buttonName="Choose another area"
              hp={computerHP}
              click={() => {
                handlePress(true);
                setChoosenPokemon(true);
              }}
            />
          </div>
          <div id="PokemonPlayer">
            {choosenPokemon ? (
              <div>
                <h2>Choose your fighter:</h2>
                <div id="myPokemons">
                  {finalPokemonList.map((pokemon, index) => (
                    <UserPokemons
                      svg={pokemon.svg}
                      name={pokemon.name}
                      click={() => {
                        setChoosenPokemon(false);
                        setSelectedPokemon(pokemon);
                        handleAbilityChoosenPlayer(pokemon);
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h3>Your fighter is:</h3>
                <ProgressBar value={myHp} max={100} />
                <Sprite
                  svg={selectedPokemon.svg}
                  name={selectedPokemon.name}
                  buttonName="Choose another fighter"
                  hp={playerHP}
                  click={() => {
                    setChoosenPokemon(true);
                  }}
                />
                <button
                  id="btnFight"
                  onClick={() => {
                    handleFight(pcFighter, myFighter);
                  }}
                >
                  Fight
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h3>There are no pokemon in this area.</h3>
          <button
            onClick={() => {
              handlePress(true);
              setAreaCondition(true);
            }}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
