import React, { useState, useEffect } from 'react';
import { fetchData, exerciseOptions } from '../../utils/FetchData';
import './Exercises.css';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState('');

  useEffect(() => {
    const fetchBodyParts = async () => {
      const bodyPartList = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
        exerciseOptions
      );
      setBodyParts(bodyPartList);
    };

    fetchBodyParts();
  }, []);

  const handleSearch = async () => {
    if (selectedBodyPart) {
      const exercisesData = await fetchData(
        `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectedBodyPart}`,
        exerciseOptions
      );
      setExercises(exercisesData);
    }
  };

  return (
    <div className="exercises-container">
        <hr />
      <h1 className="title">Search Exercises by Body Part</h1>
<hr />
      <div className="search-container">
        <select
          className="dropdown"
          value={selectedBodyPart}
          onChange={(e) => setSelectedBodyPart(e.target.value)}
        >
          <option value="">Select Body Part</option>
          {bodyParts.map((bodyPart) => (
            <option key={bodyPart} value={bodyPart}>
              {bodyPart}
            </option>
          ))}
        </select>
        <button className="search-button btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="exercises-list">
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <div key={exercise.id} className="exercise-card">
              <h2 className="exercise-name">{exercise.name}</h2>
              
              <img className="exercise-img" src={exercise.gifUrl} alt={exercise.name} />
              <div className='e'>
              <p className="exercise-content">Body Part: {exercise.bodyPart}</p>
              <p className="exercise-content">Equipment: {exercise.equipment}</p>
              <p className="exercise-content">Target: {exercise.target}</p>
              </div>
              
            </div>
          ))
        ) : (
          <p>Search For Any Body Part You Want To Train</p>
        )}
      </div>
    </div>
  );
};

export default Exercises;
