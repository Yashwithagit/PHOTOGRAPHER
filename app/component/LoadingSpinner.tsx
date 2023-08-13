import Login from "app/login/page";
import React, { useState, useEffect } from "react";

const LoadingSpinner = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for demonstration purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="spinner">
          <div className="loader"></div>
        </div>
      ) : (
        <div>
          {/* Your content when loading is complete */}
         <Login />
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;
