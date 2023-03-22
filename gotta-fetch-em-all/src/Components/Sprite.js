const Sprite = (props) => {
  const svg = props.svg;
  const name = props.name
  const click = props.click;
  const buttonName = props.buttonName;
  const hp = props.hp;
  return (
    <div>
      <div className="card">
        <h4>{name}</h4>
        <h5>{hp}</h5>
        <img src={svg} />
      </div>
      <button onClick={click}>{buttonName}</button>
    </div>
  );
};
export default Sprite;
