import React, { Suspense, lazy, useLayoutEffect, useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import './App.css';
// import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import AnimatedWrapper from './components/AnimatedWrapper/AnimatedWrapper';
import Loader from './components/Loader/Loader';

import ProtectedRoute from './components/auth/ProtectedRoute';
import WorkoutGrid from './components/Workouts/Workouts';

// Lazy load components
const Navbar = lazy(() => import('./components/Navbar/Navbar'));
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
const PlanPricing = lazy(() => import('./components/PlanPricing/PlanPricing'));
const CameraCapture = lazy(() => import('./components/CameraCapture/CameraCapture'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    scrollToTop();

    const timeoutId = setTimeout(scrollToTop, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}

function AppContent() {
  const [showLoader, setShowLoader] = useState(false);

  const delayedLoader = useCallback(() => {
    setShowLoader(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(delayedLoader, 100);
    return () => clearTimeout(timer);
  }, [delayedLoader]);

  return (
    <>
      <ScrollToTop />
      <div className="App-container">
        <Suspense fallback={showLoader ? <Loader /> : null}>
          <Navbar />
          <Routes>
            {/* Home Route */}
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

            {/* Public Routes */}
            <Route path="/coaches" element={<AnimatedWrapper><Coaches /></AnimatedWrapper>} />
            <Route path="/learnmore" element={<AnimatedWrapper><Learn /></AnimatedWrapper>} />
            <Route path="/getintouch" element={<AnimatedWrapper><GetInTouch /></AnimatedWrapper>} />
            <Route path="/pricing" element={<AnimatedWrapper><PlanPricing /></AnimatedWrapper>} />
            <Route path="/camera" element={<AnimatedWrapper><CameraCapture /></AnimatedWrapper>} />
            <Route path="/workout" element={<AnimatedWrapper><WorkoutGrid /></AnimatedWrapper>} />
            {/* <Route path="/exercises" element={<AnimatedWrapper><ExerciseExplorer /></AnimatedWrapper>} />
            <Route path="/exercisedemo" element={<AnimatedWrapper><ExerciseDemo /></AnimatedWrapper>} /> */}
            {/* <Route path="/cal" element={<AnimatedWrapper><BMICalculator /></AnimatedWrapper>} /> */}


            {/* Protected Routes - Require Authentication */}
            <Route 
              path="/cal" 
              element={
                <ProtectedRoute>
                  <AnimatedWrapper><BMICalculator /></AnimatedWrapper>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/exercises" 
              element={
                <ProtectedRoute>
                  <AnimatedWrapper><ExerciseExplorer /></AnimatedWrapper>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/exercisedemo" 
              element={
                <ProtectedRoute>
                  <AnimatedWrapper><ExerciseDemo /></AnimatedWrapper>
                </ProtectedRoute>
              } 
            />
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
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    scrollToTop();

    window.addEventListener('load', scrollToTop);

    const timeoutId = setTimeout(scrollToTop, 10);

    return () => {
      window.removeEventListener('load', scrollToTop);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Auth0Provider
      domain="dev-ptkklpuwp22ad6ln.us.auth0.com"
      clientId="UzRxSqAmT6Mnf9mbyOlEUX0RnIR4VhmH"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      cacheLocation="localstorage"
    >
      <Router>
        <AppContent />
      </Router>
    </Auth0Provider>
  );
}

export default App;