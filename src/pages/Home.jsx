import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import Container from "../container/Container";
import ListingCard from "../component/ListingCard";
import Categories from "../component/Categories";
import useAxios from "../hooks/useAxios";
import { motion } from "framer-motion";
import HeroBanner from "../component/HeroBanner";
import AdoptReason from "../component/AdoptReason";
import PetHeros from "../component/PetHeros";
const Home = () => {
  // const recentProducts = useLoaderData();
  const [recentProducts, setRecentProducts] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance.get("/recentProducts").then((data) => {
      setRecentProducts(data.data);
    });
  }, [axiosInstance]);
  // if(!recentProducts.length) return <p className="min-h-screen flex items-center justify-center">loading.....</p>
  return (
    <div className="bg-gray-0">
      <HeroBanner />
      <Container>
        <section className="py-12 mt-24 md:py-16 bg-gradient-to-br from-yellow-100 via-white to-pink-300 relative rounded-xl overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
        
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 relative z-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              PawMart by the Numbers
            </h2>
            <p className="text-gray-600 text-lg">Making a difference, one pet at a time</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-2 relative z-10">
            {[
              { number: "10K+", label: "Happy Pets", icon: "🐾", color: "from-pink-500 to-rose-500" },
              { number: "5K+", label: "Adoptions", icon: "❤️", color: "from-red-500 to-pink-500" },
              { number: "2K+", label: "Active Users", icon: "👥", color: "from-blue-500 to-cyan-500" },
              { number: "500+", label: "Listings", icon: "📋", color: "from-green-500 to-emerald-500" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className="group"
              >
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl border border-white/50 transition-all duration-300 text-center relative overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
                  
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/50 to-transparent rounded-bl-full"></div>
                  
                  <div className="relative z-10">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2
                      }}
                      className="text-4xl md:text-5xl mb-4"
                    >
                      {stat.icon}
                    </motion.div>
                    <motion.h3 
                      className={`text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {stat.number}
                    </motion.h3>
                    <p className="text-gray-600 font-semibold text-sm md:text-base">
                      {stat.label}
                    </p>
                  </div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
        <Categories></Categories>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Recent <span className="text-yello-500 bg-grad bg-clip-text text-transparent">Listings</span>
          </h1>
          <div className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {recentProducts?.map((product) => (
              <ListingCard key={product._id} product={product}></ListingCard>
            ))}
          </div>
          <div className="mb-14 w-fit mx-auto">
            <Link to="/allListings" className="btn bg-grad text-white hover:!from-pink-500 hover:!to-yellow-600">
              See All Listings
            </Link>
          </div>
        </div>
         <section className="py-16 md:py-20 my-12 md:my-16 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-secondary/5 rounded-3xl"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 relative z-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                className="inline-block mb-4"
              >
                <span className="text-5xl">🚀</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                How It Works
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Getting started with PawMart is simple. Follow these easy steps to find your perfect pet companion or list your pet for adoption.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
              {[
                {
                  step: "01",
                  title: "Browse & Search",
                  description: "Explore our wide selection of pets and products. Use filters to find exactly what you're looking for.",
                  icon: "🔍",
                  color: "from-blue-500/20 to-cyan-500/20",
                  bgGradient: "bg-gradient-to-br from-blue-50 to-cyan-50",
                  borderColor: "border-blue-300",
                },
                {
                  step: "02",
                  title: "View Details",
                  description: "Click on any listing to see full details, photos, location, and contact information of the owner.",
                  icon: "👁️",
                  color: "from-purple-500/20 to-indigo-500/20",
                  bgGradient: "bg-gradient-to-br from-purple-50 to-indigo-50",
                  borderColor: "border-purple-300",
                },
                {
                  step: "03",
                  title: "Place Order",
                  description: "Fill out the order form with your details and submit your adoption request or purchase order.",
                  icon: "📝",
                  color: "from-green-500/20 to-emerald-500/20",
                  bgGradient: "bg-gradient-to-br from-green-50 to-emerald-50",
                  borderColor: "border-green-300",
                },
                {
                  step: "04",
                  title: "Connect & Adopt",
                  description: "Get in touch with the owner, arrange pickup, and welcome your new furry friend home!",
                  icon: "🏠",
                  color: "from-orange-500/20 to-amber-500/20",
                  bgGradient: "bg-gradient-to-br from-orange-50 to-amber-50",
                  borderColor: "border-orange-300",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -10,
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative"
                >
                  <div className={`
                    ${item.bgGradient}
                    rounded-2xl p-6 md:p-8
                    border-2 ${item.borderColor}
                    shadow-lg hover:shadow-2xl
                    transition-all duration-500
                    backdrop-blur-sm
                    relative overflow-hidden
                    h-full
                  `}>
                    {/* Animated background gradient on hover */}
                    <div className={`
                      absolute inset-0 
                      bg-gradient-to-br ${item.color}
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-700
                      rounded-2xl
                    `}></div>

                    {/* Step number badge */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 + 0.2, type: "spring" }}
                      className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border-2 border-white font-bold text-primary"
                    >
                      {item.step}
                    </motion.div>

                    {/* Decorative corner */}
                    <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/40 to-transparent rounded-br-full"></div>

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ 
                          rotate: [0, -10, 10, -10, 0],
                          scale: 1.2
                        }}
                        transition={{ duration: 0.5 }}
                        className="mb-6"
                      >
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 mx-auto">
                          <motion.div
                            animate={{ 
                              scale: [1, 1.1, 1],
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: index * 0.2
                            }}
                            className="text-3xl"
                          >
                            {item.icon}
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Title */}
                      <motion.h3 
                        className="text-xl md:text-2xl font-bold mb-3 text-gray-800 group-hover:text-gray-900 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        {item.title}
                      </motion.h3>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed text-sm md:text-base group-hover:text-gray-700 transition-colors">
                        {item.description}
                      </p>

                      {/* Arrow connector (except last item) */}
                      {index < 3 && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
                          className="hidden lg:block absolute top-1/2 -right-4 md:-right-6 transform -translate-y-1/2 z-20"
                        >
                          <div className="text-3xl text-primary/50">→</div>
                        </motion.div>
                      )}
                    </div>

                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mt-12 relative z-10"
            >
              <motion.a
                href="/pets-supplies"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>Start Browsing Now</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>
          </Container>
        </section>
      </Container>
        <AdoptReason></AdoptReason>
        <PetHeros></PetHeros>
    </div>
  );
};

export default Home;
