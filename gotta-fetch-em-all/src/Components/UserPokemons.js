const UserPokemons = (props) => {
    const svg = props.svg;
    const name = props.name
    const click = props.click;

    return (
        <div>
            <div className="card">
                <h4>{name}</h4>
                <img src={svg} />
            </div>
            <button className="btnBack" onClick={click}>
                This one
            </button>
        </div>
    );
}

export default UserPokemons;