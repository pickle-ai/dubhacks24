// Home page component
import React from 'react';
import LoginButton from '@/components/login'

export default function Home() {

  return (
    <>
      <div className="font-mono text-center bg-emerald-700 h-screen border-black">
        <h1 className="text-center align-middle text-6xl font-extrabold">
          Pickle AI
        </h1>
        <p>Personalized feedback on your code solutions!</p>
        <p>{' '}</p>
        <LoginButton></LoginButton>
        {/* <Button className='bg-green-950 hover:bg-slate-500'>Log in</Button> <Button className='bg-green-950 hover:bg-slate-500'>Sign up</Button> */}
      </div>
    </>
  );
}
