import React, { useState } from 'react';
import './BMI.css'
import { motion } from 'framer-motion';

const BMICalculator = () => {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bmi, setBMI] = useState(null);
  const [category, setCategory] = useState('');
  const [idealWeight, setIdealWeight] = useState({ min: 0, max: 0 });
  const transition = { type: 'spring', duration: 3 };

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBMI(bmiValue);

    let bmiCategory = '';
    if (bmiValue < 18.5) {
      bmiCategory = 'Underweight';
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      bmiCategory = 'Normal weight';
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      bmiCategory = 'Overweight';
    } else {
      bmiCategory = 'Obese';
    }
    setCategory(bmiCategory);

    const idealMinWeight = (18.5 * (heightInMeters * heightInMeters)).toFixed(2);
    const idealMaxWeight = (24.9 * (heightInMeters * heightInMeters)).toFixed(2);
    setIdealWeight({ min: idealMinWeight, max: idealMaxWeight });
  };

  return (
    <motion.div className='bmi-container' initial={{ opacity: 0 }}
    animate={{ opacity: 1}}
    exit={{ opacity: 0 }}
    transition={{ duration: 2, ease: 'easeInOut' }}>
      {/* <div className="blur hero-blur"></div> */}
      <div className="blur b-blur"></div>
        <div className="card-b">
        <h2 className='header-b stroke-text'>Check Your BMI</h2>
      <div className='label-b'>
        <label>Height (cm):</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <div className='label-b'>
        <label>Weight (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <button className='btn' onClick={calculateBMI}>Calculate BMI</button>

      {bmi && (
        <div className='result-b'>
          <h3>Your BMI: {bmi}</h3>
          <p>Category: {category}</p>
          {category !== 'Normal weight' && (
            <p>
              Ideal weight range for your height: {idealWeight.min}kg -{' '}
              {idealWeight.max}kg
            </p>
          )}
        </div>
      )}
        </div>
    </motion.div>
  );
};

export default BMICalculator;
