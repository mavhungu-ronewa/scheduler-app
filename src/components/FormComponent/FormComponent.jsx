import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { v4 as uuid } from 'uuid';
import { Spinner } from "../index.jsx";

const FormComponent =  ()=>{
  const { enqueueSnackbar } = useSnackbar();
  const [isSpinner,setIsSpinner] = useState(false);
  const [title, setTitle ] = useState('');
  const [description, setDescription ] = useState('');
  const [dates,setDates] = useState('');
  const [error,setError] = useState(null);
  const [surveyLink, setSurveyLink] = useState('');
  const [isSurveyCreated, setIsSurveyCreated] = useState(false);
  const naviagte = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const surveyId = uuid();

    if(!dates){
      setError("Please enter possible dates");
      return;
    }

    const surveyData = {
      title,
      description,
      surveyId,
      dates,
    };

    // try {
    //   const response = await axios.post('http://localhost:3001/api/survey', surveyData);
    //   // console.log('Survey Details:', response.data);
    //   console.log('Backend data', response.data);
    //   generateBitlyLink(surveyId);
    //
    // } catch (error) {
    //   console.error('Error:', error);
    //   setError('An error occurred while saving the survey.');
    // }

    try {
      setIsSpinner(true);
      const response = await axios.post('http://localhost:3001/api/survey', surveyData);
      const link = `http://localhost:5173/survey/${response.data.id}`;
      setSurveyLink(link);
      setIsSurveyCreated(true);
      setIsSpinner(false);
      enqueueSnackbar('Survey created',{variant: 'success'});
      naviagte(`/survey/${response.data.id}`)
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while saving the survey.', error);
      setIsSpinner(false);
      enqueueSnackbar('Something went wrong', {variant: 'error'});
    }
    setTitle('');
    setDescription('');
    setDates('');
    
  }

  const generateBitlyLink = async (surveyId) => {
    const response = await axios.post('http://localhost:3001/api/survey/generate-bitly', {
      surveyId: surveyId,
    });
    console.log(response);
    if(response.data.shortLink){
      const bitlyLink = response.data.shortLink;
      setSurveyLink(bitlyLink);
      setIsSurveyCreated(true);
    }
    if(response.data.description){
      const message = response.data.description;
      setError(message);
    }
  };

  const handleCopyLink = () => {
    const input = document.createElement('input');
    input.value = surveyLink;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  };

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
                  onChange={(e)=>setTitle(e.target.value)} />
              </label>
              <label className={'block mb-2'}>
                Description (optional)
                <input type={'text'} className={'w-full border py-2 px-3'}
                  onChange={(e)=>setDescription(e.target.value)}
                  placeholder={'Here you can include something like agenda, instructions'}/>
              </label>
              <label className={'block mb-3'}>
                Date
                <input type={'datetime-local'} className={'w-full border rounded py-2 px-3'}
                  value={dates} onChange={(e)=>setDates(e.target.value)} />
              </label>
              {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
              <button type={'submit'} className={'bg-blue-500 text-white py-2 px-4 rounded-full'}>Create Survey</button>
            </form>
            { isSurveyCreated && (
              <div className="mt-4">
                <p className="mb-2">Survey Link:</p>
                <div className="flex">
                  <input className="w-full border rounded py-2 px-3" type="text" value={surveyLink} readOnly />
                  <button className="bg-blue-500 text-white py-2 px-4 ml-2 rounded-full" onClick={handleCopyLink}>Copy</button>
                </div>
              </div>
            )}
          </div>
          </>
        }
    </div>
  )
}

export default FormComponent;