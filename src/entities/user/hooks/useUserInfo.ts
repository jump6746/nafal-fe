import { useGetUserQuery } from '../queries';

const useUserInfo = () => {
  const { data, isLoading } = useGetUserQuery();
  return {
    userInfo: data?.data,
    isLoading,
  };
};

export default useUserInfo;
