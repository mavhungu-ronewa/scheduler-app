import { Link } from "react-router-dom";

const NavigationComponent = ()=>{
  return (
    <nav className={'bg-blue-500 p-4'}>
      <div className={'container mx-auto flex justify-between items-center'}>
        <Link to={''}>Home</Link>
        <div className={'flex space-x-4'}>
          <Link to={''} className={'text-white'}>Gallery</Link>
          <Link to={''} className={'text-white'}>Contact</Link>
        </div>
      </div>
    </nav>
  )
}

export default NavigationComponent;