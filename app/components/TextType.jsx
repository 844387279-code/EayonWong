"use client";

import { createElement, useEffect, useMemo, useState } from "react";
import "./TextType.css";

export default function TextType({
  text,
  as = "div",
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = "",
  showCursor = true,
  cursorCharacter = "|",
  cursorClassName = "",
  textColors = [],
  variableSpeed,
  ...props
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  useEffect(() => {
    let timeout;
    const currentText = textArray[currentTextIndex] ?? "";
    const getSpeed = () => {
      if (!variableSpeed) return typingSpeed;
      return Math.random() * (variableSpeed.max - variableSpeed.min) + variableSpeed.min;
    };

    if (isDeleting) {
      if (!displayedText) {
        if (!loop && currentTextIndex === textArray.length - 1) return undefined;
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setCurrentTextIndex((index) => (index + 1) % textArray.length);
          setCurrentCharIndex(0);
        }, pauseDuration);
      } else {
        timeout = setTimeout(() => setDisplayedText((value) => value.slice(0, -1)), deletingSpeed);
      }
    } else if (currentCharIndex < currentText.length) {
      timeout = setTimeout(
        () => {
          setDisplayedText((value) => value + currentText[currentCharIndex]);
          setCurrentCharIndex((index) => index + 1);
        },
        currentCharIndex === 0 && !displayedText ? initialDelay : getSpeed()
      );
    } else if (loop || currentTextIndex < textArray.length - 1) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
    }

    return () => clearTimeout(timeout);
  }, [currentCharIndex, currentTextIndex, deletingSpeed, displayedText, initialDelay, isDeleting, loop, pauseDuration, textArray, typingSpeed, variableSpeed]);

  const color = textColors.length ? textColors[currentTextIndex % textColors.length] : undefined;

  return createElement(
    as,
    { className: `text-type ${className}`.trim(), ...props },
    <span className="text-type__content" style={color ? { color } : undefined}>
      {displayedText}
    </span>,
    showCursor ? <span className={`text-type__cursor ${cursorClassName}`.trim()}>{cursorCharacter}</span> : null
  );
}
