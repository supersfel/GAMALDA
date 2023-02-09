import { testType } from './apiType';

const url = process.env.REACT_APP_API_URL;
const mocks_url = process.env.REACT_APP_MOCKS_API_URL;

//테스트 api
export async function getTest() {
  console.log('in');
  const res = await fetch(url + `/test`);
  return (await res.json()) as testType;
}
