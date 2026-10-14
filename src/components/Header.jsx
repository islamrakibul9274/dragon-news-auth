'use client';

import { useEffect, useState } from 'react';
import moment from 'moment';

const Header = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(moment().format('dddd, MMMM Do YYYY'));
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-2 py-2">
      <div className="logo">
        <img className="w-[300px] h-auto" src="/assets/logo.png" alt="Dragon News" />
      </div>
      <h2 className="text-gray-500">Journalism Without Fear or Favour</h2>
      <p className="text-gray-600 font-medium">
        {currentDate || '\u00A0'}
      </p>
    </div>
  );
};

export default Header;