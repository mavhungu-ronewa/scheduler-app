import { useState, useEffect, useContext } from 'react';
import { NavigationComponent, Spinner } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import SurveyContext from "../context/SurveyContext.jsx";

const EditSurvey = ()=>{
  let navigate = useNavigate();
  const { surveyId } = useParams();
  const { loading, error, items, fetchItems }= useContext(SurveyContext);

  const [forms,setForm] = useState({
    title:"",
    description:"",
    dates:""
  });

  console.log(items);

  const handleForm =(e)=>{

    setForm({
      ...forms,
      [e.target.name]: e.target.value,
    })
  };
  const SubmitForm= (e)=>{
    e.preventDefault();
    console.log(forms);
  }

  useEffect(()=>{
    surveyId && fetchItems(surveyId);
  }, [fetchItems, surveyId]);

  return (
    <>
      <NavigationComponent />
      <div className={'bg-gray-100 min-h-screen flex items-center justify-center'}>
        { loading || error ?
          <>
            { <Spinner /> || error }
          </>
          :
          <div className={'bg-white p-6 rounded-lg shadow-md w-96'}>
            <form onSubmit={SubmitForm}>
              <input type={'text'} name={'title'} defaultValue={items.data.title} placeholder={'Enter the Title'} onChange={handleForm} className={'w-full border rounded py-2 px-3 mb-3'} />
              <input type={'text'} name={'description'} defaultValue={items.data.description} placeholder={'Enter the Description'} onChange={handleForm} className={'w-full border rounded py-2 px-3 mb-3'}/>
              <input type={'datetime-local'} name={'dates'} defaultValue={items.data.dates} onChange={handleForm} className={'w-full border rounded py-2 px-3 mb-3'}/>
              <button type={'submit'} className={'bg-blue-500 text-white py-2 px-4 rounded-full'}>Submit</button>
            </form>
          </div>
        }
      </div>
    </>
  )
}
export default EditSurvey;