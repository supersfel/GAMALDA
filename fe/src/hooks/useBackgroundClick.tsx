import { useEffect } from 'react';
/**
 * 모달이 on된 상태에서 닫아주는 hook
 * @param ref ref.currunt를 넣으면 된다.
 * @param modalState boolean 형식으로 된 상태를 변경해주는 set함수를 넣어주면됨
 * @returns
 */
const useBackGroundClick = (
  ref: React.MutableRefObject<any> | null,
  modalState: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref === null) {
        return false;
      }
      if (ref?.current && !ref.current.contains(event.target)) {
        modalState(false);
        console.log('in');
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, [ref, modalState]);
};

export default useBackGroundClick;
