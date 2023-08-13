// hooks/useAuth.js

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router=useRouter()
  // Simulate authentication checking (replace with your actual logic)
  useEffect(() => {
    // Your authentication logic here
    // For example, check if the user is logged in through a token or session
    const isAuthenticated = localStorage.getItem("token")===null?false:true // Replace with your logic
    setIsAuthenticated(isAuthenticated);
  }, [router]);

  return isAuthenticated;
}
