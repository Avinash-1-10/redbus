import { useState, useEffect } from 'react';

const useDate = (timestamp) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const formatTimestamp = () => {
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      const formatted = new Date(timestamp).toLocaleDateString('ind', options);
      setFormattedDate(formatted);
    };

    formatTimestamp();

  }, [timestamp]);

  return formattedDate;
};

export default useDate;
