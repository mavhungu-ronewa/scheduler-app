import { useParams } from 'react-router-dom';
import { NavigationComponent, Spinner, SurveyCardComponent } from "../components";
import axios from 'axios';
import useDataFetching from "../hooks/useDataFetching.jsx";

const SurveyPage = () => {
  const { surveyId } = useParams();
  const [ loading, error, data , surveyUrl, isSurveyCreated] = useDataFetching(`http://localhost:3001/api/survey/${surveyId}`);

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
              <SurveyCardComponent title={data.title} description={data.description} location={data.location} videoService={data.videoService} duration={data.duration} surveyId={data.id} onCopyLink={surveyUrl} onDelete={data.id} createdSurvey={isSurveyCreated}/>
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default SurveyPage;
