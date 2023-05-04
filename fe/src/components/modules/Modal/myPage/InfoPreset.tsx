
interface InfoPresetType{
  infoCategory: string;
  infoContent: string | string[];
}
const InfoPreset = ({ infoCategory, infoContent }: InfoPresetType) => {
  const isArrContent = Array.isArray(infoContent);
  const slicedInfoContent = isArrContent ? infoContent.slice(0, 3).join(', ') : infoContent ;
  const additionalNum = isArrContent ? infoContent.splice(3).length : 0 ;
  return (
    <div className='info_preset'>
      <div className='info_category'>
        <p>{infoCategory}</p>
      </div>
      <div className='info_content'>
        <p>{
          isArrContent && additionalNum > 0 ? (
            `${slicedInfoContent}  +  ${additionalNum}`
          ) : (
              slicedInfoContent
          )
        }</p>
      </div>
    </div>
  )
}

export default InfoPreset;