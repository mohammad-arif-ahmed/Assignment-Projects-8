
import React from 'react';
import { Link } from 'react-router-dom';
import { FaDownload, FaStar } from 'react-icons/fa';

const AppCard = ({ app, formatNumber }) => {
  if (!app) return null;

  const cardBg = "bg-[#FFF0E1]"; 
  
  const downloadColor = "bg-green-100/20 text-green-300";
  
  const ratingColor = "bg-yellow-100/20 text-yellow-300";

  return (
    <Link 
      to={`/app/${app.id}`} 
      className={`block p-4 rounded-xl shadow-lg ${cardBg} transition duration-300 transform hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#8000FF]/20`}
    >
      <div className="flex flex-col h-full">
        
        <div className="aspect-square bg-white rounded-xl mb-4 overflow-hidden flex items-center justify-center p-2"> 
          <img 
            src={app.image} 
            alt={app.title} 
            className="w-full h-full object-contain p-2" 
          />
        </div>
        
        <h3 className="text-base font-semibold text-black mb-3 truncate">
          {app.title}
        </h3>
        
        <div className="flex justify-between items-center text-sm mt-auto">
          
          <div className={`flex items-center space-x-1 p-1 pr-2 rounded-full ${downloadColor}`}>
            <FaDownload className="w-3 h-3 ml-1" />
            <span className="font-medium text-xs">
              {formatNumber(app.downloads)}
            </span>
          </div>

          <div className={`flex items-center space-x-1 p-1 pr-2 rounded-full ${ratingColor}`}>
            <FaStar className="w-3 h-3 ml-1" />
            <span className="font-medium text-xs">
              {app.ratingAvg}
            </span>
          </div>
        </div>
        
      </div>
    </Link>
  );
};

export default AppCard;