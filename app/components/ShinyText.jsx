import "./ShinyText.css";

export default function ShinyText({
  text,
  disabled = false,
  speed = 2,
  delay = 0,
  className = "",
  color = "#b5b5b5",
  shineColor = "#ffffff",
  spread = 120,
  direction = "left",
}) {
  return (
    <span
      className={`shiny-text${disabled ? " shiny-text--disabled" : ""} ${className}`}
      style={{
        "--shiny-speed": `${speed}s`,
        "--shiny-delay": `${delay}s`,
        "--shiny-color": color,
        "--shiny-shine": shineColor,
        "--shiny-spread": `${spread}deg`,
        "--shiny-direction": direction === "left" ? "normal" : "reverse",
      }}
    >
      {text}
    </span>
  );
}
