import { useState, useEffect } from 'react';

function useDataFetching (dataSource) {
  const [loading,setLoading] = useState(true);
  const [data,setData]= useState([]);
  const [surveyUrl, setSurveyUrl] = useState('');
  const [error, setError ] = useState('');

  useEffect(()=>{
    async function fetchData(){
      try {
        const data = await fetch(dataSource);
        const result = await data.json();
        if (result) {
          setData(result);
          setSurveyUrl(`http://localhost:5173/survey/${result.id}`);
          setLoading(false);
        }
      }catch (e) {
        setLoading(false);
        setError(e.message);
      }
    }
    fetchData();
  },[dataSource]);
  return [loading, error, data, surveyUrl];
}
export default  useDataFetching;