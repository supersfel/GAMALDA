import { ActionType } from 'typesafe-actions';
import * as actions from 'modules/projectInfo/actions'

export type ProjectAddAction = ActionType<typeof actions>;

export type ProjectAddType = {
  title: string;
  subject: string;
}

export type ProjectAddState = ProjectAddType[];