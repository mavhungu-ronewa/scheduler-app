import { useEffect, useState } from "react";
import axios from "axios";
import { BackButton, CardComponent, Spinner } from "../components";

const GetAllData = ()=>{
  const [surveyDatas, setSurveyData] = useState([])
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/survey`);
        setSurveyData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }
    };
    fetchSurveyData();
  }, []);
  return (
    <>
      { isLoading ? (
        <div className={'bg-gray-100 min-h-screen flex items-center justify-center'}>
          <p>Mavhungu Ronewa loading</p>
          <Spinner />
        </div>
        ): (
          <>
            <BackButton/>
            <>
              {surveyDatas.map((surveyData, i)=>{
                return(
                  <CardComponent
                    key={i}
                    id={surveyDatas[i].id}
                    dates={surveyDatas[i].dates}
                  />
                )
              })}
            </>
          </>
        )
      }
    </>
  )
}
export default GetAllData;