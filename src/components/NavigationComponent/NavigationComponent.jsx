import { Link } from "react-router-dom";

const NavigationComponent = ()=>{
  return (
    <div className={'flex row'}>
      <Link to={''}>Home</Link>
      <div className={'flex gap-3'}>
        <Link to={''}>Gallery</Link>
        <Link to={''}>Contact</Link>
      </div>
    </div>
  )
}

export default NavigationComponent;