import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from 'react-icons/fa';
import { FcOvertime } from "react-icons/fc";

const SurveyCardComponent = ({ title, surveyId, onDelete, onCopyLink })=>{
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="flex mx-auto justify-between mb-4 items-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          onClick={handleToggle}
        >
          Toggle
        </button>
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
            <div className="relative inline-block text-left">
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
                More
              </button>
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
            </div>
          </div>
        )}
      </div>
      <div className={''}>
        <>
          <FaTimes/>
          <p>Starting time</p>
        </>
        <>
          <FcOvertime/>
          <p>OverTime</p>
        </>
      </div>
    </div>
  )
}

export default SurveyCardComponent;