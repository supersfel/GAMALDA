/* ENUM PART */
//viewOpt 을 고정해서 설정
export const VIEWOPT = Object.freeze({
  basic: 0,
  calendar: 1,
  summary: 2,
});

export const COLOR = Object.freeze({
  grayLine: '#bebebe',
  liteBlack: '#555555',
  black: '#000000',
  white: '#ffffff',
});

export const BLOCKCOLOR = [
  '#FF5858',
  '#31DA89',
  '#A431DA',
  '#DAAB31',
  '#5D31DA',
  '#DA3196',
  '#DAA7831',
  '#F6DC00',
  '#A9A9EF',
  '#319DDA',
];

/* 돔 조작 함수 */
// 화면 정중앙의 요소를 가져와 리턴
export const getCenterElement = () => {
  const body = document.body;
  const html = document.documentElement;

  const height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight,
  );
  const width = Math.max(
    body.scrollWidth,
    body.offsetWidth,
    html.clientWidth,
    html.scrollWidth,
    html.offsetWidth,
  );

  const centerX = width / 2;
  const centerY = height / 2;

  const centerElement = document.elementFromPoint(centerX, centerY);

  return centerElement as any;
};
