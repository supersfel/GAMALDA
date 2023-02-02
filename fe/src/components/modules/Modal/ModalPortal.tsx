import { createPortal } from 'react-dom';


// 모달 파트
// interface Props {
//   title?: string
//   value?: string
//   children?: React.ReactNode
//   onConfirm?: () => void
//   onClose?: () => void
//   onChange?: (e: React.FormEvent<HTMLInputElement>) => void
// }
interface Props {
  children?: React.ReactNode
}

const Modal: React.FC<Props> = ({ children }) => {
  return (
    createPortal(<>{children}</>, document.getElementById("modal") as HTMLElement)
  )
};
// 아래와 같은 방식으로 사용
{/* <ModalPortal>
      <div className="modal_info_box">
        <h3>test</h3>
        <button type="button" onClick={onClose}>닫기</button>
      </div>
    </ModalPortal> */}

export default Modal;