import { blockInfoType } from 'components/milestone/type';
import {
  deleteBlockProps,
  getBlockInfoProps,
  getOneBlockProps,
  getProjectInfoByProjectIdProps,
  getProjectInfoProps,
  getProjectInfoType,
  getProjectsInfoProps,
} from './apiType';

const url = process.env.REACT_APP_API_URL;
const mocks_url = process.env.REACT_APP_MOCKS_API_URL;

//프로젝트 정보 받아오는 api test용
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

/**
 * 쿠키에 저장된 토큰 전달 시 배열 형식으로 된 프로젝트 정보 반환
 * @param token 
 * @returns [ projectId: number, invitationCode: string, title: string, subject: string, img: string, teamMember: string, private: number(boolean) ]
 */
export const getProjectsInfo = async (props: getProjectsInfoProps) => {
  const res = await fetch(url + '/projectinfo/loadbytoken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      accessToken: props
    }),
  });
  return await res.json();
};

/**
 * 프로젝트 고유 ID 전달 시 배열 형식으로 된 프로젝트 정보 반환
 * @param id 
 * @returns [ projectId: number, invitationCode: string, title: string, subject: string, img: string, teamMember: string, private: number(boolean) ]
 */
export const getProjectInfoByProjectId = async (props: getProjectInfoByProjectIdProps) => {
  const res = await fetch(url + '/projectinfo/loadbyid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      projectId: props
    }),
  });
  return await res.json();
}

export const createProject = async (props: any, accessToken: string) => {
  const res = await fetch(url + '/projectinfo/createproject', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      projectInfo: props,
      accessToken: accessToken
    }),
  });
  return await res.json();
}

export const enterProject = async (props: any, accessToken: string) => {
  const res = await fetch(url + '/projectinfo/enter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      enterInfo: props,
      accessToken: accessToken
    }),
  });
  return res.json();
}