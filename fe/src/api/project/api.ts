import { blockInfoType } from 'components/milestone/type';
import {
  deleteBlockProps,
  getBlockInfoProps,
  getOneBlockProps,
  getProjectInfoProps,
  getProjectInfoType,
  testType,
} from './apiType';

const url = process.env.REACT_APP_API_URL;
const mocks_url = process.env.REACT_APP_MOCKS_API_URL;

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

//프로젝트별 블록들 값을 가져오는 api
export async function getBlockInfo(param: getBlockInfoProps) {
  const res = await fetch(url + '/block', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    credentials: 'include',
    body: JSON.stringify(param),
  });
  return (await res.json()) as blockInfoType[];
}

export const createBlockApi = async (param: blockInfoType) => {
  const res = await fetch(url + '/block/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    credentials: 'include',
    body: JSON.stringify(param),
  });

  return await res.json();
};

export const updateBlockApi = async (param: blockInfoType) => {
  const res = await fetch(url + '/block/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    credentials: 'include',
    body: JSON.stringify(param),
  });

  return await res.json();
};

export const deleteBlockApi = async (param: deleteBlockProps) => {
  const res = await fetch(url + '/block/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    credentials: 'include',
    body: JSON.stringify(param),
  });

  return await res.json();
};

//blockId로 한개의 block정보만 가져옴
export const getOneBlockApi = async (param: getOneBlockProps) => {
  const res = await fetch(url + '/block/readBlock', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(param),
  });
  return await res.json();
};

export const getProjectsInfo = async (token: string) => {
  const res = await fetch(url + '/projectinfo/load', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      accessToken: token
    }),
  });
  console.log(await res.json());
  return await res.json();
};