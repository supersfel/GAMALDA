//modules/todos/index.ts

export { default } from 'modules/milestoneBlock/reducer'; //reducer에서 내보낸걸 그대로 내보냄 (default로)
export * from 'modules/milestoneBlock/actions'; //actions의 모든걸 내보냄,
export * from 'modules/milestoneBlock/types';
export * from 'modules/milestoneBlock/thunks';
