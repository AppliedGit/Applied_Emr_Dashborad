import React from "react";

const CircularProgressBar = ({ percentage, size = 100, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  let strokeColor = "#ff9999";
  // if (percentage > 75) strokeColor = "#90ee90";
  // else if (percentage > 50) strokeColor = "#ffff99";

  return (
    <div
      className="circular-progress-bar"
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width={size} height={size}>
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>

      {/* Centered Percentage Text */}
      <div
        className="percentage"
        style={{
          position: "absolute",
          fontSize: size * 0.2,
          fontWeight: "bold",
          color: "#333",
        }}
      >
        {percentage}%
      </div>
    </div>
  );
};

export default CircularProgressBar;
