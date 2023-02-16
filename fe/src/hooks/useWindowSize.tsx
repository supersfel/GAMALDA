/* vw를 리액트에서 사용할 수 있게 해주는 hook */
import { useEffect, useState } from 'react';

export const useWindowSize = () => {
  const [vw, setVw] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => setVw(window.innerWidth));
    return () =>
      window.removeEventListener('resize', () => setVw(window.innerWidth));
  });

  return vw;
};
