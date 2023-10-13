import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx';
import './index.css';
import { SnackbarProvider } from "notistack";
/*import { ProductsContextProvider } from "./context/productsContext";
import { CategoryContextProvider } from "./context/CategoryContext.jsx";*/
import { SurveyContextProvider } from "./context/SurveyContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/*<ProductsContextProvider>
        <CategoryContextProvider>*/}
          <SurveyContextProvider>
            <SnackbarProvider>
              <App />
            </SnackbarProvider>
          </SurveyContextProvider>
       {/* </CategoryContextProvider>
      </ProductsContextProvider>*/}
    </BrowserRouter>
  </React.StrictMode>
);
