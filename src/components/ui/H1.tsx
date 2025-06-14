import React from 'react';

interface H1Props {
  text: string;
}

const H1: React.FC<H1Props> = ({ text }) => {
  return <h1 className='font-poppins font-semibold text-3xl text-my'>{text}</h1>;
};

export default H1;
