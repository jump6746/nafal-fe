import type { CreateAuctionStep } from '@/entities/auction/type';
import { Button, customToast, TextField } from '@/shared/ui';
import { useCallback, useState } from 'react';

interface Props {
  formData: CreateAuctionStep;
  updateAuctionSettings: (updates: Partial<CreateAuctionStep['auctionSettings']>) => void;
  onNext: () => void;
}

const CreateAuctionStep3_5 = ({ formData, onNext, updateAuctionSettings }: Props) => {
  const { startAt, endAt } = formData.auctionSettings;

  // 시작 날짜와 시간을 분리해서 관리하기 위한 로컬 상태
  const [startDate, setStartDate] = useState<string>(() => {
    if (startAt) {
      return startAt.toISOString().split('T')[0].replace(/-/g, '.');
    }
    return '';
  });

  const [startHour, setStartHour] = useState<string>(() => {
    if (startAt) {
      return startAt.getHours().toString();
    }
    return '';
  });

  const [startMinute, setStartMinute] = useState<string>(() => {
    if (startAt) {
      return startAt.getMinutes().toString().padStart(2, '0');
    }
    return '';
  });

  // 날짜와 시간을 분리해서 관리하기 위한 로컬 상태
  const [endDate, setEndDate] = useState<string>(() => {
    if (endAt) {
      return endAt.toISOString().split('T')[0].replace(/-/g, '.');
    }
    return '';
  });

  const [endHour, setEndHour] = useState<string>(() => {
    if (endAt) {
      return endAt.getHours().toString();
    }
    return '';
  });

  const [endMinute, setEndMinute] = useState<string>(() => {
    if (endAt) {
      return endAt.getMinutes().toString().padStart(2, '0');
    }
    return '';
  });

  // 시작 날짜/시간 업데이트
  const updateStartDateTime = useCallback(
    (date: string, hour: string, minute: string) => {
      if (date && hour && minute) {
        try {
          // YYYY.MM.DD 형식을 YYYY-MM-DD로 변환
          const formattedDate = date.replace(/\./g, '-');
          const dateTime = new Date(
            `${formattedDate}T${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00`
          );

          if (!isNaN(dateTime.getTime())) {
            updateAuctionSettings({ startAt: dateTime });
          }
        } catch (error) {
          console.error('시작 날짜 파싱 오류:', error);
        }
      }
    },
    [updateAuctionSettings]
  );

  // 종료 날짜/시간 업데이트
  const updateEndDateTime = useCallback(
    (date: string, hour: string, minute: string) => {
      if (date && hour && minute) {
        try {
          // YYYY.MM.DD 형식을 YYYY-MM-DD로 변환
          const formattedDate = date.replace(/\./g, '-');
          const dateTime = new Date(
            `${formattedDate}T${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00`
          );

          if (!isNaN(dateTime.getTime())) {
            updateAuctionSettings({ endAt: dateTime });
          }
        } catch (error) {
          console.error('날짜 파싱 오류:', error);
        }
      }
    },
    [updateAuctionSettings]
  );

  // 시작 날짜 변경 핸들러
  const handleStartDateChange = useCallback(
    (value: string) => {
      // YYYY.MM.DD 형식으로 포맷팅
      let formatted = value.replace(/[^\d]/g, '');
      if (formatted.length >= 4) {
        formatted = formatted.slice(0, 4) + '.' + formatted.slice(4);
      }
      if (formatted.length >= 7) {
        formatted = formatted.slice(0, 7) + '.' + formatted.slice(7, 9);
      }

      setStartDate(formatted);
      updateStartDateTime(formatted, startHour, startMinute);
    },
    [startHour, startMinute, updateStartDateTime]
  );

  // 시작 시간 변경 핸들러
  const handleStartHourChange = useCallback(
    (value: string) => {
      const numericValue = value.replace(/[^\d]/g, '');
      const hour = Math.min(parseInt(numericValue, 10) || 0, 23).toString();
      setStartHour(hour);
      updateStartDateTime(startDate, hour, startMinute);
    },
    [startDate, startMinute, updateStartDateTime]
  );

  // 시작 분 변경 핸들러
  const handleStartMinuteChange = useCallback(
    (value: string) => {
      const numericValue = value.replace(/[^\d]/g, '');
      const minute = Math.min(parseInt(numericValue, 10) || 0, 59).toString();
      setStartMinute(minute);
      updateStartDateTime(startDate, startHour, minute);
    },
    [startDate, startHour, updateStartDateTime]
  );

  // 날짜 변경 핸들러
  const handleEndDateChange = useCallback(
    (value: string) => {
      // YYYY.MM.DD 형식으로 포맷팅
      let formatted = value.replace(/[^\d]/g, '');
      if (formatted.length >= 4) {
        formatted = formatted.slice(0, 4) + '.' + formatted.slice(4);
      }
      if (formatted.length >= 7) {
        formatted = formatted.slice(0, 7) + '.' + formatted.slice(7, 9);
      }

      setEndDate(formatted);
      updateEndDateTime(formatted, endHour, endMinute);
    },
    [endHour, endMinute, updateEndDateTime]
  );

  // 시간 변경 핸들러
  const handleEndHourChange = useCallback(
    (value: string) => {
      const numericValue = value.replace(/[^\d]/g, '');
      const hour = Math.min(parseInt(numericValue, 10) || 0, 23).toString();
      setEndHour(hour);
      updateEndDateTime(endDate, hour, endMinute);
    },
    [endDate, endMinute, updateEndDateTime]
  );

  // 분 변경 핸들러
  const handleEndMinuteChange = useCallback(
    (value: string) => {
      const numericValue = value.replace(/[^\d]/g, '');
      const minute = Math.min(parseInt(numericValue, 10) || 0, 59).toString();
      setEndMinute(minute);
      updateEndDateTime(endDate, endHour, minute);
    },
    [endDate, endHour, updateEndDateTime]
  );

  const handleNext = () => {
    // 필수 필드 검증
    if (!startDate || startDate.length < 10) {
      customToast.warning('시작 일자를 올바르게 입력해주세요.');
      return;
    }
    if (!startHour || !startMinute) {
      customToast.warning('시작 시간을 입력해주세요.');
      return;
    }
    if (!endDate || endDate.length < 10) {
      customToast.warning('종료 일자를 올바르게 입력해주세요.');
      return;
    }
    if (!endHour || !endMinute) {
      customToast.warning('종료 시간을 입력해주세요.');
      return;
    }

    // 시작 시간과 종료 시간 검증
    const startDateTime = new Date(
      `${startDate.replace(/\./g, '-')}T${startHour.padStart(2, '0')}:${startMinute.padStart(2, '0')}:00`
    );
    const endDateTime = new Date(
      `${endDate.replace(/\./g, '-')}T${endHour.padStart(2, '0')}:${endMinute.padStart(2, '0')}:00`
    );

    if (startDateTime <= new Date()) {
      customToast.warning('시작 시간은 현재 시간보다 미래여야 합니다.');
      return;
    }

    if (endDateTime <= startDateTime) {
      customToast.warning('종료 시간은 시작 시간보다 늦어야 합니다.');
      return;
    }

    onNext();
  };

  return (
    <section className='flex h-full w-full flex-col gap-4.5 bg-green-50 pt-12 pb-9'>
      <div className='flex w-full flex-col gap-4.5 px-5'>
        {/* 시작 날짜/시간 */}
        <div className='flex flex-col gap-1'>
          <label htmlFor='startDate' className='font-semibold text-gray-900'>
            시작 일자
          </label>
          <TextField
            id='startDate'
            placeholder='YYYY.MM.DD'
            value={startDate}
            onChange={e => handleStartDateChange(e.target.value)}
            maxLength={10}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold text-gray-900'>시작 시간</label>
          <div className='flex gap-5.5'>
            <TextField
              className='w-20'
              placeholder='시'
              value={startHour}
              onChange={e => handleStartHourChange(e.target.value)}
              maxLength={2}
            />
            <TextField
              className='w-20'
              placeholder='분'
              value={startMinute}
              onChange={e => handleStartMinuteChange(e.target.value)}
              maxLength={2}
            />
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='endDate' className='font-semibold text-gray-900'>
            종료 일자
          </label>
          <TextField
            id='endDate'
            placeholder='YYYY.MM.DD'
            value={endDate}
            onChange={e => handleEndDateChange(e.target.value)}
            maxLength={10}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='' className='font-semibold text-gray-900'>
            종료 시간
          </label>
          <div className='flex gap-5.5'>
            <TextField
              className='w-20'
              placeholder='시'
              value={endHour}
              onChange={e => handleEndHourChange(e.target.value)}
              maxLength={2}
            />
            <TextField
              className='w-20'
              placeholder='분'
              value={endMinute}
              onChange={e => handleEndMinuteChange(e.target.value)}
              maxLength={2}
            />
          </div>
        </div>
      </div>
      <div className='mt-auto w-full px-5'>
        <Button className='w-full' onClick={handleNext}>
          다음
        </Button>
      </div>
    </section>
  );
};

export default CreateAuctionStep3_5;
