import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// ScrollToTop component to scroll to top whenever the route changes
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to top when the location (route) changes
  }, [location]);

  return null;
};

export default ScrollToTop;
