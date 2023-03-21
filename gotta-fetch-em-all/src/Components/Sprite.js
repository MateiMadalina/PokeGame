
const Sprite = (props) => {
    const svg = props.svg;
  const name = props.name
  const click = props.click;
  return (<div>
    
    <h3>{name}</h3>
    <img src={svg} />
    <button onClick={click}>Back</button>
    </div>
  );
};
export default Sprite;
