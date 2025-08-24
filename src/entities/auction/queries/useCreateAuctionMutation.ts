import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createAuctionApi } from '../api';
import { customToast } from '@/shared/ui';

const useCreateAuctionMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createAuctionApi,
    onSuccess: response => {
      customToast.confirm('경매 등록 성공!');
      navigate(`/auction/${response.data.newAuctionId}`);
    },
    onError: error => {
      customToast.warning(error.message);
    },
  });
};
export default useCreateAuctionMutation;
