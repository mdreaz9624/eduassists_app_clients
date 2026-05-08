// ScrollToTop.jsx
// ScrollToTopWrapper.jsx (Create this new file)
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

// Create a wrapper component that will be used inside the router
export const ScrollToTopWrapper = () => {
  return <ScrollToTop />;
};

export default ScrollToTop;