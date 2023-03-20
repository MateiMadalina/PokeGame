const DisplayLocations = (props) => {
    const location = props.location;
    const name = props.name;
    const click = props.click;
    return (
        <div id="locations">
            <a href={location} onClick={click}>{name}</a>
        </div>
    )
}
 
export default DisplayLocations