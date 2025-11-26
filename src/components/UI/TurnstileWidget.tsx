import React, { useEffect, useRef, useState } from 'react';

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  theme?: 'light' | 'dark' | 'auto';
}

declare global {
  interface Window {
    turnstile: any;
  }
}

export const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({ 
  onVerify, 
  onError,
  onExpire,
  theme = 'dark' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [widgetId, setWidgetId] = useState<string | null>(null);
  
  // Use environment variable or fallback for development
  // IMPORTANT: Ensure VITE_TURNSTILE_SITE_KEY is set in your .env or Cloudflare Pages vars
  const SITE_KEY = (import.meta as any).env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'; // Test key

  useEffect(() => {
    // If the script hasn't loaded yet, it might be async. 
    // Usually api.js handles looking for elements, but for React we prefer explicit rendering.
    
    const renderWidget = () => {
      if (window.turnstile && containerRef.current && !widgetId) {
        try {
          const id = window.turnstile.render(containerRef.current, {
            sitekey: SITE_KEY,
            callback: (token: string) => onVerify(token),
            'error-callback': () => onError && onError(),
            'expired-callback': () => onExpire && onExpire(),
            theme: theme,
            appearance: 'interaction-only',
          });
          setWidgetId(id);
        } catch (e) {
          console.error("Turnstile render error:", e);
        }
      }
    };

    // Attempt render immediately
    renderWidget();

    // If turnstile isn't loaded yet, we could set an interval or wait for onload, 
    // but usually the script in index.html loads fast enough or 'auto' rendering catches it.
    // To be safe with React:
    const interval = setInterval(() => {
        if(window.turnstile && !widgetId) {
            renderWidget();
            clearInterval(interval);
        }
    }, 100);

    return () => {
      clearInterval(interval);
      if (widgetId && window.turnstile) {
        window.turnstile.remove(widgetId);
      }
    };
  }, [SITE_KEY, theme, onVerify, onError, onExpire, widgetId]);

  return <div ref={containerRef} className="my-4 min-h-[65px]" />;
};