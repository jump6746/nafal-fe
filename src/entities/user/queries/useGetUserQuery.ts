import { useQuery } from '@tanstack/react-query';
import getUserApi from '../api/getUserApi';

const useGetUserQuery = () => {
  return useQuery({
    queryKey: ['user-info'],
    queryFn: getUserApi,
    staleTime: 1000 * 60 * 999,
  });
};

export default useGetUserQuery;
