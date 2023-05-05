import React, { useState } from 'react';

interface Props {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  handleContentChange: () => void;
  setIsContentChangeByEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditableTextBlock = ({
  content,
  setContent,
  handleContentChange,
  setIsContentChangeByEdit,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDoubleClick = () => {
    setIsContentChangeByEdit(true);
    setIsEditing(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsEditing(false);
      handleContentChange();
      setIsContentChangeByEdit(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsContentChangeByEdit(true);
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
