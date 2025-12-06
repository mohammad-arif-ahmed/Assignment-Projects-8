
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa'; 

const Header = () => {
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Apps', path: '/apps' },
        { name: 'Installation', path: '/installation' },
    ];

    return (
        <header className="bg-[#FFFFFF] text-white border-b border-gray-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">

                {/* Logo - Clicks navigate to Home */}
                <Link to="/" className="flex items-center space-x-2">
                    <img
                        src="/images/logo.png" 
                        alt="HERO.IO Logo"
                        className="w-8 h-8 rounded-full"
                    />
                    <span className="text-xl font-bold text-blue-600 tracking-wider hidden sm:block">
                        HERO.IO
                    </span>
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex space-x-6">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors hover:text-[#a78bfa] ${isActive
                                    ? 'text-[#a78bfa] border-b-2 border-[#a78bfa] pb-1' 
                                    : 'text-gray-400' 
                                }`
                            }
                            end={item.path === '/'} 
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                <a
                    href="YOUR_GITHUB_PROFILE_LINK" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#a78bfa] hover:bg-[#8b5cf6] text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 transition duration-300 shadow-lg"
                >
                    <FaGithub className="w-4 h-4" />
                    <span className='hidden sm:inline'>Contribute</span>
                </a>
            </div>
        </header>
    );
};

export default Header;