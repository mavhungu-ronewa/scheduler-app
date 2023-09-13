import { FormComponent } from "./components";
import { Route, Routes } from "react-router-dom";
import { SurveyPage, PageNotFound, GetAllData } from "./pages";

function App() {
  return (
    <Routes>
      <Route index element={<FormComponent />}/>
      <Route path={'survey/:surveyId'} element={<SurveyPage/>} />
      <Route path={'survey'} element={<GetAllData/>}/>
      <Route path={'*'} element={<PageNotFound/>} />
    </Routes>
  )
}

export default App
