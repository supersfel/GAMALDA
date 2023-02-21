import { getProjectInfoProps, getProjectInfoType, testType } from './apiType';

const url = process.env.REACT_APP_API_URL;
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

// 네이버 로그인 API의 쿼리 스트링으로 오는 code와 state를 받아오는 api
export async function getNaverCode(code: string, state: string) {
  // console.log(`{"code": "${code}"}`,typeof JSON.parse(`{"code": "${code}"}`))
  // POST메서드는 해당 URL에 보내는데 nestjs에서 Post로 받게되면 해당 정보가 전달된다.
  await fetch(url + '/naver_login/callback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // fetch할 때는 JSON은 직렬화 해야한다.
    body: JSON.stringify({
      code: code,
      state: state
    }),
  })
    .catch(e => console.error(e));
}