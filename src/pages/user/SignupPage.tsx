import { useSignupMutation } from '@/entities/user/queries';
import { Button, TextField } from '@/shared/ui';
import { useEffect, useState } from 'react';

const SignupPage = () => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [idValue, setIdValue] = useState<string>('');
  const [pwValue, setPwValue] = useState<string>('');

  const signupMutate = useSignupMutation();

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

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signupMutate.mutate({
      username: idValue,
      password: pwValue,
      role: 'COMMON',
    });
  };

  return (
    <form
      className='flex h-full w-full flex-col items-start px-5 pt-10 pb-9'
      onSubmit={handleSignup}
    >
      <h1 className='text-2xl font-semibold text-gray-900'>회원가입</h1>
      <div className='flex w-full flex-col gap-4.5 pt-10'>
        <div className='relative flex flex-col gap-1'>
          <label htmlFor='username' className='font-semibold text-gray-900'>
            아이디
          </label>
          <TextField
            id='username'
            variant='default'
            className='w-full bg-gray-300'
            onChange={handleIdChange}
          />
        </div>
        <div className='relative flex flex-col gap-1'>
          <label htmlFor='password' className='font-semibold text-gray-900'>
            비밀번호
          </label>
          <TextField
            type='password'
            id='password'
            variant='default'
            className='w-full bg-gray-300'
            onChange={handlePwChange}
          />
        </div>
      </div>
      <Button type='submit' variant={'default'} disabled={!isValid} className='mt-auto w-full'>
        회원가입
      </Button>
    </form>
  );
};

export default SignupPage;
