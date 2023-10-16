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
  const [error,setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const [forms, setForm] = useState({
    surveyId,
    title:'',
    description:'',
    dates:''
  });
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