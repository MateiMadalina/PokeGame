const UserPokemons = (props) => {
    const svg = props.svg;
    const name = props.name
    return (
        <div>
        <button>
                <h3>{name}</h3>
                <img src={svg} />
        </button>
        </div>
    );
}

export default UserPokemons;