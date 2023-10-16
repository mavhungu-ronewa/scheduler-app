import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import SurveyContext from "../context/SurveyContext.jsx";
import { NavigationComponent, Spinner } from "../components/index.jsx";

function EditSurvey() {
  const { surveyId } = useParams();
  const { items, loading, error, fetchItems } = useContext(SurveyContext);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dates: '',
  });

  useEffect(() => {
    fetchItems(surveyId); // Use fetchItems by passing surveyId
  }, [fetchItems, surveyId]);

  useEffect(() => {
    if (!loading && !error) {
      setFormData({
        title: items.title,
        description: items.description,
        dates: items.dates,
      });
    }
  }, [loading, error, items]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Saving data using the formData
    try {
      const result = await axios.put(`http://localhost:3001/api/survey/${surveyId}`, formData);
      console.log('returned values after update', result);
      /*if (result) {
        navigate('/survey');
      }*/
    } catch (error) {
      console.error('Error updating survey:', error);
    }
  };

  return (
    <>
      <NavigationComponent />
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        {loading || error ? (
          <>
            {loading ? <Spinner /> : error}
          </>
        ) : (
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter the Title"
                className="w-full border rounded py-2 px-3 mb-3"
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter the Description"
                className="w-full border rounded py-2 px-3 mb-3"
              />
            </div>
            <div>
              <label>Dates:</label>
              <input
                type="datetime-local"
                name="dates"
                value={formData.dates}
                onChange={handleInputChange}
                className="w-full border rounded py-2 px-3 mb-3"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-full">Save Changes</button>
          </form>
        </div>
          )}
      </div>
    </>
  );
}

export default EditSurvey;
