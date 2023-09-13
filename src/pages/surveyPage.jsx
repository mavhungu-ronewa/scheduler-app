import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SurveyPage = () => {
  const { surveyId } = useParams();
  const [surveyData, setSurveyData] = useState(null);

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/survey/${surveyId}`);
        console.log('surveyId and backend response',{surveyId, response})
        setSurveyData(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchSurveyData();
  }, [surveyId]);

  return (
    <div>
      <h1>Survey Page</h1>
      {surveyData ? (
        <div>
          <h2>Survey ID: {surveyData.id}</h2>
          <p>Dates: {surveyData.dates}</p>
          {/* Display other survey data */}
        </div>
      ) : (
        <p>Loading survey data...</p>
      )}
    </div>
  );
}

export default SurveyPage;
