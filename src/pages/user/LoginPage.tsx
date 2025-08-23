import { useLoginMutation } from '@/entities/user/queries';
import { Button, TextField } from '@/shared/ui';
import { useEffect, useState } from 'react';

const LoginPage = () => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [idValue, setIdValue] = useState<string>('');
  const [pwValue, setPwValue] = useState<string>('');

  const loginMutate = useLoginMutation();

  useEffect(() => {
    if (idValue.length > 0 && pwValue.length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [idValue, pwValue]);

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdValue(e.currentTarget.value);
  };

  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwValue(e.currentTarget.value);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginMutate.mutate({
      username: idValue,
      password: pwValue,
    });
  };

  return (
    <form
      className='flex h-full w-full flex-col items-center px-5 pt-40 pb-9'
      onSubmit={handleLogin}
    >
      <img src='/images/LOGO/LOGO_Monogram.svg' alt='나팔 로고' className='w-45' />
      <div className='flex w-full flex-col gap-4.5 pt-30'>
        <TextField
          className='w-full'
          placeholder='아이디를 입력하세요.'
          value={idValue}
          onChange={handleIdChange}
        />
        <TextField
          className='w-full'
          type='password'
          placeholder='비밀번호를 입력하세요.'
          value={pwValue}
          onChange={handlePwChange}
        />
      </div>
      <Button type='submit' variant={'default'} disabled={!isValid} className='mt-auto w-full'>
        로그인
      </Button>
    </form>
  );
};

export default LoginPage;
