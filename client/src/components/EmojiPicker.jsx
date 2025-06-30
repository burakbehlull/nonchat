import React, { useRef, useState, useEffect } from "react";

import { useStore } from "@hooks";
import { RiEmojiStickerLine } from '@icons'

import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { Icon } from "@chakra-ui/react";


export default function EmojiPicker({ onEmojiSelect }) {
  const { getTheme } = useStore()

  const theme = getTheme() === "dark" ? "dark" : "light";
  
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEmojiSelect = (emoji) => {
    onEmojiSelect?.(emoji.native);
    setShowPicker(false);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      

      <Icon 
        size="md" 
        cursor="pointer" 
        ref={buttonRef}
        aria-label="Emoji Kutusunu Aç"
        alt="Emoji Kutusunu Aç"
        onClick={() => setShowPicker((prev) => !prev)}
      >
        <RiEmojiStickerLine />
      </Icon>

      {showPicker && (
        <div
          ref={pickerRef}
          style={{
              position: "absolute",
            bottom: "40px",
            right: "100%",
            marginRight: "10px",
            zIndex: 999,
            maxWidth: "300px",
          }}
        >
          <Picker data={data} onEmojiSelect={handleEmojiSelect} theme={theme} />
        </div>
      )}
    </div>
  );
}
