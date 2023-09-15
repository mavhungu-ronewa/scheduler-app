import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavigationComponent, Spinner, SurveyCardComponent } from "../components";
import axios from 'axios';
import useDataFetching from "../hooks/useDataFetching.jsx";

const SurveyPage = () => {
  const { surveyId } = useParams();
  const [ loading, error, data ] = useDataFetching(`http://localhost:3001/api/survey/${surveyId}`);
  // const [surveyData, setSurveyData] = useState(null);
  //
  // useEffect(() => {
  //   const fetchSurveyData = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3001/api/survey/${surveyId}`);
  //       setSurveyData(response.data);
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };
  //   fetchSurveyData()
  //   ;
  // }, [surveyId]);

  return (
    <div>
      { loading || error ? (
        <div className={'bg-gray-100 min-h-screen flex items-center justify-center'}>
          {  <Spinner /> || error }
        </div>
      ) : (
        <div>
          <NavigationComponent />
          <h2>Survey ID: {data.id}</h2>
          <p>Dates: {data.dates}</p>
          {/* Display other survey data */}
          <SurveyCardComponent />
        </div>
      )}
    </div>
  );
}

export default SurveyPage;
