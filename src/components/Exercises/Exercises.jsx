import React, { useState, useEffect } from 'react';
import { fetchData, exerciseOptions, youtubeOptions } from '../../utils/FetchData';
import { useNavigate } from 'react-router-dom';
import './Exercises.css';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // Added search query state
  const [filteredExercises, setFilteredExercises] = useState([]); // Added filtered exercises state

  const navigate = useNavigate();

  // Fetch body parts and random exercises on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      // Fetch body parts
      const bodyPartList = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
        exerciseOptions
      );
      setBodyParts(bodyPartList);

      // Fetch random exercises
      const allExercises = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises',
        exerciseOptions
      );
      const randomExercises = allExercises.sort(() => 0.5 - Math.random()).slice(0, 5);
      setExercises(randomExercises);
      setFilteredExercises(randomExercises); // Initialize filtered exercises

      // Fetch random fitness-related YouTube videos
      fetchYoutubeVideos('fitness workouts');
    };

    fetchInitialData();
  }, []);

  // Fetch YouTube videos based on search query (random or specific body part)
  const fetchYoutubeVideos = async (query) => {
    setLoadingVideos(true);
    const youtubeUrl = `https://youtube-search-and-download.p.rapidapi.com/search?query=${query}&type=v`;
    const youtubeData = await fetchData(youtubeUrl, youtubeOptions);
    setYoutubeVideos(youtubeData.contents.slice(0, 5)); // Limit to 5 videos
    setLoadingVideos(false);
  };

  // Fetch exercises for the selected body part and related YouTube videos
  const handleBodyPartClick = async (bodyPart) => {
    setSelectedBodyPart(bodyPart);
    const exercisesData = await fetchData(
      `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
      exerciseOptions
    );
    setExercises(exercisesData);
    setFilteredExercises(exercisesData); // Update filtered exercises

    // Fetch body-part-related YouTube videos
    fetchYoutubeVideos(`${bodyPart} workout`);
  };

  // Handle click on exercise card to navigate to demo
  const handleExerciseClick = (exercise) => {
    navigate(`/exercisedemo`, { state: { exercise } }); // Passing exercise data to the new route
  };

  // Handle dropdown change for small screens
  const handleDropdownChange = (event) => {
    const bodyPart = event.target.value;
    if (bodyPart) {
      handleBodyPartClick(bodyPart);
    }
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle search button click
  const handleSearchClick = async () => {
    if (searchQuery) {
      const searchResults = await fetchData(
        `https://exercisedb.p.rapidapi.com/exercises/name/${searchQuery}`,
        exerciseOptions
      );
      setFilteredExercises(searchResults);
    } else {
      // If search query is empty, reset to the initial exercises
      const allExercises = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises',
        exerciseOptions
      );
      setFilteredExercises(allExercises);
    }
  };

  return (
    <div className="exercises-container">
      <hr />
      <h1 className="title">Explore Exercises</h1>
      <hr />
      <div className="blur hero-blur"></div>
      {/* Search Input and Button */}
      <div className="search-input-container">
        <div>
         <input
          type="text"
          placeholder="Search exercises..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
         />
         <button onClick={handleSearchClick} className="btn">Search</button>
        </div>
      </div>

      {/* Dropdown for smaller screens */}
      <div className="search-container-dropdown">
        <select className="dropdown" onChange={handleDropdownChange} value={selectedBodyPart}>
          <option value="">Select Body Part</option>
          {bodyParts.map((bodyPart) => (
            <option key={bodyPart} value={bodyPart}>
              {bodyPart.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons for larger screens */}
      <div className="search-container">
        {bodyParts.map((bodyPart) => (
          <button
            key={bodyPart}
            className={`btns ${selectedBodyPart === bodyPart ? 'active' : ''}`}
            onClick={() => handleBodyPartClick(bodyPart)}
          >
            {bodyPart.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="exercises-list">
        {filteredExercises.length > 0 ? (
          filteredExercises.map((exercise) => (
            <div key={exercise.id} className="exercise-card" onClick={() => handleExerciseClick(exercise)}>
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
          <p>Loading...</p>
        )}
      </div>

      {/* YouTube Videos Section */}
      <hr />
      <h2>Related YouTube Videos</h2>
      {loadingVideos ? (
        <p>Loading YouTube videos...</p>
      ) : (
        <div className="youtube-videos">
          {youtubeVideos.map((video, index) => (
            <div key={index} className="youtube-video-card">
              <a href={`https://www.youtube.com/watch?v=${video.video.videoId}`} target="_blank" rel="noopener noreferrer">
                <img src={video.video.thumbnails[0].url} alt={video.video.title} className="youtube-video-thumbnail" />
                <p>{video.video.title}</p>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Exercises;
