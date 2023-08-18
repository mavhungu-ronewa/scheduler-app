import { useState } from 'react';

const FormComponent =  ()=>{
   const [dates,setDates] = useState('');
   const [endTimes,setEndTime] = useState('');

   const handleSubmit = (e)=>{
     e.preventDefault();
     console.log(dates +" "+ endTimes);
     setDates('');
     setEndTime('');
   }
  return (
    <div className={'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <div className={'bg-white p-6 rounded-lg shadow-md w-96'}>
        <h1 className="text-2xl font-semibold mb-4">Scheduler Application</h1>
          <form onSubmit={handleSubmit}>
            <label className={'block mb-2'}>
              Date :
              <input type={'text'} className={'w-full border rounded py-2 px-3'} value={dates} onChange={(e)=>setDates(e.target.value)} />
            </label>
            <label className={'block mb-2'}>
              End Time:
              <input type={'text'} className={'w-full border rounded py-2 px-3'} value={endTimes} onChange={(e)=>setEndTime(e.target.value)} />
            </label>
            <button type={'submit'} className={'bg-blue-500 text-white py-2 px-4 rounded-full'}>Create Survey</button>
          </form>
      </div>
    </div>
  )
}

export default FormComponent;