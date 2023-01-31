/*  */
import {
  checkIsInViewport,
  useWindowScrollEvent,
} from 'hooks/useWindowScrollEvent';
import React, { useRef } from 'react';

const Intro_3 = () => {
  const fixRef = useRef<HTMLDivElement>(null);

  const handleScrollAnimation = () => {};
  useWindowScrollEvent(handleScrollAnimation);

  return (
    <div className="intro_3">
      <div ref={fixRef} className="fixed-area">
        asdfasdfasdfsdfsdf
      </div>
    </div>
  );
};

export default Intro_3;
