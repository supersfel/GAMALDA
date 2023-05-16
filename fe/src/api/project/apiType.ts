
//getProjectInfo Type
export interface getProjectInfoType {
  name: string;
  image: string;
}

export interface getProjectInfoProps {
  projectId: string;
}

export interface getBlockInfoProps {
  projectId: string;
}

export interface deleteBlockProps {
  blockId: number;
}

export interface getOneBlockProps {
  blockId: number;
}


// project 관련
export interface getProjectsInfoProps {
  token: string;
}

export interface getProjectInfoByProjectIdProps {
  projectId: number
}
