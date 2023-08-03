// 이거는 나중에 accountManager에 있는 이미지 업로드 부분을 모듈화 해서 사용할 목적
import imageCompression from 'browser-image-compression';

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