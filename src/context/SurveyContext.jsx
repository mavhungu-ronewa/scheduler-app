import { createContext, useCallback, useState } from "react";
import axios from "axios";

export const SurveyContext = createContext();

export const SurveyContextProvider = ({ children })=>{
  const [loading,setLoading]= useState(true);
  const [items,setItems] = useState({});
  const [error,setError] = useState('');

  const fetchItems = useCallback(async (listId)=>{
    try {
      const result = await axios.get(`http://localhost:3001/api/survey/${listId}`);
      /*const result = await data.json();*/
      if(result){
        setItems(result);
        setLoading(false);
       /* console.log("items is", items);*/
      }
    }catch (e){
      setLoading(false);
      setError(e.message);
    }
  },[]);
  return (
    <SurveyContext.Provider value={{ items, loading, error, fetchItems }}>
      {children}
    </SurveyContext.Provider>
  )
}

export default SurveyContext;