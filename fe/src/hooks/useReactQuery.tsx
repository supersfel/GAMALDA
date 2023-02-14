import { UseQueryResult } from 'react-query';

/**
 * react-query 사용 시 로딩,오류처리의 반복되는 코드를 줄이는 hook
 * @param query : 선언해준 react 쿼리를 넣어주면 가능
 * @param res  : 로딩,에러가 없을 시 반환해줄 태그 혹은 값을 반환 (타입상관 X)
 * @returns
 */
const useReactQuery = (query: UseQueryResult<any, unknown>, res: any) => {
  return (
    <>{query.isLoading ? '로딩중...' : query.isError ? '에러 발생' : res}</>
  );
};

export default useReactQuery;
