import { createContext } from 'react';
import useDataFetching from "../hooks/useDataFetching";

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) =>{
  const [loading, error, data] = useDataFetching('https://fakestoreapi.com/products');
  return (
    <ProductsContext.Provider value={{lists: data, loading, error }}>
      {children}
    </ProductsContext.Provider>
  )
}

export default ProductsContext;