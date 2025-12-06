
import React from 'react';
import { Link } from 'react-router-dom';
import { FaGooglePlay, FaApple } from 'react-icons/fa'; 
import { appsData } from '../data/appsData'; 
import AppCard from '../components/AppCard'; 

const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num;
};

const HomePage = () => {
  
  
  const renderBanner = () => (
    <section className="py-8 md:py-24 text-center bg-blend-soft-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="max-w-4xl mx-auto z-10 relative">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 text-black">
            We Build <br /> <span className="text-purple-700">Productive </span> Apps
          </h1>
          <p className="text-gray-400 mb-8 max-w-3xl mx-auto">
            At HERO.IO , we craft innovative apps designed to make everyday life simpler, smarter, and more exciting.Our goal is to turn your ideas into digital experiences that truly make an impact.
          </p>

          {/* Buttons (Google Play & App Store) */}
          <div className="flex justify-center space-x-4 mb-12">
            <a 
              href="https://play.google.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center space-x-2 shadow-lg"
            >
              <FaGooglePlay className="w-5 h-5" />
              <span>Google Play</span>
            </a>
            <a 
              href="https://www.apple.com/app-store/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center space-x-2 shadow-lg"
            >
              <FaApple className="w-5 h-5" />
              <span>App Store</span>
            </a>
          </div>
        </div>

        <div className="relative flex justify-center mt-8">
          <img 
            src="/images/hero.png" 
            alt="Productive Apps Mockup"
            className="w-full max-w-md md:max-w-lg lg:max-w-xl rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );

  
  const stats = [
    { 
      number: "29.6M", 
      label: "Total Downloads", 
      subtext: "90% More Than Last Month", 
      icon: "/images/icon-downloads.png"
    },
    { 
      number: "906K", 
      label: "Total Reviews", 
      subtext: "SEE More Than Last Month", 
      icon: "/images/icon-review.png"
    },
    { 
      number: "132+", 
      label: "Active Apps", 
      subtext: "In Store Now", 
      icon: "/images/icon-ratings.png" 
    },
  ];

  const renderStatesSection = () => (
    <section className="py-8 bg-purple-700 text-white shadow-xl"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Title */}
        <h2 className="text-3xl font-extrabold mb-1">
          Trusted By Millions, Built For You
        </h2>
        
        {/* Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-2xl text-center text-gray-800 transition transform hover:scale-[1.03] duration-300"
            >
              <div className="flex justify-center mb-4">
                <img 
                  src={stat.icon} 
                  alt={stat.label} 
                  className="w-12 h-12"
                />
              </div>
              
              <p className="text-4xl font-bold text-[#6366f1] mb-1">
                {stat.number}
              </p>
              
              {/* Main Label */}
              <p className="text-lg font-semibold text-gray-700">
                {stat.label}
              </p>
              
              <p className="text-xs text-gray-500 mt-1">
                {stat.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  
  const topApps = appsData.slice(0, 8); 

  const renderTopAppsSection = () => (
    <section className="py-16 bg-blend-soft-light"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Subtitle */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-black">Trending Apps</h2>
          <p className="text-gray-400 mt-2">
            Explore All Trending Apps on the Market developed by us
          </p>
        </div>
        
        {/* Apps Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {topApps.map((app) => (
            
            <AppCard key={app.id} app={app} formatNumber={formatNumber} />
          ))}
        </div>

        {/* Show All Button */}
        <div className="text-center mt-12">
          <Link
            to="/apps"
            className="inline-block bg-purple-700 hover:bg-[#8b5cf6] text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg"
          >
            Show All
          </Link>
        </div>
      </div>
    </section>
  );

  // ----------------------------------------------------
  // Final Render
  // ----------------------------------------------------
  return (
    <div className="HomePage">
      {renderBanner()}
      {renderStatesSection()}
      {renderTopAppsSection()}
    </div>
  );
};

export default HomePage;