interface UserInfo  {
  userName: string; // 이름은 사용자의 로그인한 정보를 redux같은 상태 관리툴로 가져와 부모 컴포넌트에서 전달하려한다.
  onClose: any
}

//  onClose의 타입은 테스트가 끝나면 알맞는 바꾸도록하자
const AccountInfoModal = ({ userName, onClose }: UserInfo) => {
  return (
      <div className="modal_info_box">
        <p className="username text">{userName}</p>
        <hr/>
        <button type="button" onClick={onClose}>닫기</button>
      </div>
  )
}

export default AccountInfoModal;