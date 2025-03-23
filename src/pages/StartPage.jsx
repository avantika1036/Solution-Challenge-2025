import React from 'react';
import { useNavigate } from 'react-router-dom';
import BlurText from '../components/reactbitsCom/BlurText';
import FallingText from '../components/reactbitsCom/FallingText';
import SplashCursor from '../components/reactbitsCom/SplashCursor';

const StartPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/home');
  };

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
    
      <div className="relative z-10 mb-12 text-center">
        <BlurText
          text="Turn Your E-Waste into E-Wealth!"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-4xl md:text-6xl font-bold"
        />
      </div>
      <div className="relative z-10 flex w-full justify-center items-start">
        <div className="w-1/3 h-64 bg-black p-4 mr-4 border border-gray-700 rounded-lg">
          <FallingText
            text={`Turning yesterday's tech into tomorrow's treasure – recycle, repurpose, and rethink e-waste.`}
            highlightWords={["yesterday's", "tomorrow's", "recycle", "repurpose", "e-waste"]}
            highlightClass="highlighted"
            trigger="hover"
            backgroundColor="transparent"
            wireframes={false}
            gravity={0.56}
            fontSize="1rem"
            mouseConstraintStiffness={0.9}
          />
        </div>
        <div className="flex-grow text-center">
          <button
            onClick={handleStart}
            className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition mb-12"
          >
            Go to Home Page
          </button>
        </div>
      </div>
      <SplashCursor />
    </div>
  );
};

export default StartPage;