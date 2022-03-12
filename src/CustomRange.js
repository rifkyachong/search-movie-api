import React from "react";

export default function CustomRange({ formName, ...props }) {
  const numValue = React.useRef(null);
  const sliderValue = React.useRef(null);

  return (
    <div className="custom-range">
      <input
        className="form-range"
        name={formName}
        ref={sliderValue}
        onChange={(e) => (numValue.current.value = e.target.value)}
        id="range-input"
        type="range"
        {...props}
      />
      <input
        ref={numValue}
        onBlur={(e) => (sliderValue.current.value = e.target.value)}
        type="number"
        {...props}
      />
    </div>
  );
}
