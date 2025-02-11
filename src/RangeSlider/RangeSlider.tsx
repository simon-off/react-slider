import { CSSProperties, Dispatch, SetStateAction } from "react";
import styles from "./RangeSlider.module.scss";

interface CSSCustomProperties extends CSSProperties {
  "--lower": string;
  "--upper": string;
}

interface RangeSliderProps {
  id: string;
  label: string;
  lowerState: [number, Dispatch<SetStateAction<number>>];
  upperState: [number, Dispatch<SetStateAction<number>>];
  step?: number;
  showStepMarkers?: boolean;
  range?: [number, number];
  validRange?: [number, number];
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));
const getPercentage = (value: number, range: [number, number]) => ((value - range[0]) / (range[1] - range[0])) * 100;

export default function RangeSlider({
  id,
  label,
  lowerState,
  upperState,
  step = 1,
  showStepMarkers = false,
  range = [0, 100],
  validRange,
}: RangeSliderProps) {
  const [lowerValue, setLowerValue] = lowerState;
  const [upperValue, setUpperValue] = upperState;
  const [validMin, validMax] = validRange ?? range;

  const rangeStyle: CSSCustomProperties = {
    "--lower": `${getPercentage(lowerValue, range)}%`,
    "--upper": `${100 - getPercentage(upperValue, range)}%`,
  };

  const ticks = step ? new Array((range[1] - range[0]) / step + 1).fill(0).map((_, i) => range[0] + i * step) : [];

  return (
    <>
      <fieldset className={styles.fieldset}>
        <legend>{label}</legend>
        <div className={styles["range-input"]} style={rangeStyle}>
          <output className={styles.lower} htmlFor={`${id}-lower`}>
            <span>{lowerValue}</span>
          </output>
          <output className={styles.upper} htmlFor={`${id}-upper`}>
            <span>{upperValue}</span>
          </output>
          <div className={styles.track}></div>
          <div className={styles.selected}></div>
          <input
            id={`${id}-lower`}
            aria-label="Minimum value"
            type="range"
            list="markers"
            className="lower"
            min={range[0]}
            max={range[1]}
            step={step}
            value={lowerValue}
            onInput={(e) =>
              setLowerValue(clamp(Math.min(parseInt(e.currentTarget.value), upperValue - step), validMin, validMax))
            }
          />
          <input
            id={`${id}-upper`}
            aria-label="Maximum value"
            type="range"
            list="markers"
            className="upper"
            min={range[0]}
            max={range[1]}
            step={step}
            value={upperValue}
            onInput={(e) =>
              setUpperValue(clamp(Math.max(parseInt(e.currentTarget.value), lowerValue + step), validMin, validMax))
            }
          />
          {showStepMarkers ? (
            <datalist id={`${id}-markers`}>
              {ticks.map((tick) => (
                <option key={tick} value={tick} />
              ))}
            </datalist>
          ) : null}
        </div>
      </fieldset>
    </>
  );
}
