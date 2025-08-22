// import { apiRequest } from '@/shared/lib';
// import type { AuctionList } from '@/entities/auction/type/types';
// import type { ResponseDTO } from '@/shared/types';

// export const getAuctionList = async (param: {
//   page: number;
//   size: number;
//   sort: 'NEW' | 'POPULAR' | 'CLOSE';
//   category: string[];
//   brand: string[];
//   event: string[];
//   minPrice: number;
//   maxPrice: number;
//   startAt: string;
//   endAt: string;
// }) => {
//   return apiRequest<undefined, ResponseDTO<AuctionList[]>>({
//     url: 'https://api.nafal.site/',
//     method: 'GET',
//     skipAuth: true,
//   });
// };
