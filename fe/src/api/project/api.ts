import { getProjectInfoProps, getProjectInfoType, testType } from './apiType';

const url = process.env.NAVER_LOGIN_CALLBACK_URL;
const mocks_url = process.env.REACT_APP_MOCKS_API_URL;

//테스트 api
export async function getTest() {
  const res = await fetch(url + `/test`);
  return (await res.json()) as testType;
}

//프로젝트 정보 받아오는 api
export async function getProjectInfo(param: getProjectInfoProps) {
  const res = await fetch(mocks_url + '/projectInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    credentials: 'include',
    body: JSON.stringify(param),
  });
  return (await res.json()) as getProjectInfoType;
}
