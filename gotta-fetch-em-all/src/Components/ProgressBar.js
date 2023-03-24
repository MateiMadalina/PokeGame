const ProgressBar = (prop) => {
  const value = prop.value;
  const max = prop.max
  const percentage = Math.floor((value / max) * 100);
  const barStyle = {
    borderRadius: '10px 10px 10px 10px',
    width: `${percentage}%`,
    height: "20px",
    backgroundColor: "#4CAF50",
  };

  return (
    <div>
      <div style={barStyle}></div>
      <div>{`${percentage}%`}</div>
    </div>
  );
};

export default ProgressBar;
