import { useMutation } from '@tanstack/react-query';
import signupApi from '../api/signupApi';
import { customToast } from '@/shared/ui';

const useSignupMutation = () => {
  return useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      customToast.confirm('회원가입에 성공하였습니다.');
    },
    onError: error => {
      if (error.status == 409) {
        customToast.warning('중복된 아이디가 존재합니다.');
      } else if (error.status == 400) {
        customToast.warning('비밀번호 형식이 올바르지 않습니다.');
      } else {
        customToast.warning('서버 에러로 다시 시도해주세요.');
      }
    },
  });
};

export default useSignupMutation;
