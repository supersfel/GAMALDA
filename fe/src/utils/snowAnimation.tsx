interface generateSnowParticlesType {
  (
    setParticles: React.Dispatch<React.SetStateAction<JSX.Element[]>>,
    windowSize: {
      windowWidth: number
      windowHeight: number
    }
  ): void
}

interface SnowParticlesType {
  (
    width: number,
    height: number
  ): JSX.Element[]
}

/**
 * setParticles를 prop으로 받아 
 * @param setParticles 
 * @param document 
 */
export const generateSnowParticles: generateSnowParticlesType = (setParticles, windowSize) => {
  setParticles([...SnowParticles(windowSize.windowWidth, windowSize.windowHeight)]);
}

/**
 * 눈 애니메이션에서 눈들의 위치 정보를 바탕으로 생성한 태그를 담은 배열을 반환해주는 함수
 * @param width : number
 * @param height : number
 * @returns particlesArray: Array(눈 조각 div 태그들)
 */
const SnowParticles: SnowParticlesType = (width, height): JSX.Element[] => {
  const border = ["50%", "0%"];
  const colors = ["#FF6B6B", "#FFE66D", "#ffffff"];
  const particlesArray: JSX.Element[] = [];

  for (let i = 0; i < width / 40; i++) {
    particlesArray.push(
      <div
        key={i}
        style={{
          position: "absolute",
          marginLeft: Math.floor(Math.random() * width) + 1 + "px",
          marginTop: Math.floor(Math.random() * height) + 1 + "px",
          width: Math.floor(5) + 5 + "px",
          height: Math.floor(5) + 5 + "px",
          opacity: Math.floor(Math.random() * 4) + 1 + "",
          backgroundColor: colors[Math.floor(Math.random() * 3)],
          borderRadius: border[Math.floor(Math.random() * 2)],
          animation: `move ${Math.floor(Math.random() * 12) + 8}s ease-in infinite`,
        }}
      />
    );
  }
  return particlesArray;
};