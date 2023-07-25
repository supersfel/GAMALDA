/* 토스트 모듈 관련 세팅 */
import React from 'react';
import { ToastContainer } from 'react-toastify';

/**
 * alert대신 아래 문구를 선택하면 된다
 ** toast.success("문구")
 ** toast.error("문구")
 ** toast.info("문구")
 ** toast.warning("문구")
 ** toast("문구")
 */
const Toast = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default Toast;
