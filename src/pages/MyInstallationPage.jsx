
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FaDownload, FaStar, FaChevronDown, FaTrashAlt } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { appsData } from '../data/appsData'; 

const SORT_PREFERENCE_KEY = 'appSortPreference'; 

const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num;
};

const getSizeInMB = (sizeString) => {
  if (typeof sizeString !== 'string' || sizeString.trim().length === 0) return 0; 
  
  const match = sizeString.match(/(\d+(\.\d+)?)/);
  
  if (!match) return 0;
  return parseFloat(match[0]);
};


const MyInstallationPage = () => {
  const [installedApps, setInstalledApps] = useState([]);
  
  const [sortBy, setSortBy] = useState(() => {
    return localStorage.getItem(SORT_PREFERENCE_KEY) || 'size_desc'; 
  }); 

  const pageBg = "bg-white"; 
  const headerTextColor = "text-gray-900"; 
  const listBg = "bg-white"; 
  const uninstallBtnColor = "bg-[#2ECC71] hover:bg-[#25A65D]"; 

  useEffect(() => {
    localStorage.setItem(SORT_PREFERENCE_KEY, sortBy);
  }, [sortBy]); 
  const loadInstalledApps = useCallback(() => {
    const installedList = appsData.filter(app => 
        localStorage.getItem(`installedApp_${app.id}`) === 'true'
    );
    setInstalledApps(installedList);
  }, []);

  useEffect(() => {
    loadInstalledApps();
  }, [loadInstalledApps]);


  // Uninstal Handler
  const handleUninstall = useCallback((appId, appTitle) => {
    localStorage.removeItem(`installedApp_${appId}`);
    setInstalledApps(prevApps => prevApps.filter(app => app.id !== appId));

    toast.error(`${appTitle} Uninstalled Successfully!`, {
      duration: 3000,
      position: 'top-center',
    });
  }, []);


  const sortedApps = useMemo(() => {
    let currentApps = [...installedApps]; 

    currentApps.sort((a, b) => {
      const sizeA = getSizeInMB(a.size); 
      const sizeB = getSizeInMB(b.size);

      if (sortBy === 'size_desc') {
        return sizeB - sizeA; 
      }
      if (sortBy === 'size_asc') {
        return sizeA - sizeB;
      }
      return 0;
    });
    return currentApps;
  }, [installedApps, sortBy]); 


  const sortOptions = [
    { value: 'size_desc', label: 'Size (High to Low)' },
    { value: 'size_asc', label: 'Size (Low to High)' },
  ];

  const totalAppsFound = sortedApps.length;

  return (
    <div className={`py-12 ${pageBg} text-gray-900 min-h-[80vh]`}> 
      <Toaster />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className={`text-4xl font-extrabold ${headerTextColor}`}>
            Your Installed Apps
          </h1>
          <p className="text-gray-600 mt-2">
            Explore All Trending Apps on the Market developed by us
          </p>
        </div>

        {/* Control Bar (Count & Sort) */}
        <div className="flex justify-between items-center mb-6">
          
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-xl">{totalAppsFound}</span> Apps Found
          </p>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)} 
              className="appearance-none py-2 pl-4 pr-10 bg-white border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer text-sm shadow-sm"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-3 h-3 pointer-events-none" />
          </div>
        </div>

        {/* Installed Apps List */}
        <div className="space-y-4">
          {totalAppsFound > 0 ? (
            sortedApps.map((app) => (
              <div 
                key={app.id} 
                className={`flex items-center p-4 rounded-xl ${listBg} shadow-md border border-gray-200`}
              >
                
                {/* App Info Link */}
                <Link to={`/app/${app.id}`} className="flex items-center flex-grow space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center mr-2">
                    <img 
                        src={app.image} 
                        alt={app.title} 
                        className="w-full h-full object-contain p-1"
                    />
                    </div>

                    <div className="flex-grow">
                        <p className="text-lg font-semibold text-gray-900 truncate">{app.title}</p>
                        <div className="flex items-center text-sm space-x-4 mt-1">
                            <div className="flex items-center text-green-500">
                                <FaDownload className="w-3 h-3 mr-1" />
                                <span className="text-gray-600">{formatNumber(app.downloads)}</span>
                            </div>
                            <div className="flex items-center text-yellow-500">
                                <FaStar className="w-3 h-3 mr-1" />
                                <span className="text-gray-600">{app.ratingAvg}</span>
                            </div>
                            <span className="text-gray-600 font-medium">{app.size}</span>
                        </div>
                    </div>
                </Link>

                {/* Uninstall Button */}
                <button
                  onClick={() => handleUninstall(app.id, app.title)}
                  className={`flex-shrink-0 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ${uninstallBtnColor} flex items-center justify-center space-x-2 shadow-md`}
                >
                  <span>Uninstall</span>
                </button>
              </div>
            ))
          ) : (
            // No Apps Installed Message
            <div className="text-center py-10 bg-gray-50 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-600">No Apps Installed Yet</h2>
              <p className="text-gray-500 mt-2">Go to the Apps page and install your favorite ones!</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default MyInstallationPage;