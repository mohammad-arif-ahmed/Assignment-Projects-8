

import React from 'react';
import { FaLinkedin, FaFacebook, FaTwitter, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#121c27] text-gray-400 py-16 border-t border-[#1f2937]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          
          {/* Logo & Brand Info */}
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-2">
              <img 
                src="/images/logo.png" 
                alt="HERO.IO Logo" 
                className="w-7 h-7 rounded-full" 
              />
              <span className="text-xl font-bold text-white">
                HERO.IO
              </span>
            </div>
            <p className="text-sm">We craft innovative apps designed for everyday life.</p>
          </div>
          
          {/* Social Links */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-white font-semibold mb-3">Social Links</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#a78bfa] transition-colors" aria-label="LinkedIn">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="hover:text-[#a78bfa] transition-colors" aria-label="Facebook">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-[#a78bfa] transition-colors" aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="YOUR_GITHUB_PROFILE_LINK" target="_blank" rel="noopener noreferrer" className="hover:text-[#a78bfa] transition-colors" aria-label="GitHub">
                <FaGithub size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-[#1f2937] text-center">
          <p className="text-xs">
            Copyright © 2025 - All right reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;