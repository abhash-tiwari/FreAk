import React, { useEffect, useState } from 'react';
import './Workouts.css';
import { useNavigate } from 'react-router-dom';

const WorkoutGrid = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authorization token is missing or expired.');
          setLoading(false);
          return;
        }

        const response = await fetch('https://freak-backend.onrender.com/api/workouts/list', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch workouts');
        }

        const data = await response.json();
        setWorkouts(data);

        // Save workouts to localStorage
        localStorage.setItem('workouts', JSON.stringify(data));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    // Load workouts from localStorage first for faster initial load
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts'));
    if (savedWorkouts) {
      setWorkouts(savedWorkouts);
      setLoading(false);
    }

    fetchWorkouts();
  }, []);

  const handleRemove = async (id) => {
    try {
      const response = await fetch(`https://freak-backend.onrender.com/api/workouts/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete workout');
      }

      const updatedWorkouts = workouts.filter((workout) => workout._id !== id);
      setWorkouts(updatedWorkouts);

      // Update localStorage
      localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleAddWrkt = () => {
    navigate('/exercises')
  }

  if (loading) return <div className="loading-state">Loading workouts...</div>;
  if (error) return <div className="error-state">Error: {error}</div>;

  return (
    <div className="workout-container">
      <hr className="hr-w" />
      <h1 className="title-w">Your Selected Workouts</h1>
      <hr className="hr-w" />

      {workouts.length === 0 ? (
        <>
        <p className="no-workouts">You haven’t added any workouts.</p>
        <button className='btn no-workout-button' onClick={handleAddWrkt}>Add Workouts</button>
        </>
      ) : (
        <>
          <div className="workout-grid">
            {workouts.map((workout) => (
              <div key={workout._id} className="workout-card">
                <h3 className="workout-title">{workout.title}</h3>
                <p className="workout-description">{workout.description}</p>
                <div className="exercises-section">
                  <ul className="exercise-list">
                    {workout.exercises.map((exercise, index) => (
                      <li key={index} className="exercise-item">
                        <img
                          src={exercise.gifUrl || 'placeholder-image.png'}
                          alt={exercise.name}
                          className="exercise-image"
                          onError={(e) => (e.target.src = 'placeholder-image.png')}
                        />
                        <div className="exercise-details">
                          <p><strong>Body Part:</strong> {exercise.bodyPart}</p>
                          <p><strong>Equipment:</strong> {exercise.equipment}</p>
                          <p><strong>Target:</strong> {exercise.target}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <button onClick={() => handleRemove(workout._id)} className="remove-button">
                  Remove
                </button>
              </div>
            ))}
          </div>
          <p className="workout-reminder">Workout Plan for Today</p>
        </>
      )}
    </div>
  );
};

export default WorkoutGrid;
