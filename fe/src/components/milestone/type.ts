export interface blockInfoType {
  title: string;
  manager: string;
  progress: number;
  importance: number;
  bgColor: number;
  start: string;
  end: string;
  col: number;
  subTitle: string[];
  blockId: number;
}

export type smallModalInfoType = 'progress' | 'important' | 'manager';

export type handleBlockInfoType = (
  id: number,
  leftPos: number,
  topPos: number,
  width: number,
  type: 'drag' | 'leftSize' | 'rightSize',
) => void;
