import { useState, useEffect } from 'react';

const useTimeDifference = (at, dt) => {
  const [timeDifference, setTimeDifference] = useState({ hours: 0, minutes: 0 });

  useEffect(() => {
    const calculateTimeDifference = () => {
      const arrivalTime = new Date(at);
      const departureTime = new Date(dt);

      const timeDiffInMillis = arrivalTime.getTime() - departureTime.getTime();
      const hours = Math.floor(timeDiffInMillis / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiffInMillis % (1000 * 60 * 60)) / (1000 * 60));

      setTimeDifference({ hours, minutes });
    };

    calculateTimeDifference();
  }, [at, dt]);

  return `${timeDifference.hours} hrs ${timeDifference.minutes} mins`;
};

export default useTimeDifference;
