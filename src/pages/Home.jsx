import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Container from "../container/Container";
import ListingCard from "../component/ListingCard";
import Categories from "../component/Categories";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";
import HeroBanner from "../component/HeroBanner";
import AdoptReason from "../component/AdoptReason";
import PetHeros from "../component/PetHeros";
import Loader from "../component/Loader";
const Home = () => {
  // const recentProducts = useLoaderData();
  const [recentProducts, setRecentProducts] = useState([]);
  const { loading, setLoading } = useAuth();
  const axiosInstance = useAxios();

  useEffect(() => {
    setLoading(true);
    axiosInstance.get("/recentProducts").then((data) => {
      setRecentProducts(data.data);
      setLoading(false);
    });
  }, [axiosInstance, setLoading]);
  // if(!recentProducts.length) return <p className="min-h-screen flex items-center justify-center">loading.....</p>
  return (
    <div className="bg-gray-0">
      <title>PawMart/Home</title>
      <HeroBanner />
      <Container>
        <section className="py-12 mt-24 md:py-16 bg-linear-to-br from-yellow-100 via-white to-pink-300 relative rounded-xl overflow-hidden">
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
              <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-grad bg-clip-text text-transparent">
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
                    stiffness: 100,
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  className="group"
                >
                  <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl border border-white/50 transition-all duration-300 text-center relative overflow-hidden">
                    {/* Gradient overlay on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}
                    ></div>

                    {/* Decorative corner */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/50 to-transparent rounded-bl-full"></div>

                    <div className="relative z-10">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.2,
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
                      <p className="text-gray-600 font-semibold text-sm md:text-base">{stat.label}</p>
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
          <div className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {loading ? (
              <Loader />
            ) : (
              recentProducts?.map((product,index) => <ListingCard key={product._id} product={product} index={index}></ListingCard>)
            )}
          </div>
          <div className="mb-14 w-fit mx-auto">
            <Link to="/allListings" className="btn bg-grad text-white hover:!from-pink-500 hover:!to-yellow-600">
              See All Listings
            </Link>
          </div>
        </div>
      </Container>
      <AdoptReason></AdoptReason>
      <PetHeros></PetHeros>
    </div>
  );
};

export default Home;
