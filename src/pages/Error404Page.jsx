
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const Error404Page = () => {
  const navigate = useNavigate();
  
  const background = "bg-gray-50"; 
  const buttonColor = "bg-[#8000FF] hover:bg-[#6a00cc]"; 
  
  const errorImage = "/images/error-404.png"; 

  useEffect(() => {
    document.title = "404 - Page Not Found";
    return () => {
      document.title = "Hero.io App Gallery"; 
    };
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={`min-h-[80vh] flex flex-col items-center justify-center py-12 ${background}`}>
      <div className="text-center max-w-lg mx-auto">
        
        <div className="mb-10">
          <img 
            src={errorImage} 
            alt="404 Page Not Found Illustration" 
            className="w-full h-auto max-h-80"
          />
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Oops, page not found!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          The page you are looking for is not available or does not exist.
        </p>

        <button
          onClick={handleGoBack}
          className={`text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg ${buttonColor} flex items-center justify-center mx-auto space-x-2`}
        >
          <FaArrowLeft className="w-4 h-4" />
          <span>Go Back!</span>
        </button>
      </div>
    </div>
  );
};

export default Error404Page;