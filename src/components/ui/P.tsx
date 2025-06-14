import React from 'react';

interface PProps {
  text: string;
}

const P: React.FC<PProps> = ({ text }) => {
  return <p className="font-poppins font-normal text-gray-600 dark:text-gray-400 mt-2.5">{text}</p>;
};

export default P;
