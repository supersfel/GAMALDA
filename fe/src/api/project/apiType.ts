export interface testType {
  test: string;
}

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
