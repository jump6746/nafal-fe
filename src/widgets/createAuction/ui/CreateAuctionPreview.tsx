import useCreateAuctionMutation from '@/entities/auction/queries/useCreateAuctionMutation';
import type { CreateAuctionRequest, CreateAuctionStep } from '@/entities/auction/type';
import {
  getPresignedUrlAPI,
  getPresignedUrls,
  uploadAllToS3,
  uploadToS3API,
} from '@/entities/image/api';
import { formatKoreanDate } from '@/shared/lib/formatKoreanDate';
import { useTopNavigationStore } from '@/shared/stores';
import { Button, customToast } from '@/shared/ui';
import { AuctionProductCarousel } from '@/widgets/auction/ui';
import { useEffect, useState } from 'react';

interface Props {
  formData: CreateAuctionStep;
}

const CreateAuctionPreview = ({ formData }: Props) => {
  const [showOverlay, setShowOverlay] = useState<boolean>(true);
  const setText = useTopNavigationStore(state => state.setText);
  const postAuctionMutation = useCreateAuctionMutation();

  useEffect(() => {
    setText('미리보기');
  }, []);

  // 3초 후 자동으로 사라지게
  useEffect(() => {
    if (!showOverlay) {
      return;
    }

    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 2000); // 3초

    return () => clearTimeout(timer);
  }, [showOverlay]);

  const handleSubmit = async () => {
    try {
      const coreImageResponse = await getPresignedUrls({
        imageFiles: formData.productCoreInfo.imageFiles,
      });

      const coreImageData = await coreImageResponse;

      const uploadCoreImageResponse = await uploadAllToS3(
        formData.productCoreInfo.imageFiles,
        coreImageData
      );

      await uploadCoreImageResponse;

      const storyImageResponse = await getPresignedUrlAPI({
        imageFile: formData.storyDetails.imageFile,
      });

      const storyImageData = await storyImageResponse;

      const uploadStoryImageResponse = await uploadToS3API(
        formData.storyDetails.imageFile,
        storyImageData.data
      );

      await uploadStoryImageResponse;

      const newFormData: CreateAuctionRequest = {
        productCoreInfo: {
          title: formData.productCoreInfo.title,
          condition: formData.productCoreInfo.condition,
          categories: formData.productCoreInfo.categories,
          expectedEffect: formData.productCoreInfo.expectedEffect,
          imageKeys: coreImageData.map(item => item.data.s3Key),
        },
        productAttributes: {
          detailInfo: formData.productAttributes.detailInfo,
          tags: formData.productAttributes.tags,
          width: formData.productAttributes.width,
          height: formData.productAttributes.height,
        },
        productAdditionalInfo: {
          material: formData.productAdditionalInfo.material,
          usageLocation: formData.productAdditionalInfo.usageLocation,
          editionInfo: formData.productAdditionalInfo.editionInfo,
        },
        storyDetails: {
          content: formData.storyDetails.content,
          imageKey: storyImageData.data.s3Key,
        },
        auctionSettings: {
          startPrice: formData.auctionSettings.startPrice,
          bidIncrement: formData.auctionSettings.bidIncrement,
          immediatelyPurchasePrice: formData.auctionSettings.immediatelyPurchasePrice,
          startAt: formData.auctionSettings.startAt,
          endAt: formData.auctionSettings.endAt,
        },
        eventDetails: {
          name: formData.eventDetails.name,
          description: formData.eventDetails.description,
        },
        deliveryDetails: {
          method: formData.deliveryDetails.method,
          cost: formData.deliveryDetails.cost,
          note: formData.deliveryDetails.note,
        },
      };

      postAuctionMutation.mutate(newFormData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='relative h-full w-full overflow-auto'>
      {/* 사진 공간  */}
      <div className='relative'>
        <AuctionProductCarousel
          imageUrls={formData.productCoreInfo.imageFiles.map(item => item.preview)}
          setShowOverlay={setShowOverlay}
        />
        <div
          className={`absolute top-0 aspect-[3/2] w-full transition-opacity duration-1000 ${
            showOverlay ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <img
            src={formData.storyDetails.imageFile.preview}
            alt='스토리텔링 카드'
            className='h-full w-full object-cover'
          />
          <p className='absolute top-0 px-5 py-7.5 text-sm font-semibold whitespace-pre-wrap text-white'>
            {/* 현재는 공식 판매처에서도 구할 수 없고, 중고 시장에서도 <br />
            잘 나오지 않는 아이템이에요. <br />
            <br />
            KANU 팬들은 '잊을 수 없는 팝업의 상징'으로 여기며, <br />
            한정판 굿즈 수집가들에게는 놓칠 수 없는 보물이죠!! */}
            {formData.storyDetails.content}
          </p>
        </div>
      </div>
      {/* 경매 정보 공간 */}
      <div className='flex flex-col gap-3.5 px-5 pt-11 pb-4.5'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            {/* 브랜드 짧은 로고 */}
            <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 px-2'>
              <img src='/images/LOGO/LOGO_Signature.svg' alt='로고 시그니처' />
            </div>
            {/* 브랜드 긴 로고 */}
            <div className='aspect-[3/1] h-6'>
              <img src='/images/LOGO/LOGO_Monogram.svg' alt='브랜드 로고' />
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-1.5'>
          {/* 상품 이름 */}
          <div className='flex w-full justify-between'>
            <span className='text-lg font-bold text-gray-900'>
              {formData.productCoreInfo.title}
            </span>
            <span className='bg-point-200 text-point-900 rounded-full px-4 py-0.5 font-semibold'>
              {formData.productCoreInfo.condition}
            </span>
          </div>
          <div className='flex gap-1.5'>
            {formData.productCoreInfo.categories.map(category => (
              <span key={category} className='rounded-lg bg-gray-800 px-4.5 py-0.5 text-white'>
                {category}
              </span>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-2 pt-1'>
          {/* 현재가, 입찰 단위 */}
          <div className='flex gap-4.5'>
            <div className='flex flex-col gap-2'>
              <span className='text-sm font-medium text-gray-900'>현재가</span>
              <span className='text-2xl font-semibold text-gray-900'>
                {formData.auctionSettings.startPrice.toLocaleString()}원
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-sm font-medium text-gray-900'>입찰단위</span>
              <span className='text-2xl font-semibold text-gray-900'>
                {formData.auctionSettings.bidIncrement.toLocaleString()}원
              </span>
            </div>
          </div>
          {/* 남은 시간, 00명 참여중 */}
          <div className='flex flex-col gap-0.5'>
            <span className='text-sub-a-500 font-semibold'>
              마감 시간 {formData.auctionSettings.endAt.toISOString()}
            </span>
          </div>
        </div>
      </div>
      {/* divide */}
      <div className='h-4 w-full bg-gray-200'></div>
      <div className='bg-gray-50'>
        {/* 상품 상세 정보 */}
        <div className='mt-1.5 flex flex-col gap-4.5 bg-gray-50 px-5 pt-6'>
          {/* 등록일, 시작일, 종료일 */}
          <div className='flex flex-col text-sm font-medium text-gray-800'>
            <span>시작일 {formatKoreanDate(formData.auctionSettings.startAt.toISOString())}</span>
            <span>종료일 {formatKoreanDate(formData.auctionSettings.endAt.toISOString())}</span>
          </div>
          {/* 행사 */}
          <div className='gradient-border flex flex-col gap-3 rounded-[12px] p-4'>
            <h3 className='text-lg font-bold text-gray-800'>행사</h3>
            <div className='flex flex-col'>
              <span className='text-sm font-medium text-gray-600'>행사명</span>
              <span className='font-semibold text-gray-900'>{formData.eventDetails.name}</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-sm font-medium text-gray-600'>행사소개</span>
              <p className='text-sm font-medium text-gray-900'>
                {formData.eventDetails.description}
              </p>
            </div>
          </div>
          {/* 상품 */}
          <div className='gradient-border flex flex-col gap-3 rounded-[12px] p-4'>
            <h3 className='text-lg font-bold text-gray-800'>상품</h3>
            <div className='flex flex-col'>
              <span className='text-sm font-medium text-gray-600'>소개</span>
              <p className='text-sm font-medium text-gray-900'>
                {formData.productAttributes.detailInfo}
              </p>
            </div>
            <div className='flex gap-4.5'>
              {formData.productAttributes.tags.map(tag => (
                <span key={tag} className='text-sm font-semibold text-gray-900'>
                  #{tag}
                </span>
              ))}
            </div>
            <div className='flex flex-col'>
              <span className='text-sm font-medium text-gray-600'>사이즈</span>
              <span className='text-sm font-medium text-gray-900'>
                {'가로 ' +
                  formData.productAttributes.width +
                  'cm X 세로 ' +
                  formData.productAttributes.height +
                  'cm'}
              </span>
            </div>
            <div className='flex flex-col'>
              <span className='text-sm font-medium text-gray-600'>재질</span>
              <span className='text-sm font-medium text-gray-900'>
                {formData.productAdditionalInfo.material}
              </span>
            </div>
            <div className='flex flex-col'>
              <span className='text-sm font-medium text-gray-600'>사용위치</span>
              <span className='text-sm font-medium text-gray-900'>
                {formData.productAdditionalInfo.usageLocation}
              </span>
            </div>
            <div className='flex flex-col'>
              <span className='text-sm font-medium text-gray-600'>에디션정보</span>
              <span className='text-sm font-medium text-gray-900'>
                {formData.productAdditionalInfo.editionInfo}
              </span>
            </div>
          </div>
          {/* 배송 */}
          <div className='gradient-border flex flex-col gap-3 rounded-[12px] p-4'>
            <h3 className='text-lg font-bold text-gray-800'>배송</h3>
            <div className='flex flex-col'>
              <span className='text-sm font-medium text-gray-600'>배송방법</span>
              <span className='text-sm font-medium text-gray-900'>
                {formData.deliveryDetails.method}
              </span>
            </div>
            <div className='flex flex-col'>
              <span className='text-sm font-medium text-gray-600'>배송비용</span>
              <span className='text-sm font-medium text-gray-900'>
                {formData.deliveryDetails.cost}
              </span>
            </div>
            <div className='flex flex-col'>
              <span className='text-sm font-medium text-gray-600'>배송 참고사항</span>
              <span className='text-sm font-medium text-gray-900'>
                {formData.deliveryDetails.note}
              </span>
            </div>
          </div>
        </div>
        <div className='sticky right-0 bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-white py-9'>
          <Button className='w-full' onClick={handleSubmit}>
            등록하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateAuctionPreview;
