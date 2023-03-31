import { useEffect } from 'react';

/**
 * MouseDown으로 flg 설정해두었을 때 이후 move,up이벤트를 등록할 수 있는 훅
 * @param MouseMove MouseMove 이벤트 등록
 * @param MouseUp MouseUp 이벤트 등록
 * @param dependencyAry useEffect 2번째 인자로 들어갈 배열
 */
const useMouseEvent = (
  MouseMove: (e: MouseEvent) => void,
  MouseUp: (e: MouseEvent) => void,
  dependencyAry: any[],
) => {
  useEffect(() => {
    window.addEventListener('mousemove', MouseMove);
    window.addEventListener('mouseup', MouseUp);
    return () => {
      window.removeEventListener('mousemove', MouseMove);
      window.removeEventListener('mouseup', MouseUp);
    };
  }, dependencyAry);
};

export default useMouseEvent;
