import {useState, useEffect} from 'react';

const useNavigatorOnline = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const handleNetworkChange = () => {
    setIsOnline(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);

    return () => {
      window.removeEventListener('online', handleNetworkChange);
      window.removeEventListener('offline', handleNetworkChange);
    };
  }, []);

  return isOnline;
};

export {useNavigatorOnline};
