const DisplayLocations = (props) => {
  const handleClick = (event) => {
    event.preventDefault(); // prevent default behavior
    props.click();
  };

  return (
    <div>
      <button onClick={handleClick}>{props.name}</button>
    </div>
  );
};

export default DisplayLocations;