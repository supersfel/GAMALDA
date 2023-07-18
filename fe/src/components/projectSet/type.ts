/* project Setting 관련 Type */
export type selectType =
  | 'info'
  | 'private'
  | 'code'
  | 'members'
  | 'delete'
  | 'back'
  | '';

export interface projInfoType {
  projectId: number;
  invitationCode: string;
  title: string;
  subject: string;
  img: string;
  isPrivate: number;
  manager: string;
  teamMember: string;
}
