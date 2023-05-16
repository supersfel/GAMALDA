import React, { useState } from 'react';

const ProjSetPrivate = () => {
  const [isPrivate, setIsPrivate] = useState(false);

  const handleToggle = () => {
    setIsPrivate(!isPrivate);
  };

  return (
    <div className="proj-set-private">
      <div className="title">
        <p>Private 설정</p>
        <div className="toggle-btn">
          <label>
            <input
              role="switch"
              type="checkbox"
              className="prvate-btn"
              checked={isPrivate}
              onChange={handleToggle}
            />
          </label>
        </div>
      </div>

      <p>팀원이 아닌 다른 사람들이 프로젝트를 볼 수 없습니다</p>
    </div>
  );
};

export default ProjSetPrivate;
