import React from 'react';
import './Learn.css';
import coverLm from '../../assets/lm.jpg'
import Footer from "../Footer/Footer"

const Learn = () => {
  return (
    <div className="learn-more">
      <header className="learn-more-header">
        <hr />
        <br />
        <h1 className='stroke-text lm-h'>Learn More About Fitness</h1>
        <hr />
      </header>

<div className="l-container">
   <div className="left-l">
        <div className="text-block">
          <h3>What is <span style={{color:"orange"}}>Fitness</span>?</h3>
          <p>
            Fitness refers to the state of being in good health, particularly as a result of regular physical exercise. It encompasses various aspects of physical and mental well-being, achieved through a balanced combination of cardiovascular activities, strength training, flexibility exercises, and proper nutrition.
          </p>
         <br />
          <div className="para-l">
          <h3>Tips for Getting Started with Fitness</h3>
          <p>
          <strong>Set Clear Goals:</strong> Define your fitness objectives, such as losing weight, building muscle, or improving endurance. Setting specific, measurable goals can help you stay motivated and track progress.
          </p>
          <p>
          <strong>Create a Balanced Routine:</strong> Incorporate a mix of cardiovascular, strength, flexibility, and balance exercises into your routine. Aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity per week, along with muscle-strengthening activities on two or more days.
          </p>
          <p>
          <strong>Start Slow and Progress Gradually:</strong> If you're new to exercise or haven't been active for a while, start with shorter sessions and lower intensity. Gradually increase the duration and intensity of your workouts as your fitness level improves.
          </p>
          <p>
          <strong>Stay Consistent:</strong> Consistency is key to achieving and maintaining fitness goals. Find a workout schedule that fits your lifestyle and stick to it. Consider working out with a friend or joining a fitness class to stay accountable.
          </p>
          <p>
          <strong>Listen to Your Body:</strong> Pay attention to how your body responds to exercise. Rest and recover when needed, and avoid pushing through pain or discomfort. Proper warm-up and cool-down exercises can help prevent injuries.
          </p>
          <p>
          <strong>Stay Hydrated and Eat Well:</strong> Proper hydration and nutrition are essential for optimal performance and recovery. Drink plenty of water before, during, and after workouts, and fuel your body with a balanced diet rich in fruits, vegetables, lean proteins, and whole grains.
          </p>
          <p>
          <strong>Seek Professional Guidance:</strong> If you're unsure where to start or have specific fitness goals, consider consulting a certified personal trainer or fitness coach. They can help design a personalized workout plan and provide guidance on proper technique.
          </p>
          </div>
         
        </div>
        <div className="right-l image-block">
          <img src={coverLm} alt="Fitness" />
        </div>
      
        </div>
        
        
      
      
</div>
<div className="types-section">
        <h3>Types Of Fitness</h3>
        <ol>
          <li><strong>Cardiovascular Fitness:</strong> Involves activities that increase your heart rate, such as running, cycling, or swimming. This type of exercise improves heart and lung function and helps maintain a healthy weight.</li>
          <li><strong>Strength Training:</strong> Focuses on building muscle strength and endurance through activities like weight lifting, resistance exercises, and bodyweight workouts. Strength training enhances muscle mass and metabolic rate.</li>
          <li><strong>Flexibility:</strong> Activities like yoga and stretching improve the range of motion of your joints and muscles, reducing the risk of injuries and improving overall mobility.</li>
          <li><strong>Balance and Coordination:</strong> Exercises that challenge your balance, such as stability ball workouts or balance board exercises, improve overall stability and coordination, reducing the risk of falls and injuries.</li>
        </ol>
      </div>
    </div>
  );
};

export default Learn;
