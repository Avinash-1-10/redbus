import { useState, useEffect } from 'react';

const useTime = (timestamp) => {
  const [indianTime, setIndianTime] = useState('');

  useEffect(() => {
    if (!timestamp) {
      setIndianTime('');
      return;
    }

    const dateObject = new Date(timestamp);

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
      timeZone: 'Asia/Kolkata', // Indian Standard Time
    };

    const indianTimeString = dateObject.toLocaleTimeString('en-IN', options);
    setIndianTime(indianTimeString);
  }, [timestamp]);

  return indianTime;
};

export default useTime;
