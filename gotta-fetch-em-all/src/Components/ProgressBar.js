import React from "react";

const ProgressBar = ({ value, max }) => {
  const percentage = Math.floor((value / max) * 100);
  const barStyle = {
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
