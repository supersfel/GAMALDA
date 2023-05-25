import { ActionType } from 'typesafe-actions';
import * as actions from 'modules/projectInfo/actions'

export type ProjectAddAction = ActionType<typeof actions>;

export type ProjectInfoType = {
  projectId: number;
  invitationCode: string;
  title: string;
  subject: string;
  img: string;
  teamMember: string;
  isPrivate: boolean;
};

export type ProjectAddState = ProjectInfoType;