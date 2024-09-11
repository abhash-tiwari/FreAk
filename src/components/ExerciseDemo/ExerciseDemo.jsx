import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ExerciseDemo.css';
import { motion } from 'framer-motion';
import { fetchData, youtubeOptions } from '../../utils/FetchData';

const ExerciseDemo = () => {
    const location = useLocation();
    const { exercise } = location.state;
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const transition = { type: 'spring', duration: 3 };
  
    // Fetching related YouTube videos
    useEffect(() => {
      const fetchYouTubeVideos = async () => {
        setLoading(true);
        try {
          const youtubeUrl = `https://youtube-search-and-download.p.rapidapi.com/search?query=${exercise.name} exercise`;
          const videoData = await fetchData(youtubeUrl, youtubeOptions);
          setVideos(videoData.contents.slice(0, 5)); // Limit to 5 videos
        } catch (error) {
          console.error("Failed to fetch YouTube videos", error);
        } finally {
          setLoading(false);
        }
      };
  
      if (exercise) {
        fetchYouTubeVideos();
      }
    }, [exercise]);
  
    return (
      <div className="demo">
        <hr />
        <div className="demo-header">
          <h1 className="exercise-name-d">{exercise.name.toUpperCase()}</h1>
        </div>
        <hr />
  
        <motion.div
          className="exercise-demo-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        >
          <div className="exercise-demo-left">
            <img className="exercise-img-demo" src={exercise.gifUrl} alt={exercise.name} />
          </div>
          <div className="exercise-demo-right">
            <p><strong>Body Part:</strong> {exercise.bodyPart}</p>
            <p><strong>Equipment:</strong> {exercise.equipment}</p>
            <p><strong>Target:</strong> {exercise.target}</p>
            <p><strong>Description:</strong></p>
            <h2>
              {exercise.name.toUpperCase()} is one of the best exercises to target your {exercise.target}. It will help you improve your mood and gain energy.
            </h2>
          </div>
        </motion.div>
  
        {/* YouTube video section */}
        <hr />
        <div className="youtube-video-section">
          {loading ? (
            <p>Fetching YouTube videos...</p>
          ) : (
            videos.length > 0 ? (
              <>
                <h2>Related YouTube Videos</h2>
                <div className="video-list">
                  {videos.map((video, index) => (
                    <a
                      key={index}
                      href={`https://www.youtube.com/watch?v=${video.video.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="video-item">
                        <img src={video.video.thumbnails[0].url} alt={video.video.title} />
                        <p>{video.video.title}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <p>No related videos found.</p>
            )
          )}
        </div>
      </div>
    );
  };
  
  export default ExerciseDemo;
