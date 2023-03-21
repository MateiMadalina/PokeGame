const UsersPokemons = (props) => {
    const svg = props.svg;
    const name = props.name
    return (
        <div>
        <h3>Choose your fighter:</h3>
        <button>
                <h3>{name}</h3>
                <img src={svg} />
        </button>
        </div>
    );
}

export default UsersPokemons;