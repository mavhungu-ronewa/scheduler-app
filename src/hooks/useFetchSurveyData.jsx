import { useEffect, useState } from "react";
import axios from "axios";

function useFetchSurveyData(dataSource){
  const [surveyDatas, setSurveyData] = useState([])
  const [isLoading,setIsLoading] = useState(true);
  const [error, setError ] = useState();

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const response = await axios.get(dataSource);
        setSurveyData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setError(error);
        setIsLoading(false);
      }
    };
    fetchSurveyData();
  }, [dataSource]);
  return [isLoading, error, surveyDatas ];
}

export default useFetchSurveyData;