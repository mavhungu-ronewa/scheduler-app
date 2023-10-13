import { useEffect, useState } from "react";
import axios from "axios";

function useFetchSurveyData(dataSource){
  const [surveyDatas, setSurveyData] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [error, setError ] = useState();

  useEffect(() => {
    async function fetchSurveyData(){
      try {
        const response = await axios.get(dataSource);
        if(response.data){
          setSurveyData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        setError(error);
        setIsLoading(false);
      }
    }
    fetchSurveyData();
  }, [dataSource]);
  return [isLoading, error, surveyDatas ];
}

export default useFetchSurveyData;