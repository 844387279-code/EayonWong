import { useRef } from "react";
import "./TiltedCard.css";

export default function TiltedCard({
  imageSrc,
  hoverImageSrc = "",
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.06,
  rotateAmplitude = 8,
  showTooltip = false,
  hoverLabel = "",
  className = "",
  innerClassName = "",
  children = null,
}) {
  const innerRef = useRef(null);
  const captionRef = useRef(null);
  const labelRef = useRef(null);

  function handleMouseMove(event) {
    const inner = innerRef.current;
    if (!inner) return;
    const rect = inner.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    const rotateX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotateY = (offsetX / (rect.width / 2)) * rotateAmplitude;
    inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scaleOnHover})`;

    if (captionRef.current) {
      captionRef.current.style.opacity = "1";
      captionRef.current.style.transform = `translate(${event.clientX - rect.left + 12}px, ${event.clientY - rect.top + 12}px)`;
    }

    if (labelRef.current) {
      labelRef.current.style.opacity = "1";
      labelRef.current.style.transform = `translate3d(${event.clientX - rect.left + 14}px, ${event.clientY - rect.top + 14}px, 34px)`;
    }
  }

  function handleMouseLeave() {
    if (innerRef.current) {
      innerRef.current.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    }
    if (captionRef.current) {
      captionRef.current.style.opacity = "0";
    }
    if (labelRef.current) {
      labelRef.current.style.opacity = "0";
    }
  }

  return (
    <figure
      className={`tilted-card-figure ${className}`}
      style={{ height: containerHeight, width: containerWidth }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={innerRef} className={`tilted-card-inner ${innerClassName}`} style={{ width: imageWidth, height: imageHeight }}>
        {imageSrc ? <img src={imageSrc} alt={altText} className="tilted-card-img tilted-card-img--primary" /> : null}
        {hoverImageSrc ? <img src={hoverImageSrc} alt={altText} className="tilted-card-img tilted-card-img--hover" /> : null}
        {hoverLabel ? (
          <span ref={labelRef} className="tilted-card-label">
            {hoverLabel}
          </span>
        ) : null}
        {children}
      </div>
      {showTooltip ? (
        <figcaption ref={captionRef} className="tilted-card-caption">
          {captionText}
        </figcaption>
      ) : null}
    </figure>
  );
}
