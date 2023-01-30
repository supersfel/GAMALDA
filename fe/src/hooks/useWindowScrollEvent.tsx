/* 스크롤 이벤트 훅 */
import { useEffect } from 'react';

// 스크롤이벤트 등록해주는 훅
export const useWindowScrollEvent = (
  listener: (this: Window, ev: Event) => any,
) => {
  useEffect(() => {
    window.addEventListener('scroll', listener);

    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, []);
};

//현재 viewport 안에 요소가 있는지 확인하는 함수
export const checkIsInViewport = (el: HTMLElement) => {
  if (!el || !window) {
    return false;
  }

  const { top: elementTop, bottom: elementBottom } = el.getBoundingClientRect();

  return elementBottom > 0 && elementTop <= window.innerHeight;
};
