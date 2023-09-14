import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { NavigationComponent, Spinner } from "../components";

const SurveyPage = () => {
  const { surveyId } = useParams();
  const [surveyData, setSurveyData] = useState(null);

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/survey/${surveyId}`);
        setSurveyData(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchSurveyData()
    ;
  }, [surveyId]);

  return (
    <div>
      {surveyData ? (
        <div>
          <NavigationComponent />
          <h2>Survey ID: {surveyData.id}</h2>
          <p>Dates: {surveyData.dates}</p>
          {/* Display other survey data */}
        </div>
      ) : (
        <div className={'bg-gray-100 min-h-screen flex items-center justify-center'}>
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default SurveyPage;
