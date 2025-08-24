import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import loginApi from '../api/loginApi';
import { customToast } from '@/shared/ui';

const useLoginMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: response => {
      customToast.confirm('로그인 성공');

      sessionStorage.setItem('nafal-access', response.data.accessToken);

      queryClient.invalidateQueries({ queryKey: ['user-info'] });

      navigate(location.state?.from || '/');
    },
    onError: error => {
      if (error.status == 400) {
        customToast.warning('잘못된 형식입니다.');
      } else if (error.status == 401) {
        customToast.warning('아이디 또는 비밀번호가 일치하지 않습니다.');
      } else {
        customToast.warning(error.message);
      }
    },
  });
};

export default useLoginMutation;
