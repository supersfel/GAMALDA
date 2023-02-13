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
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getProjectInfo } from 'api/project/api';
import useReactQuery from 'hooks/useReactQuery';

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
  const navigate = useNavigate();
  const projectId = useParams().projectId as string;

  //react-query를 통한 api 받아오기 (현재는 mocks 사용)
  const projectInfoQuery = useQuery({
    queryKey: ['projectInfo', projectId],
    queryFn: async () => {
      const data = await getProjectInfo({ projectId });
      return data;
    },
  });

  const handleViewOpt = (opt: number) => {
    setViewOpt(opt);
  };

  //글자색 반전
  const handleIsColorBlack = () => {
    setIsColorBlack(!isColorBlack);
  };

  const moveSettingPage = () => {
    navigate(`/milestone/${projectId}/setting`);
  };

  return (
    <div className="milestone-header">
      <div className="left">
        {/* 임시 사진 (후에 api와 연결)*/}

        {useReactQuery(
          projectInfoQuery,
          <img
            src={projectInfoQuery.data?.image}
            alt=""
            className="user-img"
          />,
        )}
        <div className="project-info">
          <div className="name">
            {/* useReactQuery 훅을 사용하여 반복되는 코드 줄임 */}
            {useReactQuery(projectInfoQuery, projectInfoQuery.data?.name)}
          </div>

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
              onClick={moveSettingPage}
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
            <input type="value" placeholder="일정을 검색해 보세요" />
            <SearchSVG className="search-icon icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneHeader;
