import React from "react";

export default function CustomRange({ formName, ...props }) {
  const numValue = React.useRef(null);
  const sliderValue = React.useRef(null);

  return (
    <div className="custom-range">
      <input
        className="form-range"
        ref={sliderValue}
        onChange={(e) => (numValue.current.value = e.target.value)}
        id="range-input"
        type="range"
        {...props}
      />
      <input
        ref={numValue}
        name={formName}
        onBlur={(e) => (sliderValue.current.value = e.target.value)}
        type="number"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        {...props}
      />
    </div>
  );
}
