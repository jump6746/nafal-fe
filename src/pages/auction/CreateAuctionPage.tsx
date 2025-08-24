import type { CreateAuctionStep } from '@/entities/auction/type';
import type { ImageFile } from '@/entities/image/type';
import { useTopNavigationStore } from '@/shared/stores';
import {
  CreateAuctionPreview,
  CreateAuctionStep1,
  CreateAuctionStep2,
  CreateAuctionStep3,
  CreateAuctionStep3_5,
  CreateAuctionStep4,
  CreateAuctionStep5,
  CreateAuctionStep6,
  CreateAuctionStep7,
} from '@/widgets/createAuction/ui';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateAuctionPage = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<CreateAuctionStep>({
    productCoreInfo: {
      title: '',
      condition: '',
      categories: [],
      expectedEffect: '',
      imageFiles: [],
    },
    productAttributes: {
      detailInfo: '',
      tags: [],
      width: 0,
      height: 0,
    },
    productAdditionalInfo: {
      material: '',
      usageLocation: '',
      editionInfo: '',
    },
    storyDetails: {
      content: '',
      imageFile: {} as ImageFile,
    },
    auctionSettings: {
      startPrice: 0,
      bidIncrement: 0,
      immediatelyPurchasePrice: 0,
      startAt: new Date(),
      endAt: new Date(),
    },
    eventDetails: {
      name: '',
      description: '',
    },
    deliveryDetails: {
      method: '',
      cost: 0,
      note: '',
    },
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const setOnClick = useTopNavigationStore(state => state.setOnClick);
  const clearOnClick = useTopNavigationStore(state => state.clearOnClick);

  const TOTAL_STEPS = 9;

  // 헬퍼 함수들 - 각 섹션별 업데이트를 쉽게 만들어줌
  const updateProductCoreInfo = useCallback(
    (updates: Partial<CreateAuctionStep['productCoreInfo']>) => {
      setFormData(prev => ({
        ...prev,
        productCoreInfo: { ...prev.productCoreInfo, ...updates },
      }));
    },
    []
  );

  const updateProductAttributes = useCallback(
    (updates: Partial<CreateAuctionStep['productAttributes']>) => {
      setFormData(prev => ({
        ...prev,
        productAttributes: { ...prev.productAttributes, ...updates },
      }));
    },
    []
  );

  const updateProductAdditionalInfo = useCallback(
    (updates: Partial<CreateAuctionStep['productAdditionalInfo']>) => {
      setFormData(prev => ({
        ...prev,
        productAdditionalInfo: { ...prev.productAdditionalInfo, ...updates },
      }));
    },
    []
  );

  const updateStoryDetails = useCallback((updates: Partial<CreateAuctionStep['storyDetails']>) => {
    setFormData(prev => ({
      ...prev,
      storyDetails: { ...prev.storyDetails, ...updates },
    }));
  }, []);

  const updateAuctionSettings = useCallback(
    (updates: Partial<CreateAuctionStep['auctionSettings']>) => {
      setFormData(prev => ({
        ...prev,
        auctionSettings: { ...prev.auctionSettings, ...updates },
      }));
    },
    []
  );

  const updateEventDetails = useCallback((updates: Partial<CreateAuctionStep['eventDetails']>) => {
    setFormData(prev => ({
      ...prev,
      eventDetails: { ...prev.eventDetails, ...updates },
    }));
  }, []);

  const updateDeliveryDetails = useCallback(
    (updates: Partial<CreateAuctionStep['deliveryDetails']>) => {
      setFormData(prev => ({
        ...prev,
        deliveryDetails: { ...prev.deliveryDetails, ...updates },
      }));
    },
    []
  );

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    }
  };

  useEffect(() => {
    setOnClick(() => {
      if (currentStep > 1) {
        setCurrentStep(prev => prev - 1);
      } else {
        navigate(-1);
      }
    });

    return () => {
      clearOnClick();
    };
  }, [currentStep]);

  const renderStep = () => {
    const commonProps = {
      formData,
      onNext: nextStep,
    };

    switch (currentStep) {
      case 1:
        return (
          <CreateAuctionStep1
            {...commonProps}
            onNext={nextStep}
            container={containerRef}
            updateProductCoreInfo={updateProductCoreInfo}
          />
        );
      case 2:
        return <CreateAuctionStep2 {...commonProps} updateStoryDetails={updateStoryDetails} />;
      case 3:
        return (
          <CreateAuctionStep3 {...commonProps} updateAuctionSettings={updateAuctionSettings} />
        );
      case 4:
        return (
          <CreateAuctionStep3_5 {...commonProps} updateAuctionSettings={updateAuctionSettings} />
        );
      case 5:
        return <CreateAuctionStep4 {...commonProps} updateEventDetails={updateEventDetails} />;
      case 6:
        return (
          <CreateAuctionStep5 {...commonProps} updateProductAttributes={updateProductAttributes} />
        );
      case 7:
        return (
          <CreateAuctionStep6
            {...commonProps}
            updateProductAdditionalInfo={updateProductAdditionalInfo}
          />
        );
      case 8:
        return (
          <CreateAuctionStep7 {...commonProps} updateDeliveryDetails={updateDeliveryDetails} />
        );
      case 9:
        return <CreateAuctionPreview {...commonProps} />;
    }
  };

  return (
    <div className='relative h-full w-full overflow-hidden' ref={containerRef}>
      <div className='h-full'>
        <div key={currentStep} className={`h-full w-full`}>
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default CreateAuctionPage;
