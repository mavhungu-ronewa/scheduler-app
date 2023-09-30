import { FormComponent } from "./components";
import { Route, Routes } from "react-router-dom";
import { SurveyPage, PageNotFound, GetAllData, EditSurvey } from "./pages";

function App() {
  return (
    <Routes>
      <Route index element={<FormComponent />}/>
      <Route path={'survey'} element={<GetAllData/>}/>
      <Route path={'survey/:surveyId'} element={<SurveyPage/>} />
      <Route path={'survey/edit/:surveyId'} element={<EditSurvey/>} />
      <Route path={'survey/delete/:surveyId'} element={<SurveyPage/>} />
      <Route path={'*'} element={<PageNotFound/>} />
    </Routes>
  )
}

export default App
