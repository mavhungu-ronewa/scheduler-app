import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from 'react-icons/fa';
import { FcOvertime } from "react-icons/fc";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const SurveyCardComponent = ({ title, surveyId, description, onDelete, onCopyLink })=>{
  const dropdownRef = useRef();
  const [isActive, setIsActive] = useState(false);
  const [isActives, setIsActives] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleSwitch = () => {
    setIsActives(!isActives);
  };

  const handleToggle = () => {
    setIsActive(!isActive);
  };

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
        <div className={'relative inline-block w-10 mr-2 align-middle select-none'}>
          <input type='checkbox' name={'toggle'} id='Blue' onChange={handleToggle} className={'checked:bg-blue-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer'}/>
          <label htmlFor='Blue' className={'block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer'} />
        </div>
        {isActive && (
          <div className="mt-2 space-x-4">
            <Link
              to={`/survey/edit/${surveyId}`}
              className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Edit
            </Link>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={onCopyLink}
            >
              Copy Link
            </button>
            <div className="relative inline-block text-left" ref={dropdownRef}>
              <button className="flex items-center bg-gray-300 text-gray-700 px-4 py-2 rounded-md" onClick={toggleDropdown}>
                More
                {isOpen ? <FaChevronUp className={`w-4 h-4 ml-2 transition-transform transform`}/>
                  : <FaChevronDown className={`w-4 h-4 ml-2 transition-transform transform`} /> }
              </button>
              {isOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <Link to={`/survey/invite/${surveyId}`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                    Email Invitation
                  </Link>
                  <button onClick={() => onDelete(surveyId)} className="block px-4 py-2 text-red-600 hover:bg-gray-100 hover:text-red-900" role="menuitem">
                    Delete
                  </button>
                </div>
              </div>
              )}
            </div>
            {/*<div className="relative inline-block text-left">
              <button
                onClick={toggleDropdown}
                className="px-4 py-2 text-gray-700 bg-gray-300 hover:bg-gray-400 rounded-md flex items-center focus:outline-none"
              >
                Toggle Dropdown
                <svg
                  className={`w-4 h-4 ml-2 transition-transform transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 7.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            {isOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-2">
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Item 1</a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Item 2</a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Item 3</a>
                </div>
              </div>
            )}
            </div>*/}
          </div>
        )}
      </div>
        <div>
          {
            description && (
              <div className={'mb-4'}>
                <h2>Description</h2>
              </div>
            )
          }
        </div>
        <div className={'flex justify-start items-center relative gap-3 mb-2'}>
          <FaTimes size={24}/>
          <p>Starting time</p>
        </div>
        <div className={'flex relative items-center gap-3 mb-2'}>
          <FcOvertime size={24}/>
          <p>OverTime</p>
        </div>
    </div>
  )
}

export default SurveyCardComponent;