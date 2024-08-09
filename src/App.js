import './App.css';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import Join from './components/Join/Join';
import Navbar from './components/Navbar/Navbar';
import Plans from './components/Plans/Plans';
import Programs from './components/Programs/Programs';
import Reasons from './components/Reasons/Reasons';
import Testimonials from './components/Testimonials/Testimonials';
// import plans from './components/Reasons/Reasons';
function App() {
  return (
    <div className="App-container">
          <Navbar />
          <Hero />
          <Programs />
          <Reasons />
          <Plans />
          <Testimonials />
          <Join />
          <Footer />
    </div>
  );
}

export default App;
