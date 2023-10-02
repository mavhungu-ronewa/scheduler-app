import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { BsTextLeft, BsGlobe } from "react-icons/bs";
import { BiSolidVideo } from "react-icons/bi";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const SurveyCardComponent = ({ title, surveyId, description, onDelete, onCopyLink })=>{
  const dropdownRef = useRef();
  const surveyLink = onCopyLink;
  const [isActive, setIsActive] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleToggle = () => {
    setIsActive(!isActive);
    console.log(isActive);
  };

  const handleCopyLink = () => {
    const input = document.createElement('input');
    input.value = surveyLink;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  const handleDelete = (id)=>{
    try{
      const result = axios.delete(`http://localhost:3001/api/survey/${id}`);
      console.log(result);
      if(result){
        enqueueSnackbar('Survey created',{variant: 'success'});
        setTimeout(() => {
          navigate(`/survey`);
        }, 1500);
      }
    }catch (e) {
      enqueueSnackbar('Something went wrong', {variant: e.message});
    }
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 my-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="flex mx-auto justify-between mb-4 items-center">
        <div className={'flex justify-start'}>
          <div className={'relative inline-block w-10 mr-2 align-middle select-none'}>
            <input type='checkbox' name={'toggle'} id='Blue' defaultChecked={true} onChange={()=>handleToggle()} className={'checked:bg-blue-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer'}/>
            <label htmlFor='Blue' className={`block h-6 overflow-hidden rounded-full cursor-pointer ${isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
          </div>
          {isActive && (
            <span className={'ml-2'}>Link sharing is unable</span>
          )}
        </div>
        {isActive && (
          <div className="mt-2 space-x-4">
            <Link
              to={`/survey/edit/${surveyId}`}
              className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Edit
            </Link>
            <div className="relative inline-block">
              <input className="w-full border rounded py-2 px-3" type="text" value={surveyLink} readOnly hidden={true} />
              <button className={`bg-${isCopied ? 'green' : 'blue'}-500 text-white py-2 px-4 rounded-md mr-2`} onClick={handleCopyLink}>Copy</button>
            </div>
            <div className="relative inline-block text-left" ref={dropdownRef}>
              <button className="flex items-center bg-gray-300 text-gray-700 px-4 py-2 rounded-md" onClick={toggleDropdown}>
                More
                {isOpen ? <FaChevronUp className={`w-4 h-4 ml-2 transition-transform transform`}/>
                  : <FaChevronDown className={`w-4 h-4 ml-2 transition-transform transform`} /> }
              </button>
              {isOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <Link to={`/survey/invite/${surveyId}`} className="block px-4 py-2 w-full text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                    Email Invitation
                  </Link>
                  <button onClick={() =>handleDelete(onDelete)} className="block px-4 py-2 w-full text-red-600 hover:bg-gray-100 hover:text-red-900" role="menuitem">
                    Delete
                  </button>
                </div>
              </div>
              )}
            </div>
          </div>
        )}
      </div>
        <div>
          {
            description && (
              <div className={'flex justify-start items-center relative gap-3 mb-2'}>
                <BsTextLeft className={'text-gray-400'}/>
                <h2>{description}</h2>
              </div>
            )
          }
        </div>
        <div className={'flex relative items-center gap-3 mb-2'}>
          <MdOutlineAccessTime size={24} className={'text-gray-400'}/>
          <p>OverTime</p>
        </div>
        <div className={'flex justify-start items-center relative gap-3 mb-2'}>
          <FaLocationDot size={24} className={'text-gray-400'}/>
          <p>Starting time</p>
        </div>
        <div className={'flex relative items-center gap-3 mb-2'}>
          <BiSolidVideo size={24}/>
          <p>OverTime</p>
        </div>
        <div className={'flex relative items-center gap-3 mb-2'}>
          <BsGlobe size={24} className={'text-gray-400'}/>
          <p>OverTime</p>
        </div>
    </div>
  )
}

export default SurveyCardComponent;