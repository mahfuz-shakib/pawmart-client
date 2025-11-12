import React from "react";
import { motion } from "framer-motion";
import Container from "../container/Container";

const PetHeros = () => {
  const petHeroes = [
     { 
      name: "Luna", 
      owner: "Sarah", 
      location: "Dhaka", 
      story: "Found her forever home!",
      petType: "Golden Retriever",
      icon: "🐕",
      gradient: "from-yellow-400/20 to-orange-400/20",
      bgGradient: "bg-gradient-to-br from-yellow-300/10 to-orange-300/10",
      borderColor: "border-yellow-300",
      iconBg: "bg-yellow-100"
    },
    { 
      name: "Max", 
      owner: "Ahmed", 
      location: "Chattogram", 
      story: "Happy and healthy!",
      petType: "Persian Cat",
      icon: "🐱",
      gradient: "from-blue-400/20 to-cyan-400/20",
      bgGradient: "bg-gradient-to-br from-blue-300/10 to-cyan-300/10",
      borderColor: "border-blue-300",
      iconBg: "bg-blue-100"
    },
    { 
      name: "Bella", 
      owner: "Fatima", 
      location: "Sylhet", 
      story: "Loving her new family!",
      petType: "Labrador",
      icon: "🐶",
      gradient: "from-pink-400/20 to-rose-400/20",
      bgGradient: "bg-gradient-to-br from-pink-300/10 to-rose-300/10",
      borderColor: "border-pink-300",
      iconBg: "bg-pink-100"
    },
  ];
  return (
    <div >
      <Container>
         <section className="py-16 md:py-20 my-12 md:my-16">
          
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Meet Our Pet Heroes</h2>
              <p className="text-gray-600 text-lg">Success stories from our community</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {petHeroes.map((hero, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div className={`card ${hero.bgGradient} shadow-md hover:shadow-lg transition-shadow duration-300 h-full`}>
                    <div className="card-body text-center">
                      {/* Pet Icon */}
                      <div className="mb-4">
                        <div className="text-6xl">{hero.icon}</div>
                      </div>

                      {/* Pet Name */}
                      <h3 className="text-2xl font-bold mb-2">{hero.name}</h3>

                      {/* Pet Type */}
                      <p className="text-sm text-gray-500 mb-4">{hero.petType}</p>

                      {/* Divider */}
                      <div className="divider my-4"></div>

                      {/* Owner Info */}
                      <div className="space-y-2 mb-4">
                        <p className="text-gray-700">
                          <span className="font-semibold">Owner:</span> {hero.owner}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Location:</span> {hero.location}
                        </p>
                      </div>

                      {/* Success Story */}
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-primary font-semibold italic">"{hero.story}"</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      </Container>
    </div>
  );
};

export default PetHeros;
