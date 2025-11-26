import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../../constants';
import { Button } from '../UI/Button';
import { Menu, X } from 'lucide-react';
import { JoinModal } from './JoinModal';
import myLogo from '../../assets/logo-s-black.png';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-4 glass-panel' : 'py-8 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-8 md:px-16 lg:px-24 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-black tracking-tighter text-white flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 bg-brand-yellow rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-500 overflow-hidden">
               {/* Replaced Text S with Image - Replace src with your actual uploaded black png */}
               <img 
                 src={myLogo}
                 alt="S" 
                 className="w-5 h-5 object-contain"
                 onError={(e) => {
                   // Fallback if image fails to load while user is setting it up
                   e.currentTarget.style.display = 'none';
                   e.currentTarget.parentElement!.innerHTML = '<span class="text-black font-bold">S</span>';
                 }}
               />
            </div>
            <span>SIGN<span className="text-brand-yellow">OF</span>PEOPLE</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  to={link.href}
                  className={`text-sm font-medium transition-colors tracking-wide relative group ${
                    isActive ? 'text-white' : 'text-white/70 hover:text-brand-yellow'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-brand-yellow transform origin-left transition-transform duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant="primary" 
              className="px-6 py-2 text-xs"
              onClick={() => setIsJoinModalOpen(true)}
            >
              Bize Katıl
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-brand-dark border-t border-white/10 p-6 flex flex-col gap-4 md:hidden animate-fade-in-up shadow-2xl">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.name} 
                to={link.href}
                className={`text-lg font-bold hover:text-brand-yellow ${location.pathname === link.href ? 'text-brand-yellow' : 'text-white'}`}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-2"></div>
            <Button 
              variant="primary" 
              className="w-full justify-center"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsJoinModalOpen(true);
              }}
            >
              Bize Katıl
            </Button>
          </div>
        )}
      </header>

      {/* Global Join Modal */}
      <JoinModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
    </>
  );
};