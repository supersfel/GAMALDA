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
    // createPortal(
    //   <div>
    //     <header>
    //       <h2>{title}</h2>
    //     </header>
    //     <main>
    //       <p>{children}</p>
    //     </main>
    //     <footer>
    //       <button onClick={onClose}>취소</button>
    //     </footer>
    //   </div>, document.getElementById("modal") as HTMLElement)
    createPortal(<>{children}</>, document.getElementById("modal") as HTMLElement)
  )
};

export default Modal;