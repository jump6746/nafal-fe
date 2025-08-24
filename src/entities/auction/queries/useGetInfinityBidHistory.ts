import { useInfiniteQuery } from '@tanstack/react-query';
import getBidHistoryApi from '../api/getBidHistoryApi';
import type { GetBidHistoryResponse } from '../type';

const useGetInfinityBidHistory = (auctionId: string) => {
  return useInfiniteQuery({
    queryKey: ['bid-history', auctionId],
    queryFn: async ({ pageParam }) => {
      const response = await getBidHistoryApi({
        auctionId,
        cursor: pageParam,
      });

      return response.data;
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage: GetBidHistoryResponse) => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    enabled: !!auctionId,
  });
};

export default useGetInfinityBidHistory;
