import { useState, useEffect } from 'react';
import axios from "axios";

function useDataFetching (dataSource) {
  const [loading,setLoading] = useState(true);
  const [data,setData]= useState([]);
  const [surveyUrl, setSurveyUrl] = useState('');
  const [isSurveyCreated, setIsSurveyCreated] = useState(false);
  const [error, setError ] = useState('');

  const generateBitlyLink = async (surveyId) => {
    const response = await axios.post('http://localhost:3001/api/survey/generate-bitly', {
      surveyId: surveyId,
    });
    console.log(response);
    if(response.data.shortLink){
      const bitlyLink = response.data.shortLink;
      setSurveyUrl(bitlyLink);
      setIsSurveyCreated(true);
    }
    if(response.data.description){
      const message = response.data.description;
      setError(message);
    }
  };

  useEffect(()=>{
    async function fetchData(){
      try {
        const data = await fetch(dataSource);
        const result = await data.json();
        if (result) {
          setData(result);
          setSurveyUrl(`http://localhost:5173/survey/${result.id}`);
          //await generateBitlyLink(result.id);
          setIsSurveyCreated(true);
          setLoading(false);
        }
      }catch (e) {
        setLoading(false);
        setError(e.message);
      }
    }
    fetchData();
  },[dataSource]);
  return [loading, error, data, surveyUrl, isSurveyCreated];
}
export default  useDataFetching;