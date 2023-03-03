import React,{UseState} from "react";
import './incenseBurner.css';

const incense = () => {
  const [isBurning, setIsBurning] = UseState(false);

  const handleBurnClick = () => {
    setIsBurning(!isBurning);
  };

  return (
    <div className={`incense-burner ${isBurning ? "burning" : ""}`}>
      <div className="smoke"></div>
      <div className="holder"></div>
      <div className="base"></div>
      <button onClick={handleBurnClick}>Burn</button>
    </div>
  );
};
export default incense;