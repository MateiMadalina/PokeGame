const DisplayLocations = (props) => {
  const handleClick = (event) => {
    event.preventDefault(); // prevent default behavior
    props.click();
  };

  return (
    <div>
      <div id={props.id}>
      <button  className="locations" onClick={handleClick}>
        {props.name}
      </button><br>
      </br>
      <img alt="pin" src={props.logo} aspect={0.5}></img>
      </div>
    </div>
  );
};

export default DisplayLocations;