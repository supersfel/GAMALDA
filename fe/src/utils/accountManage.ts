// 이거는 나중에 accountManager에 있는 이미지 업로드 부분을 모듈화 해서 사용할 목적
import imageCompression from 'browser-image-compression';

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
  try {
    if (!(imgFile instanceof Blob) || !(imgFile instanceof File)) {
      return 'instance error';
    }
    if (!imgFile.type.startsWith('image/')) {
      return 'fileType error';
    }
    const compressedFile = await imageCompression(imgFile, options);
    const promise = imageCompression.getDataUrlFromFile(compressedFile);
    return await promise;
  }
  catch(e) {
    console.log(e);
  }
}

/**
 ** 사용 기각
 ** base64로 인코딩된 문자열을 FormData 형식으로 반환
 * @param base64Data 
 * @returns 
 */
export const formData = async (base64Data: string) => {
  // base64Data가 base64로 인코딩된 데이터 인지 검증하는 로직 필요
  const formData = new FormData();
  formData.append("image", base64Data);
  // // atob 함수를 이용해 base64로 인코딩된 데이터를 디코딩하여 byteString을 얻는다.(atob 함수는 base64디코드 함수로 사용됨)
  // const byteString = atob(base64Data.split(',')[1]);
  // // 바이트 문자열을 Blob으로 구성하기 위해 ArrayBuffer(바이트 레벨로 데이터를 다룰 수 있는 배열)을 생성
  // const ab = new ArrayBuffer(byteString.length);
  // // Uint8Array는 비트 부호 없는 정수형 배열로, 바이트 단위로 데이터가 배열에 저장되고 Blob 구성을 준비
  // const ia = new Uint8Array(ab).map((e, i) => e = byteString.charCodeAt(i));
  // const blob = new Blob([ia], {
  //   type: "image/jpeg"
  // });
  // const file = new File([blob], "image.jpg");
  
  // formData.append("image", file);
  try {
    // console.log('ddd')
    return formData;
  }
  catch (e) {
    // 에러처리
    console.log(e)
  }
}
