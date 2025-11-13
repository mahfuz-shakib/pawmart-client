import React from "react";
import { motion } from "framer-motion";
import { FaHeart, FaHome, FaShieldAlt, FaUsers, FaDollarSign } from "react-icons/fa";
import Container from "../container/Container";
const AdoptReason = () => {
  const whyAdoptFeatures = [
    {
      icon: <FaHeart />,
      title: "Save Lives",
      desc: "Give a pet a second chance at happiness and make a real difference in their life",
      color: "from-red-500/20 to-pink-500/20",
      iconColor: "text-red-500",
      bgGradient: "bg-gradient-to-br from-red-50 to-pink-50",
    },
    {
      icon: <FaHome />,
      title: "Support Community",
      desc: "Help local pet owners and shelters while building a stronger pet-loving community",
      color: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500",
      bgGradient: "bg-gradient-to-br from-blue-50 to-cyan-50",
    },
    {
      icon: <FaShieldAlt />,
      title: "Verified Listings",
      desc: "Trusted and verified pet owners ensure safe and reliable adoption experiences",
      color: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-500",
      bgGradient: "bg-gradient-to-br from-green-50 to-emerald-50",
    },
    {
      icon: <FaUsers />,
      title: "Direct Connection",
      desc: "No middleman - connect directly with pet owners for a personal adoption journey",
      color: "from-purple-500/20 to-indigo-500/20",
      iconColor: "text-purple-500",
      bgGradient: "bg-gradient-to-br from-purple-50 to-indigo-50",
    },
    {
      icon: <FaDollarSign />,
      title: "Affordable",
      desc: "Free adoption or fair prices make pet ownership accessible to everyone",
      color: "from-orange-500/20 to-amber-500/20",
      iconColor: "text-orange-500",
      bgGradient: "bg-gradient-to-br from-orange-50 to-amber-50",
    },
  ];
  return (
    <section className="py-16 md:py-20 my-12 md:my-16 relative rounded-3xl overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-secondary/5 to-primary/5 rounded-3xl overflow-hidden"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 overflow-hidden"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 overflow-hidden"></div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 relative z-10 mx-3"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="text-5xl">🐾</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-grad bg-clip-text text-transparent">
            Why Adopt from PawMart?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of pet lovers who have found their perfect companions through our platform. Experience the
            joy of giving a pet a loving home.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 md:gap- relative z-10 mx-3">
          {whyAdoptFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                y: -10,
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
              className="group relative"
            >
              <div
                className={`
                    ${feature.bgGradient}
                    rounded-2xl px-4 py-8 h-full
                    border border-white/50
                    shadow-lg hover:shadow-2xl
                    transition-all duration-300
                    backdrop-blur-sm
                    relative overflow-hidden
                  `}
              >
                {/* Animated background gradient on hover */}
                <div
                  className={`
                      absolute inset-0 
                      bg-linear-to-br ${feature.color}
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-500
                      rounded-2xl
                    `}
                ></div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-white/30 to-transparent rounded-bl-full"></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon with animation */}
                  <motion.div
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.5 }}
                    className={`
                          w-16 h-16 mx-auto mb-6
                          ${feature.iconColor}
                          bg-white rounded-2xl
                          flex items-center justify-center
                          shadow-lg group-hover:shadow-xl
                          transition-all duration-300
                        `}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="text-2xl"
                    >
                      {feature.icon}
                    </motion.div>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="text-xl font-bold mb-4 text-gray-800 group-hover:text-gray-900 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {feature.title}
                  </motion.h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed text-base group-hover:text-gray-700 transition-colors">
                    {feature.desc}
                  </p>

                  {/* Decorative line */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
                    className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mt-6 rounded-full"
                  ></motion.div>
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 relative z-10"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-white/50">
            <span className="text-2xl">✨</span>
            <span className="text-gray-700 font-semibold">Trusted by thousands of pet lovers</span>
            <span className="text-2xl">✨</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default AdoptReason;
