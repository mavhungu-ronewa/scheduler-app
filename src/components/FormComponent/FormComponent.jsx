import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { useSnackbar } from 'notistack';
import { Spinner } from "../index.jsx";

const FormComponent =  ()=>{
  const naviagte = useNavigate();
  const surveyId = uuid();
  const [isSpinner,setIsSpinner] = useState(false);
  const [isVideoCon, setIsVideoCon] = useState(false);
  const [error,setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const [forms, setForm] = useState({
    surveyId,
    title:'',
    description:'',
    location:'',
    videoService:'',
    duration:'',
    dates:''
  });

  const handleToggle = () => {
    setIsVideoCon(!isVideoCon);
  };
  const handleForm = (e)=>{
    e.preventDefault();
    const { name, value } = e.target;
    setForm({
      ...forms,
      [name]:value,
    })
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!forms.dates){
      setError("Please enter possible dates");
      return;
    }

    try {
      setIsSpinner(true);
      const response = await axios.post('http://localhost:3001/api/survey', forms);
      setIsSpinner(false);
      enqueueSnackbar('Survey created',{variant: 'success'});
      naviagte(`/survey/${response.data.id}`)
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while saving the survey.', error);
      setIsSpinner(false);
      enqueueSnackbar('Something went wrong', {variant: 'error'});
    }
  }

  return (
    <div className={'bg-gray-100 min-h-screen flex items-center justify-center'}>
      { isSpinner ?
        <Spinner/>
        :
        <>
        <div className={'bg-white p-6 rounded-lg shadow-md w-96'}>
          <h1 className="text-2xl font-semibold text-center mb-4">Scheduler Application</h1>
          <form onSubmit={handleSubmit}>
            <label className={'block mb-2'}>
              Title
              <input type={'text'} className={'w-full border rounded py-2 px-3'}
                placeholder={"What's the occasion?"}
                name={'title'}
                onChange={handleForm} required />
            </label>
            <label className={'block mb-2'}>
              Description (optional)
              <textarea
                className={'w-full border py-2 px-3'}
                onChange={handleForm}
                name={'description'}
                placeholder={'Here you can include something like agenda, instructions'} required />
            </label>
            <label className={'block mb-2'}>
              Location (optional)
              <input type={'text'} className={'w-full border rounded py-2 px-3'}
              name={'location'}
              onChange={handleForm}
              placeholder={'Enter location'}/>
            </label>
            <label className={'block mb-2'}>
              <div className={'flex justify-start mb-2 mt-2'}>
                <div className={'relative inline-block w-10 mr-2 align-middle select-none'}>
                  <input type='checkbox' name={'toggle'} id='Blue' onChange={()=>handleToggle()} className={'checked:bg-blue-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer'}/>
                  <label htmlFor='Blue' className={`block h-6 overflow-hidden rounded-full cursor-pointer ${isVideoCon ? 'bg-green-300' : 'bg-gray-300'}`} />
                </div>
                <span className={'ml-1 font-semibold'}>Video conferencing</span>
              </div>
              { isVideoCon && (
                <select className={'w-full border rounded py-2 px-3'} name={'videoService'} value={forms.videoService} onChange={handleForm}>
                  <option value="">Select video service</option>
                  <option value='zoom'>Zoom</option>
                  <option value='google-meet'>Google Meet</option>
                </select>
              )}
            </label>
            <label className={'block mb-2'}>
              Duration
              <select className={'w-full border rounded py-2 px-3'} name={'duration'} value={forms.duration} onChange={handleForm}>
                <option value="">Select duration</option>
                <option value={'15'}>15 Minutes</option>
                <option value={'30'}>30 Minutes</option>
                <option value={'45'}>45 Minutes</option>
                <option value={'60'}>60 Minutes</option>
              </select>
            </label>
            <label className={'block mb-3'}>
              Date
              <input type={'datetime-local'} className={'w-full border rounded py-2 px-3'} value={forms.dates} name={'dates'} onChange={handleForm} required />
            </label>
            {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
            <button type={'submit'} className="bg-blue-500 text-white py-2 px-4 rounded-full">Create Survey</button>
          </form>
        </div>
        </>
      }
    </div>
  )
}

export default FormComponent;