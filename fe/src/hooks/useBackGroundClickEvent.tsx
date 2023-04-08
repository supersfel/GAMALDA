import { offModal } from 'modules/modal';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

/**
 * 모달이 on된 상태에서 닫아주는 hook
 * @param ref ref.currunt를 넣으면 된다.
 * @returns
 */
const useBackGroundClickEvent = (ref: React.MutableRefObject<any> | null) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref === null || ref.current === null) {
        return false;
      }
      if (ref.current.contains(event.target)) {
        return false;
      }
      dispatch(offModal());
    };

    window.addEventListener('mousedown', handleClick);
    return () => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, [ref, dispatch]);
};

export default useBackGroundClickEvent;
