import { blockInfoType } from 'components/milestone/type';
import {
  deleteBlockProps,
  getBlockInfoProps,
  getOneBlockProps,
  getProjectInfoProps,
  getProjectInfoType,
  getProjectsInfoProps,
  createProjectProps,
  enterProjectProps,
} from './apiType';

const url = process.env.REACT_APP_API_URL;

const postApi = async (targetUrl: string, parem: any) => {
  const res = await fetch(url + targetUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(parem),
  });
  return await res.json();
};

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
 * @returns { projectId: number, invitationCode: string, title: string, subject: string, img: string, teamMember: string, private: number(boolean) }

 */
export const getProjectsInfo = async (props: getProjectsInfoProps) => {
  const res = await fetch(url + '/projectinfo/loadbytoken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      accessToken: props,
    }),
  });
  return await res.json();
};

/**
 * 프로젝트 고유 ID 전달 시 배열 형식으로 된 프로젝트 정보 반환

 * @param id 
 * @returns { projectId: number, invitationCode: string, title: string, subject: string, img: string, userId: number, private: number(boolean) }

 */
export const getProjectInfoByProjectId = async (props: number) => {
  const res = await fetch(url + '/projectinfo/loadbyid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      projectId: props,
    }),
  });
  return await res.json();
};

/**
 * 프로젝트를 만드는 api, 만들어 졌는지 여부를 boolean 값으로 전달
 * @param props
 * @param accessToken
 * @returns boolean
 */
export const createProject = async (
  props: createProjectProps,
  accessToken: string,
) => {
  const res = await fetch(url + '/projectinfo/createproject', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      projectInfo: props,
      accessToken: accessToken,
    }),
  });
  return await res.json();
};

/**
 * 입장 코드를 이용해 프로젝트로 입장을 도와주는 api, 입장에 성공했는지 boolean값으로 반환
 * @param props
 * @param accessToken
 * @returns boolean
 */
export const enterProject = async (
  props: enterProjectProps,
  accessToken: string,
) => {
  const res = await fetch(url + '/projectinfo/enter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      enterInfo: props,
      accessToken: accessToken,
    }),
  });
  return res.json();
};

/**
 * 프로젝트 이름,썸네일 변경
 * @param projectName
 * @param thumbnailUrl
 * @param projectId
 * @returns
 */
export const updateProjectInfoApi = async (
  projectName: string,
  thumbnailUrl: string,
  projectId: string,
) => {
  return postApi('/projectinfo/updateProjInfo', {
    projectName,
    thumbnailUrl,
    projectId,
  });
};

/**
 * 접근권한 변경 api
 * @param isPrivate
 * @param projectId
 * @returns
 */
export const updateIsPrivateApi = async (
  isPrivate: boolean,
  projectId: string,
) => {
  return postApi('/projectinfo/updateIsPrivate', {
    isPrivate,
    projectId,
  });
};

export const getMemberInfosByUserIdApi = async (userIdAry: string) => {
  return postApi('/projectinfo/updateIsPrivate', {
    userIdAry,
  });
};
