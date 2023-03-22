const Sprite = (props) => {
    const svg = props.svg;
  const name = props.name
  const click = props.click;
  const buttonName = props.buttonName;
  return (<div>
    
    <h4>{name}</h4>
    <img src={svg} />
    <button onClick={click}>{buttonName}</button>
    </div>
  );
};
export default Sprite;
