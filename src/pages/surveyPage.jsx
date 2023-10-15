import { useParams } from 'react-router-dom';
import { NavigationComponent, Spinner, SurveyCardComponent } from "../components";
import axios from 'axios';
import useDataFetching from "../hooks/useDataFetching.jsx";

const SurveyPage = () => {
  const { surveyId } = useParams();
  const [ loading, error, data , surveyUrl] = useDataFetching(`http://localhost:3001/api/survey/${surveyId}`);
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
            {data.error ?
              <p className={'items-center'}>Nothing has been found</p>
              :
              <SurveyCardComponent title={data.title} description={data.description} surveyId={data.id} onCopyLink={surveyUrl} onDelete={data.id}/>
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default SurveyPage;
