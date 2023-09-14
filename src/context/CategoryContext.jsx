import { createContext } from "react";
import useDataFetching from "../hooks/useDataFetching.jsx";

export const CategoryContext = createContext();

export const CategoryContextProvider = ({ children })=>{
  const [ loading, error, data ] = useDataFetching('https://fakestoreapi.com/category');
  return (
    <CategoryContext.Provider value={{ categorys:data, loading, error }}>
      {children}
    </CategoryContext.Provider>
  )
}

export default CategoryContext;