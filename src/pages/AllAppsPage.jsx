
import React, { useState, useMemo } from 'react';
import { FaSearch, FaChevronDown } from 'react-icons/fa'; 
import AppCard from '../components/AppCard'; 
import { appsData } from '../data/appsData'; 
import ErrorAppNotFound from '../components/ErrorAppNotFound'; 

const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num;
};

const AllAppsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('downloads_desc'); 

  // Sorting Options
  const sortOptions = [
    { value: 'downloads_desc', label: 'Downloads (High to Low)' },
    { value: 'downloads_asc', label: 'Downloads (Low to High)' },
    { value: 'rating_desc', label: 'Rating (High to Low)' },
  ];

  const filteredAndSortedApps = useMemo(() => {
    let currentApps = [...appsData]; 

    // 1. Filtering (Searching)
    if (searchTerm) {
      currentApps = currentApps.filter(app => 
        app.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Sorting
    currentApps.sort((a, b) => {
      if (sortBy === 'downloads_desc') {
        return b.downloads - a.downloads;
      }
      if (sortBy === 'downloads_asc') {
        return a.downloads - b.downloads;
      }
      if (sortBy === 'rating_desc') {
        return b.ratingAvg - a.ratingAvg;
      }
      return 0; 
    });

    return currentApps;
  }, [searchTerm, sortBy]); 

  const totalAppsFound = filteredAndSortedApps.length;
  const accentColor = "text-[#8000FF]"; 

  if (totalAppsFound === 0 && searchTerm !== '') {
    return <ErrorAppNotFound searchTerm={searchTerm} />; 
  }


  return (
    <div className="bg-blend-soft-light min-h-[80vh] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 1. Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-black">Our All Applications</h1>
          <p className="text-gray-500 mt-2">
            Explore All Apps on the Market developed by us
          </p>
        </div>

        {/* 2. Control Bar (Count, Search, Sort) */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 space-y-4 md:space-y-0">
          
          {/* App Count */}
          <p className="text-lg font-semibold text-black">
            <span className={accentColor}>{totalAppsFound}</span> Apps Found
          </p>

          <div className="flex items-center space-x-4 w-full md:w-auto">
            
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search app..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 pl-10 pr-4 bg-[#ffffff] border border-[#374151] text-black rounded-lg focus:outline-none focus:border-[#8000FF]"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none py-2 pl-4 pr-10 bg-[#ffffff] border border-[#374151] text-black rounded-lg focus:outline-none focus:border-[#8000FF] cursor-pointer"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 3. Apps Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAndSortedApps.map((app) => (
            <AppCard key={app.id} app={app} formatNumber={formatNumber} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default AllAppsPage;