
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { appsData } from '../data/appsData'; 
import toast, { Toaster } from 'react-hot-toast'; 
import { 
  FaDownload, FaStar, FaUserFriends, FaCheckCircle 
} from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num;
};

const formatRatingData = (ratings) => {
  return ratings.map(r => ({
    name: r.name,
    count: r.count,
  })).reverse(); 
};


const AppDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const appId = parseInt(id);

  const app = appsData.find(a => a.id === appId);
  const [isInstalled, setIsInstalled] = useState(false);
  const INSTALLATION_KEY = `installedApp_${appId}`; 
  
  const accentColor = "#FF8C00"; 
  const installBtnColor = "bg-[#00C49F]"; 
  const darkBg = "#0C1625"; 
  const cardBg = "#182434"; 

  useEffect(() => {
    const installedStatus = localStorage.getItem(INSTALLATION_KEY) === 'true';
    setIsInstalled(installedStatus);
  }, [INSTALLATION_KEY]);

  const handleInstallToggle = useCallback(() => {
    if (!isInstalled) {
      setIsInstalled(true);
      
      localStorage.setItem(INSTALLATION_KEY, 'true');
      
      toast.success(`${app.title} Installed Successfully!`, {
        duration: 3000,
        position: 'top-center',
      });
    }
  }, [isInstalled, app, INSTALLATION_KEY]);

  if (!app) {
    useEffect(() => {
      navigate('/404'); 
    }, [navigate]);
    return null; 
  }

  const ratingChartData = app.ratings ? formatRatingData(app.ratings) : [];
  const totalReviews = app.reviews;


  return (
    <div className={`py-12 ${darkBg} text-white min-h-screen`}>
      <Toaster /> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-10 rounded-xl shadow-2xl text-gray-800">
        
        <div className="flex space-x-8 mb-8">
          
          <div className="flex-shrink-0 w-36 h-36 bg-white rounded-2xl overflow-hidden shadow-xl flex items-center justify-center border border-gray-200">
            <img 
              src={app.image} 
              alt={app.title} 
              className="w-full h-full object-contain p-2"
            />
          </div>

          {/* Title, Developer, Stats, and Install Button */}
          <div className="flex-grow flex flex-col justify-start">
            
            <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
              {app.title}
            </h1>
            <p className="text-sm text-gray-500 mb-4">
              Developed by <span className="text-gray-600 font-medium">{app.companyName}</span>
            </p>

            <div className="flex space-x-10 mb-6">
              <StatItem 
                icon={FaDownload} 
                value={formatNumber(app.downloads)} 
                label="Downloads" 
                color="text-[#00C49F]"
              />
              <StatItem 
                icon={FaStar} 
                value={app.ratingAvg} 
                label="Average Ratings" 
                color="text-[#FFBB28]" 
              />
              <StatItem 
                icon={FaUserFriends} 
                value={formatNumber(totalReviews)} 
                label="Total Reviews" 
                color="text-[#B5A4FF]" 
              />
            </div>
            
            <button
              onClick={handleInstallToggle}
              disabled={isInstalled} 
              className={`font-bold py-3 px-8 rounded-lg transition duration-300 flex items-center justify-center space-x-2 shadow-lg text-white text-base w-fit ${
                isInstalled 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : `${installBtnColor} hover:bg-[#00a382]` 
              }`}
            >
              {isInstalled ? (
                <>
                  <FaCheckCircle className="w-4 h-4" />
                  <span>Installed</span>
                </>
              ) : (
                <>
                  <FaDownload className="w-4 h-4" />
                  <span>Install Now ({app.size})</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 2. Ratings Chart Section */}
        <div className="mb-12 border-t pt-6 border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Ratings</h2>
          <div className="p-4 rounded-xl h-72"> 
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={ratingChartData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                    barCategoryGap="10%"
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" horizontal={false} /> 
                    <YAxis 
                        dataKey="name" 
                        type="category" 
                        stroke="#6b7280" 
                        tickLine={false}
                        axisLine={false}
                        width={60} 
                    />
                    <XAxis 
                        type="number" 
                        stroke="#6b7280" 
                        tickFormatter={formatNumber}
                        axisLine={false}
                        tickLine={false}
                        domain={[0, 'auto']}
                    />
                    <Tooltip 
                        cursor={{ fill: '#f3f4f6', opacity: 0.8 }} 
                        contentStyle={{ backgroundColor: 'white', border: '1px solid #e0e0e0', borderRadius: '5px', color: '#374151' }} 
                        labelStyle={{ color: '#1f2937' }}
                        formatter={(value) => [`${formatNumber(value)} reviews`, 'Count']}
                    />
                    <Bar dataKey="count" fill={accentColor} name="Review Count" radius={[0, 4, 4, 0]} />
                </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* 3. Description Section */}
        <div className="pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
          <div className="text-gray-600 whitespace-pre-line leading-relaxed space-y-4">
            {app.description.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

// Small utility component for the stats items
const StatItem = ({ icon: Icon, value, label, color }) => (
  <div className="flex flex-col items-center justify-center space-y-1">
    <Icon className={`w-6 h-6 ${color}`} />
    <p className="text-xl font-bold text-gray-900 leading-none">{value}</p>
    <p className="text-xs text-gray-500 font-medium">{label}</p>
  </div>
);

export default AppDetailsPage;