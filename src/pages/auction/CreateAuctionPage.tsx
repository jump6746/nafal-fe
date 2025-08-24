import { CategoryFilter } from '@/features/main/ui';
import { Button, StatusDropDown, TextField } from '@/shared/ui';
import { useRef, useState } from 'react';

const CreateAuctionPage = () => {
  const [pos, setPos] = useState<string | undefined>(undefined);
  const [tag, setTag] = useState<string | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState<string[]>([]);
  const addCategory = (newCategory: string) => {
    setCategory(prev => [...prev, newCategory]);
  };
  const removeCategory = (categoryToRemove: string) => {
    setCategory(prev => prev.filter(cat => cat !== categoryToRemove));
  };
  return (
    <div className='h-full w-full' ref={containerRef}>
      {/* 1단계 */}
      <section className='flex h-full w-full flex-col gap-4 px-5 pt-12 pb-9'>
        <h2 className='text-xl font-extrabold text-gray-900'>제목</h2>
        <TextField placeholder='상품명을 입력하세요.' />
        <StatusDropDown pos={pos} setPos={setPos} />
        <CategoryFilter
          container={containerRef}
          category={category}
          addCategory={addCategory}
          removeCategory={removeCategory}
        />
        <label htmlFor='' className='font-semibold text-gray-900'>
          기대효과
        </label>
        <TextField placeholder='기대효과를 입력하세요.' />
        {/* 사진 미리보기 공간 */}
        <div className='aspect-[335/180] w-full rounded-xl bg-gray-200'></div>
        <label htmlFor='file' className='mt-auto flex cursor-pointer gap-3'>
          <img src='/images/Icons/add_photo.svg' alt='사진 추가' />
          <span className='font-semibold text-gray-900'>사진 올리기</span>
        </label>
        <input hidden id='file' type='file' className='' />
        <Button>다음</Button>
      </section>
      {/* 2단계 */}
      <section className='flex h-full w-full flex-col gap-4 bg-red-50 px-5 pt-12 pb-9'>
        <div className='flex flex-col'>
          <h2 className='text-[1.75rem] font-extrabold text-gray-900'>스토리카드</h2>
          <span className='text-sub-a-400 text-xs font-medium'>
            카드 배경 이미지를 꼭 첨부해주세요.
          </span>
        </div>
        <label htmlFor='story' className='font-semibold text-gray-900'>
          스토리 내용
        </label>
        <textarea
          name='story'
          id='story'
          placeholder='내용을 입력하세요'
          className='aspect-[335/130] w-full rounded-md bg-gray-50 px-6 py-3.5'
        ></textarea>
        {/* 사진 미리보기 공간 */}
        <div className='aspect-[335/180] w-full rounded-xl bg-gray-200'></div>
        <label htmlFor='file' className='mt-auto flex cursor-pointer gap-3'>
          <img src='/images/Icons/add_photo.svg' alt='사진 추가' />
          <span className=''>사진 올리기</span>
        </label>
        <input hidden id='file' type='file' className='' />
        <Button>다음</Button>
      </section>
      {/* 3단계 */}
      <section className='flex h-full w-full flex-col gap-4.5 bg-green-50 pt-12 pb-9'>
        <div className='flex w-full flex-col gap-4.5 px-5'>
          <div className='relative flex flex-col gap-1'>
            <label htmlFor='currentPrice' className='font-semibold text-gray-900'>
              현재가
            </label>
            <TextField id='currentPrice' variant='default' className='w-full' suffix='원' />
          </div>
          <div className='relative flex flex-col gap-1'>
            <label htmlFor='bidGap' className='font-semibold text-gray-900'>
              입찰단위
            </label>
            <TextField id='bidGap' variant='default' className='w-full' suffix='원' />
          </div>
        </div>
        <div className='h-3 w-full bg-gray-200'></div>
        <div className='flex w-full flex-col gap-4.5 px-5'>
          <div className='flex flex-col gap-1'>
            <label htmlFor='' className='font-semibold text-gray-900'>
              종료 일자
            </label>
            <TextField placeholder='YYYY.MM.DD' />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='' className='font-semibold text-gray-900'>
              종료 시간
            </label>
            <div className='flex gap-5.5'>
              <TextField className='w-20' placeholder='몇 시' />
              <TextField className='w-20' placeholder='몇 분' />
            </div>
          </div>
        </div>
        <div className='mt-auto w-full px-5'>
          <Button className='w-full'>다음</Button>
        </div>
      </section>
      {/* 4단계 */}
      <section className='flex h-full w-full flex-col gap-4.5 bg-red-50 px-5 pt-12 pb-9'>
        <h2 className='text-[1.75rem] font-extrabold text-gray-900'>행사</h2>
        <div className='w-full'>
          <label htmlFor='' className='font-semibold text-gray-900'>
            행사명
          </label>
          <TextField placeholder='행사명을 입력하세요.' />
        </div>
        <label htmlFor='eventDescript' className='font-semibold text-gray-900'>
          행사소개
        </label>
        <textarea
          name='eventDescript'
          id='eventDescript'
          placeholder='내용을 입력하세요'
          className='aspect-[335/130] w-full rounded-md bg-gray-50 px-6 py-3.5'
        ></textarea>
        <Button className='mt-auto w-full'>다음</Button>
      </section>
      {/* 5단계 */}
      <section className='flex h-full w-full flex-col gap-4.5 bg-blue-50 px-5 pt-12 pb-9'>
        <h2 className='text-[1.75rem] font-extrabold text-gray-900'>상품</h2>
        <label htmlFor='descript' className='font-semibold text-gray-900'>
          소개
        </label>
        <textarea
          name='descript'
          id='descript'
          placeholder='내용을 입력하세요 (25자 이내)'
          className='aspect-[335/130] w-full rounded-md bg-gray-50 px-6 py-3.5'
        ></textarea>
        <StatusDropDown pos={tag} setPos={setTag} />
        <div className='flex gap-5.5'>
          <div className='relative flex w-30 flex-col gap-1.5'>
            <label htmlFor='' className='font-semibold text-gray-900'>
              가로 사이즈
            </label>
            <TextField className='w-full' suffix='cm' />
          </div>
          <div className='relative flex w-30 flex-col gap-1.5'>
            <label htmlFor='' className='font-semibold text-gray-900'>
              세로 사이즈
            </label>
            <TextField className='w-full' suffix='cm' />
          </div>
        </div>
        <Button className='mt-auto w-full'>다음</Button>
      </section>
      {/* 6단계 */}
      <section className='flex h-full w-full flex-col gap-4.5 bg-green-50 px-5 pt-12 pb-9'>
        <h2 className='text-[1.75rem] font-extrabold text-gray-900'>상품</h2>
        <div className='w-full'>
          <label htmlFor='' className='font-semibold text-gray-900'>
            재질
          </label>
          <TextField placeholder='재질을 입력하세요.' />
        </div>
        <div className='w-full'>
          <label htmlFor='' className='font-semibold text-gray-900'>
            사용위치
          </label>
          <TextField placeholder='사용위치를 입력하세요.' />
        </div>
        <div className='w-full'>
          <label htmlFor='' className='font-semibold text-gray-900'>
            에디션정보
          </label>
          <TextField placeholder='에디션정보를 입력하세요.' />
        </div>
        <Button className='mt-auto w-full'>다음</Button>
      </section>
      {/* 7단계 */}
      <section className='flex h-full w-full flex-col gap-4.5 px-5 pt-12 pb-9'>
        <h2 className='text-[1.75rem] font-extrabold text-gray-900'>배송</h2>
        <div className='w-full'>
          <label htmlFor='' className='font-semibold text-gray-900'>
            배송방법
          </label>
          <TextField placeholder='배송방법을 입력하세요.' />
        </div>
        <div className='relative w-full'>
          <label htmlFor='' className='font-semibold text-gray-900'>
            배송비용
          </label>
          <TextField className='w-full' suffix='원' />
        </div>
        <div className='w-full'>
          <label htmlFor='' className='font-semibold text-gray-900'>
            배송 참고사항
          </label>
          <TextField placeholder='배송 참고사항을 입력하세요.' />
        </div>
        <Button className='mt-auto w-full'>다음</Button>
      </section>
    </div>
  );
};

export default CreateAuctionPage;
