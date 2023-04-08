import React, { useState } from 'react';

interface Props {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

export const EditableTextBlock = ({ content, setContent }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsEditing(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  if (isEditing) {
    return (
      <input
        className="editing-text-block"
        type="text"
        value={content}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onBlur={() => setIsEditing(false)}
        onMouseDown={(e) => e.stopPropagation()}
      />
    );
  }

  return <div onDoubleClick={handleDoubleClick}>{content}</div>;
};
