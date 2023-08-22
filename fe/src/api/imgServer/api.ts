import { postApi } from 'utils/httpApi';
/**
 * 
 * @param img: File
 * @reurn {"message": string, "imageUrl": string}
 */
export const uploadImgAPI = async (
  imgFormData: FormData
) => {
  const res = await fetch(`${process.env.REACT_APP_IMGUPLOAD_URL}`, {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // },
    body: imgFormData
  });
  return res;
}