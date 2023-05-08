import React, { useState } from 'react';
/* 더블클릭해서 요소의 값을 바꿀 수 있는 컴포넌트 */
interface Props {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  handleContentChange: () => void;
  setIsContentChangeByEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 *
 * @param content : 상위 텍스트에서 가져올 content내용
 * @param setContent : content가 useState로 되어있음
 * @param handleContentChange : content가 다 작성되었을때 실행
 * @param setIsContentChangeByEdit : 무한 socket통신을 방지하기 위한 flag
 * @returns
 */
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
