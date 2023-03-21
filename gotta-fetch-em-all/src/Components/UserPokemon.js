import React from "react";

function UserPokemon({ pokemonList }) {
  return (
    <div>
      {pokemonList.map((pokemonUrl, index) => (
        <img
          key={index}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            pokemonUrl.split("/")[6]
          }.png`}
          alt={`Image of ${pokemonUrl.split("/")[6]}`}
        />
      ))}
    </div>
  );
}

export default UserPokemon;
