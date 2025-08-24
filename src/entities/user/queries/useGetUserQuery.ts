import { useQuery } from '@tanstack/react-query';
import getUserApi from '../api/getUserApi';

const useGetUserQuery = () => {
  // 토큰이 있는지 확인
  const hasToken = () => {
    const token = sessionStorage.getItem('nafal-access');
    return !!token;
  };

  return useQuery({
    queryKey: ['user-info'],
    queryFn: getUserApi,
    enabled: hasToken(), // 토큰이 있을 때만 쿼리 실행
    retry: 1, // 실패 시 1번 재시도
    staleTime: 0, // 항상 fresh하지 않은 상태로 만들어 재검증 유도
    gcTime: 1000 * 60 * 5, // 5분간 가비지 컬렉션 방지 (기본값과 동일)
  });
};

export default useGetUserQuery;
