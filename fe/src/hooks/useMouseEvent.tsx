import { useEffect } from 'react';

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
