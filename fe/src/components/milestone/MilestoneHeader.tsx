/* 마엘스톤 페이지 헤더 */
import React from 'react';
import { ReactComponent as PencilSVG } from 'assets/svg/pencil-02.svg';
import { ReactComponent as OnSVG } from 'assets/svg/on-rounded.svg';
import { ReactComponent as OffSVG } from 'assets/svg/off-rounded.svg';
import { ReactComponent as CalendarSVG } from 'assets/svg/Calendar.svg';
import { ReactComponent as AssignSVG } from 'assets/svg/assignment.svg';
import { ReactComponent as SettingSVG } from 'assets/svg/setting.svg';
import { ReactComponent as SearchSVG } from 'assets/svg/search.svg';
import { COLOR, VIEWOPT } from 'utils/utils';

interface Props {
  viewOpt: number;
  setViewOpt: React.Dispatch<React.SetStateAction<number>>;
  isColorBlack: boolean;
  setIsColorBlack: React.Dispatch<React.SetStateAction<boolean>>;
}

const MilestoneHeader = ({
  viewOpt,
  setViewOpt,
  isColorBlack,
  setIsColorBlack,
}: Props) => {
  const handleViewOpt = (opt: number) => {
    setViewOpt(opt);
  };

  //글자색 반전
  const handleIsColorBlack = () => {
    setIsColorBlack(!isColorBlack);
  };

  return (
    <div className="milestone-header">
      <div className="left">
        {/* 임시 사진 (후에 api와 연결)*/}
        <img src="https://picsum.photos/100/100" alt="" className="user-img" />
        <div className="project-info">
          <div className="name">프로젝트 이름</div>
          <div className="view-select-box">
            <div
              className={`select-btn ${
                viewOpt === VIEWOPT.basic ? 'select' : 'none-select'
              }`}
              onClick={() => handleViewOpt(VIEWOPT.basic)}
            >
              <PencilSVG
                stroke={viewOpt === VIEWOPT.basic ? 'white' : COLOR.grayLine}
              />
              <p>기본</p>
            </div>
            <div
              className={`select-btn ${
                viewOpt === VIEWOPT.calendar ? 'select' : 'none-select'
              }`}
              onClick={() => handleViewOpt(VIEWOPT.calendar)}
            >
              <CalendarSVG
                fill={viewOpt === VIEWOPT.calendar ? 'white' : COLOR.grayLine}
              />
              <p>달력</p>
            </div>
            <div
              className={`select-btn ${
                viewOpt === VIEWOPT.summary ? 'select' : 'none-select'
              }`}
              onClick={() => handleViewOpt(VIEWOPT.summary)}
            >
              <AssignSVG
                fill={viewOpt === VIEWOPT.summary ? 'white' : COLOR.grayLine}
              />
              <p>요약</p>
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="right-top">
          <div className="content">
            <p>프로젝트 설정</p>
            <SettingSVG
              className="icon"
              stroke={COLOR.liteBlack}
              width="1rem"
              height="1rem"
            />
          </div>
          <div className="content">
            <p>글자색 반전</p>
            {isColorBlack ? (
              <OffSVG className="icon" onClick={handleIsColorBlack} />
            ) : (
              <OnSVG className="icon" onClick={handleIsColorBlack} />
            )}
          </div>
        </div>
        <div className="right-bottom">
          <div className="btn">일정 추가</div>
          <div className="search-bar">
            <input type="value" />
            <SearchSVG className="search-icon icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneHeader;
