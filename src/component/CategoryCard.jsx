import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
const CategoryCard = ({ category }) => {
  let categoryName = category.name;
  return (
    <Link to={`/category-filtered-product/${categoryName}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        className="card bg-linear-to-br from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 transition-all cursor-pointer rounded-xl"
      >
        <div className="card-body items-center text-center p-6">
          <div className="text-5xl mb-4">{category.icon}</div>
          <h3 className="card-title text-xl">{category.name}</h3>
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;
