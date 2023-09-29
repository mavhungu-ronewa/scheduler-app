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

  const generateBitlyLink = async (surveyId) => {
    const response = await axios.post('http://localhost:3001/api/survey/generate-bitly', {
      surveyId: surveyId,
    });
    console.log(response);
    if(response.data.shortLink){
      const bitlyLink = response.data.shortLink;
      setSurveyLink(bitlyLink);
      setIsSurveyCreated(true);
    }
    if(response.data.description){
      const message = response.data.description;
      setError(message);
    }
  };

  const handleCopyLink = () => {
    const input = document.createElement('input');
    input.value = surveyLink;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  };

  return (
    <div>
      { loading || error ? (
        <div className={'bg-gray-100 min-h-screen flex items-center justify-center'}>
          {  <Spinner /> || error }
        </div>
      ) : (
        <div>
          <NavigationComponent />
          <div className={'container mx-auto'}>
            <SurveyCardComponent title={data.title} description={data.description} surveyId={data.id} onCopyLink={''} onDelete={data.id}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default SurveyPage;
