const DisplayLocations = (props) => {
    const location = props.location
    const name = props.name
    return (
        <div id="locations">
            <a href={location}>{name}</a>
        </div>
    )
}
 
export default DisplayLocations