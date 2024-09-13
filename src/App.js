import React, { Suspense, lazy, useLayoutEffect, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import AnimatedWrapper from './components/AnimatedWrapper/AnimatedWrapper';
import Navbar from './components/Navbar/Navbar';
// Lazy load components

const Hero = lazy(() => import('./components/Hero/Hero'));
const Join = lazy(() => import('./components/Join/Join'));
const Plans = lazy(() => import('./components/Plans/Plans'));
const Programs = lazy(() => import('./components/Programs/Programs'));
const Reasons = lazy(() => import('./components/Reasons/Reasons'));
const Testimonials = lazy(() => import('./components/Testimonials/Testimonials'));
const Coaches = lazy(() => import('./components/Coaches/Coaches'));
const Learn = lazy(() => import('./components/Learn/Learn'));
const BMICalculator = lazy(() => import('./components/BMI/BMI'));
const ExerciseExplorer = lazy(() => import('./components/Exercises/Exercises'));
const ExerciseDemo = lazy(() => import('./components/ExerciseDemo/ExerciseDemo'));
const GetInTouch = lazy(() => import('./components/Touch/Touch'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    scrollToTop();

    // Attempt to scroll again after a short delay
    const timeoutId = setTimeout(scrollToTop, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <div className="App-container">
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          <Routes>
            <Route path="/" element={
              <>
                <AnimatedWrapper><Hero /></AnimatedWrapper>
                <AnimatedWrapper><Programs /></AnimatedWrapper>
                <AnimatedWrapper><Reasons /></AnimatedWrapper>
                <AnimatedWrapper><Plans /></AnimatedWrapper>
                <AnimatedWrapper><Testimonials /></AnimatedWrapper>
                <AnimatedWrapper><Join /></AnimatedWrapper>
              </>
            } />
            <Route path="/coaches" element={<AnimatedWrapper><Coaches /></AnimatedWrapper>} />
            <Route path="/learnmore" element={<AnimatedWrapper><Learn /></AnimatedWrapper>} />
            <Route path="/cal" element={<AnimatedWrapper><BMICalculator /></AnimatedWrapper>} />
            <Route path="/exercises" element={<AnimatedWrapper><ExerciseExplorer /></AnimatedWrapper>} />
            <Route path="/exercisedemo" element={<AnimatedWrapper><ExerciseDemo /></AnimatedWrapper>} />
            <Route path="/getintouch" element={<AnimatedWrapper><GetInTouch /></AnimatedWrapper>} />
          </Routes>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}

function App() {
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    // Scroll on initial render
    scrollToTop();

    // Scroll on page load/reload
    window.addEventListener('load', scrollToTop);

    // Attempt to scroll again after a short delay
    const timeoutId = setTimeout(scrollToTop, 10);

    return () => {
      window.removeEventListener('load', scrollToTop);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
