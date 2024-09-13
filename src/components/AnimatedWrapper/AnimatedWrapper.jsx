import React from 'react';
import { useInView } from 'react-intersection-observer';
import './AnimatedWrapper.css'; // Import the CSS file

const AnimatedWrapper = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`animated-wrapper ${inView ? 'in-view' : ''}`}
    >
      {children}
    </div>
  );
};

export default AnimatedWrapper;
