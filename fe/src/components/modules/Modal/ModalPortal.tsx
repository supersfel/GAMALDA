import { createPortal } from 'react-dom';


// 모달 파트
interface Props {
  children?: React.ReactNode
}

const Modal: React.FC<Props> = ({ children }) => {
  return (
    createPortal(<>{children}</>, document.getElementById("modal") as HTMLElement)
  )
};
// 아래와 같은 방식으로 사용
{/* createPortal은 첫번째 인자는 이동시킬 컴포넌트, 두번째 인자는 컴포넌트가 이동될 위치입니다.
  <ModalPortal>
    <div className="modal_info_box">
      <h3>test</h3>
      <button type="button" onClick={onClose}>닫기</button>
    </div>
  </ModalPortal> 
  
  컴포넌트 사용 예시
  <Modal children={여기에 넣고싶은 컴포넌트를 넣어준다.} />
*/}

export default Modal;