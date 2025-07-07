import React, { useState, useEffect } from "react";

export default function EditablePhaseText({ phase }) {
  const [editableText, setEditableText] = useState("");

  useEffect(() => {
    const text =
      phase?.result?.[0]?.predicted_class?.split("/")?.slice(-2, -1)?.[0] || "";
    setEditableText(text);
  }, [phase]);

  const handleTextChange = (e) => {
    setEditableText(e.target.innerText);
  };

  return (
    <p
      className="analysis-text ms-3"
      style={{
        fontSize: "20px",
        border: "1px solid #ccc",
        padding: "8px",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
        minHeight: "40px",
      }}
      contentEditable
      suppressContentEditableWarning
      onInput={handleTextChange}
    >
      {editableText}
    </p>
  );
}

