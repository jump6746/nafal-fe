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
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
  });
};

export default useGetUserQuery;
