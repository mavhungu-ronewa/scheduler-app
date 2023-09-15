import { BackButton, CardComponent, Spinner } from "../components";
import useFetchSurveyData from "../hooks/useFetchSurveyData.jsx";

const GetAllData = ()=>{
  const [ isLoading, error, surveyDatas ] = useFetchSurveyData(`http://localhost:3001/api/survey`);
  return (
    <>
      { isLoading || error ? (
        <div className={'bg-gray-100 min-h-screen flex items-center justify-center'}>
          { <Spinner /> || error }
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