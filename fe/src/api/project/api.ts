import { getNaverQuery, getProjectInfoProps, getProjectInfoType, testType } from './apiType';

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
export async function getNaverCode(code: string) {
  console.log(`{"code": "${code}"}`,typeof JSON.parse(`{"code": "${code}"}`))
  // const res = await fetch(url + '/naver_login/callback', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   credentials: 'include', // fetch에서는 쿠키를 보내거나 받지 않기에 설정해 주어 
  //   body: JSON.stringify(code)
  // })
  await fetch(url + '/naver_login/loading', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: code
    }),
  })
    .then(res => {
      res.json();
    })
    .catch(e => console.error(e));
}