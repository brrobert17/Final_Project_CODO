import "./style.css";
import backgroundWave from "@assets/button-wave.svg";
import backgroundWaveYellow from "@assets/button-wave-yellow.svg";
import { useEffect } from "react";

interface Props {
  onClick: () => void,
  text: string,
  secondary?: boolean
}

const Button = (props: Props) => {

  const sectionStyle = {
    backgroundImage: `url(${props.secondary ? backgroundWaveYellow : backgroundWave})`
  };

  return (
    <button style={sectionStyle} className={`btn ${props.secondary && 'secondary'}`}  onClick={props.onClick}>{props.text}</button>
  )
}

export default Button