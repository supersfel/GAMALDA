// 이거는 나중에 accountManager에 있는 이미지 업로드 부분을 모듈화 해서 사용할 목적
import imageCompression from 'browser-image-compression';

/**
 ** 사용 기각
 ** base64로 인코딩된 문자열을 FormData 형식으로 반환
 * @param base64Data 
 * @returns 
 */
export const formData = async (base64Data: any) => { // any타입 수정하기
  const formData = new FormData();
  formData.append("image", base64Data, base64Data.name);
  try {
    return formData;
  }
  catch (e) {
    // 에러처리
    console.log(e)
  }
}

/**
 * 큰 이미지 파일의 크기와 화소를 낮춰주는 함수
 * @param imgFile: File 타입
 * @param maxSizeMB: number 제한 파일 크키
 * @param maxWidthOrHeight: number 높이, 너비
 * @returns base64로 인코딩된 문자열
 */
export const resizingImg = async (imgFile: File, maxSizeMB: number, maxWidthOrHeight: number) => {
  const options = {
    maxSizeMB: maxSizeMB,
    maxWidthOrHeight: maxWidthOrHeight
  }
  if (!(imgFile instanceof Blob) || !(imgFile instanceof File)) {
    return {
      'state': 'instance error',
      'file': null,
      'fileName': ''
    };
  }
  if (!imgFile.type.startsWith('image/')) {
    return {
      'state': 'fileType error',
      'file': null,
      'fileName': ''
    };
  }
  const compressedFile = await imageCompression(imgFile, options);
  const promise = await imageCompression.getDataUrlFromFile(compressedFile);
  return {
    'file': compressedFile,
    'fileName': promise
  }
}