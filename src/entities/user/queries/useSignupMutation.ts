import { useMutation } from '@tanstack/react-query';
import signupApi from '../api/signupApi';
import { customToast } from '@/shared/ui';
import { useNavigate } from 'react-router-dom';

const useSignupMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      customToast.confirm('회원가입에 성공하였습니다.');
      navigate('/login');
    },
    onError: error => {
      if (error.status == 409) {
        customToast.warning('중복된 아이디가 존재합니다.');
      } else if (error.status == 400) {
        customToast.warning('비밀번호 형식이 올바르지 않습니다.');
      } else {
        customToast.warning(error.message);
      }
    },
  });
};

export default useSignupMutation;
