import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ProductsContext from "../context/productsContext.jsx";
import CategoryContext from "../context/CategoryContext.jsx";
import { Spinner } from "../components/index.jsx";

const PageNotFound = ()=>{
  // const { loading, error, lists } = useContext(ProductsContext);
  const { loading, error, categories } = useContext(CategoryContext);
  /*console.log(lists);*/
  console.log(categories)
  return (
    <div className={'flex justify-center items-center h-screen'}>
      { loading || error ?
        ( <> { <Spinner/> || error }</>)
        : (
          <>
            <div className={'flex flex-col items-center'}>
              <img src={''} alt={'404'} className={'w-24 h-24 mb-4'} />
              <h1 className={'text-3xl font-semibold mb-2'}>404 - Not Found</h1>
              <p className={'text-gray-600'}>The page you are looking for does not exits</p>
              <Link to={'/survey'} className={'mt-4 text-blue-500 hover:underline'}>Go back</Link>
            </div>
          </>
        )
      }
    </div>
  )
}

export default PageNotFound;