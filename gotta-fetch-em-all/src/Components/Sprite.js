const Sprite = (props) => {
  const svg = props.svg;
  const name = props.name
  const click = props.click;
  const buttonName = props.buttonName;
  const hp = props.hp;
  
  return (
    <div>
      <p id="lostOrWon">{hp}</p>
      <div className="card">
        <h4>{name}</h4>
        <img src={svg} />
      </div>
      <button className="btnBack" onClick={click}>{buttonName}</button>
    </div>
  );
};
export default Sprite;
