import React from "react";
import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";
const Categories = () => {
  const categories = [
    { name: "Pets", icon: "🐾" },
    { name: "Food", icon: "🍖" },
    { name: "Accessories", icon: "🎾" },
    { name: "Care Products", icon: "💊" },
  ];
  return (
    <section className="my-20 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Browse <span className="text-yello-500 bg-grad bg-clip-text text-transparent">Categories</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CategoryCard category={category}></CategoryCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Categories;
