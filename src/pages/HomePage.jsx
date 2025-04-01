import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Laptop, Phone, Tv } from 'lucide-react';
import AnimatedContent from '../components/ReactbitsCom/AnimatedContent';
import BlurText from '../components/ReactbitsCom/BlurText';
import ClickSpark from '../components/ReactbitsCom/ClickSpark';

const HomePage = () => {
  const navigate = useNavigate();

  const handleSellDeviceClick = () => {
    navigate("/auth");
  };

  const handleBrowseProductsClick = () => {
    navigate("/marketplace");
  };

  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="flex flex-col bg-gray-900 text-white">
        {/* Hero Section */}
        <section
          className="relative h-[500px] sm:h-[600px] flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 max-w-xl sm:max-w-2xl text-center px-4">
            <BlurText
              text="Reduce, Reuse, Resell – A Smarter Way to Handle E-Waste"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6"
            />
            <p className="text-base sm:text-lg md:text-xl mb-8">
              Join the sustainable tech revolution. Buy, sell, and recycle
              electronics responsibly.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 w-full">
              <AnimatedContent
                distance={150}
                direction="horizontal"
                reverse={false}
                config={{ tension: 80, friction: 20 }}
                initialOpacity={0.3}
                animateOpacity
                scale={1.2}
                threshold={0.5}
                onAnimationStart={() => console.log("Animation started")}
                onAnimationComplete={() => console.log("Animation completed")}
              >
                <ClickSpark
                  sparkColor="#fff"
                  sparkSize={10}
                  sparkRadius={15}
                  sparkCount={8}
                  duration={400}
                >
                  <button
                    className="bg-green-600 text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition flex items-center justify-center w-full sm:w-auto"
                    onClick={handleSellDeviceClick}
                  >
                    Sell Your Device
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </ClickSpark>
              </AnimatedContent>
              <AnimatedContent
                distance={150}
                direction="horizontal"
                reverse={false}
                config={{ tension: 80, friction: 20 }}
                initialOpacity={0.3}
                animateOpacity
                scale={1.2}
                threshold={0.5}
              >
                <button
                  className="bg-white text-green-800 px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition w-full sm:w-auto"
                  onClick={handleBrowseProductsClick}
                >
                  Browse Products
                </button>
              </AnimatedContent>
            </div>
          </div>
        </section>

        {/* Quick Stats Section */}
        <section className="py-12 sm:py-16 bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-700 rounded-xl">
                <div className="flex justify-center mb-4">
                  <Phone className="h-10 w-10 sm:h-12 sm:w-12 text-green-600" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">2.5M+</h3>
                <p className="text-green-600">Devices Recycled</p>
              </div>
              <div className="text-center p-6 bg-gray-700 rounded-xl">
                <div className="flex justify-center mb-4">
                  <Laptop className="h-10 w-10 sm:h-12 sm:w-12 text-green-600" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">74M</h3>
                <p className="text-green-600">Tons of E-Waste by 2030</p>
              </div>
              <div className="text-center p-6 bg-gray-700 rounded-xl">
                <div className="flex justify-center mb-4">
                  <Tv className="h-10 w-10 sm:h-12 sm:w-12 text-green-600" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">500K+</h3>
                <p className="text-green-600">Active Users</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ClickSpark>
  );
};

export default HomePage;