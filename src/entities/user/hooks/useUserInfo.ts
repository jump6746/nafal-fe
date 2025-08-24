import { useGetUserQuery } from '../queries';

const useUserInfo = () => {
  const { data } = useGetUserQuery();

  return {
    userInfo: data?.data,
  };
};

export default useUserInfo;
