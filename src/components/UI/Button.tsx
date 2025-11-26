import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  withArrow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  withArrow = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "px-8 py-3 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 tracking-wide text-sm uppercase";
  
  const variants = {
    primary: "bg-brand-yellow text-black hover:bg-white hover:scale-105 shadow-[0_0_20px_rgba(250,204,21,0.3)]",
    outline: "border border-white/20 text-white hover:border-brand-yellow hover:text-brand-yellow hover:bg-brand-yellow/10",
    ghost: "text-white/70 hover:text-brand-yellow hover:bg-white/5"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {withArrow && <ArrowRight className="w-4 h-4" />}
    </button>
  );
};