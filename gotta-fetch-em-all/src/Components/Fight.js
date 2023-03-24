import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import Sprite from "./Sprite";

const Fight = ({
  myHp,
  selectedPokemon,
  playerHP,
  setChoosenPokemonCallback,
  pcFighter,
  myFighter,
  setPcHpCallback,
  setMyHpCallback,
  setPlayerHpCallback,
  initialPokemonList,
  readAPIUserSpriteCallback,
  handlePressCallback,
  setComputerHPCallback
}) => {
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
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (pc.hp < 0) {
          pc.hp = 0;
        }
        setPcHpCallback(pc.hp);
      } else {
        my.hp -= pcTotal;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (my.hp < 0) {
          my.hp = 0;
        }
        setMyHpCallback(my.hp);
      }

      playerTurn = !playerTurn;
    }

    if (pc.hp <= 0 && my.hp >= 0) {
      setPlayerHpCallback("You won!");
      await new Promise((resolve) => setTimeout(resolve, 5000));
      if (
        !initialPokemonList.includes(
          `https://pokeapi.co/api/v2/pokemon/${pc.name}`
        )
      ) {
        initialPokemonList.push(`https://pokeapi.co/api/v2/pokemon/${pc.name}`);
      }
      readAPIUserSpriteCallback();
      handlePressCallback(true);
      setChoosenPokemonCallback(true);
      setPlayerHpCallback("");
      setComputerHPCallback("");
      setMyHpCallback(100);
      setPcHpCallback(100);
    } else if (pc.hp >= 0 && my.hp <= 0) {
      setPlayerHpCallback("You lost!");
      await new Promise((resolve) => {
        setTimeout(resolve, 5000);
      });
      handlePressCallback(true);
      setChoosenPokemonCallback(true);
      setPlayerHpCallback("");
      setComputerHPCallback("");
      setMyHpCallback(100);
      setPcHpCallback(100);
    }
  };

  return (
    <>
      <h2>Your fighter is:</h2>
      <ProgressBar value={myHp} max={100} />
      <Sprite
        svg={selectedPokemon.svg}
        name={selectedPokemon.name}
        buttonName="Choose another fighter"
        hp={playerHP}
        click={() => {
          setChoosenPokemonCallback(true);
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
    </>
  );
};

export default Fight;
