import React, { useState } from 'react';
import './BMI.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const BMI = () => {
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const [bmiCategory, setBMICategory] = useState('Calculate your BMI');
  const [bmiPrime, setBMIPrime] = useState(null);
  const [idealWeightRange, setIdealWeightRange] = useState('');

  const calculateBMI = (e) => {
    e.preventDefault();
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBMI(bmiValue);
      calculateBMICategory(bmiValue);
      calculateBMIPrime(bmiValue);
      calculateIdealWeight(heightInMeters);
    }
  };

  const calculateBMICategory = (bmiValue) => {
    if (bmiValue < 18.5) {
      setBMICategory('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      setBMICategory('Normal');
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      setBMICategory('Overweight');
    } else {
      setBMICategory('Obese');
    }
  };

  const calculateBMIPrime = (bmiValue) => {
    const bmiPrimeValue = (bmiValue / 25).toFixed(2);
    setBMIPrime(bmiPrimeValue);
  };

  const calculateIdealWeight = (heightInMeters) => {
    const minWeight = (18.5 * (heightInMeters * heightInMeters)).toFixed(1);
    const maxWeight = (24.9 * (heightInMeters * heightInMeters)).toFixed(1);
    setIdealWeightRange(`${minWeight} - ${maxWeight} kgs`);
  };

  const getBMIIconColor = () => {
    if (bmiCategory === 'Underweight') return 'yellow';
    if (bmiCategory === 'Normal') return 'green';
    if (bmiCategory === 'Overweight' || bmiCategory === 'Obese') return 'red';
    return 'grey';
  };

  const navigate = useNavigate();
  const handleExploreClick = () => {
    navigate('/exercises')
  }
  const transition = { type: 'spring', duration: 3 };

  return (
       <motion.div className="bmi-container" initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: 'easeInOut' }}>
      <hr className='hr-b'/>
      <div>
        <h1 className="bmi-title">BMI Calculator: Body Mass Index</h1>
        <p className="bmi-description">
          BMI is a measurement of the relationship between two prominent body metrics: your weight and height.
        </p>
      </div>
      <hr className='hr-b'/>
      <div className='bmi-extra'>
      <div className="bmi-card">
        <div className="bmi-content">
          <div className="bmi-left-column">
            <div className="bmi-status">
              <div
                className="bmi-icon"
                style={{ backgroundColor: getBMIIconColor() }}
              ></div>
              <div>
                <h2>{bmiCategory || '-'}</h2>
                <p>
                  {bmiCategory === 'Normal'
                    ? 'Your weight is in the healthy range as per your height.'
                    : bmiCategory === 'Underweight'
                    ? 'You are underweight. It’s recommended to gain weight for a healthier BMI.'
                    : bmiCategory === 'Overweight' || bmiCategory === 'Obese'
                    ? 'You are overweight or obese. It’s recommended to lose weight for a healthier BMI.'
                    : 'Calculate your BMI to find out your health status.'}
                </p>
              </div>
            </div>
            <div className="bmi-range">
              <p><strong>Ideal Range</strong></p>
              <p>18.5 - 24.9</p>
            </div>
            <div className="bmi-result">
              <p><strong>Your BMI</strong></p>
              <p>{bmi || '-'}</p>
            </div>
            <div className="bmi-ideal-weight">
              <p><strong>Ideal Weight Range</strong></p>
              <p>{idealWeightRange || '-'}</p>
            </div>
            <button 
             className="bmi-button" 
              onClick={handleExploreClick}
             disabled={!bmi} /* Button is disabled unless BMI is calculated */
               >
               Explore Exercises Based on Your BMI
              </button>
          </div>
          <div className="bmi-right-column">
            <h2>Calculate your BMI</h2>
            <form onSubmit={calculateBMI}>
              <div className="form-group">
                <p>Gender</p>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      value="male"
                      checked={gender === 'male'}
                      onChange={() => setGender('male')}
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="female"
                      checked={gender === 'female'}
                      onChange={() => setGender('female')}
                    />
                    Female
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="height">Height</label>
                <input
                  id="height"
                  type="number"
                  placeholder="cms"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="weight">Weight</label>
                <input
                  id="weight"
                  type="number"
                  placeholder="kgs"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="calculate-button">CALCULATE</button>
            </form>
          </div>
        </div>
      </div>
      </div>
      
      <div className='blur'></div>
      </motion.div>
  );
};

export default BMI;
