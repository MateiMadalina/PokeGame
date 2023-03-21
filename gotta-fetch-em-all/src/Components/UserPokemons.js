const UserPokemons = (props) => {
    const svg = props.svg;
    const name = props.name
    const click = props.click;
    return (
        <div>
        <button onClick={click}>
                <h3>{name}</h3>
                <img src={svg} />
        </button>
        </div>
    );
}

export default UserPokemons;