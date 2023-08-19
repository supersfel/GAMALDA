import { postApi } from 'utils/api';
/**
 * 
 * @param img: File
 * @reurn {"message": string, "imageUrl": string}
 */
export const uploadImgAPI = async (
  imgFile: File
) => {
  return postApi(
    'http://gamalda.site:9000/upload',
    {
      'image': imgFile
    }
  )
}