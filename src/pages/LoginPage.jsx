import { useState } from "react";
const LoginPage = ()=>{
  const [username,setUserName] = useState('');
  const [password,setPassword] = useState('');

  const handleSubmitLoginForm = (e)=>{
    e.preventDefault();
    console.log('set values are', {username,password});
  }
  return (
    <>
      <form onSubmit={handleSubmitLoginForm}>
        <h3 className={'font-bold text-2xl center'}>Login Page</h3>
        <input type={'text'} name={'username'} onChange={(e)=>setUserName(e.target.value)}/>
        <input type={'password'} name={'password'} onChange={(e)=>setPassword(e.target.value)}/>
        <button type={'submit'}>Login</button>
      </form>
    </>
  )
}

export default LoginPage;