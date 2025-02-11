import { useState } from "react";
import "./App.scss";
import RangeSlider from "./RangeSlider/RangeSlider";

export default function App() {
  const ageLowerState = useState(40);
  const ageUpperState = useState(60);

  const centuryLowerState = useState(500);
  const centuryUpperState = useState(1800);

  const priceLowerState = useState(3000);
  const priceUpperState = useState(5000);

  return (
    <div className="app">
      <RangeSlider id="age" label="Age Range" lowerState={ageLowerState} upperState={ageUpperState} range={[18, 80]} />
      <RangeSlider
        id="Century"
        label="Century Range"
        lowerState={centuryLowerState}
        upperState={centuryUpperState}
        range={[0, 2100]}
        step={100}
        showStepMarkers={true}
      />
      <RangeSlider
        id="test"
        label="Range Slider 2000"
        lowerState={priceLowerState}
        upperState={priceUpperState}
        range={[500, 10000]}
        step={500}
        showStepMarkers={true}
        validRange={[1500, 8000]}
      />
    </div>
  );
}
