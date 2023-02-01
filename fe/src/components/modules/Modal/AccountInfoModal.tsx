import ModalPortal from 'components/modules/Modal/ModalPortal'

//  onClose의 타입은 테스트가 끝나면 알맞는 바꾸도록하자
const AccountInfoModal = ({ onClose }: any) => {
  return (
    <ModalPortal>
      <div className="modal_info_box">
        <h3>test</h3>
        <button type="button" onClick={onClose}>닫기</button>
      </div>
    </ModalPortal>
  )
}

export default AccountInfoModal;