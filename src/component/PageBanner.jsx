import React from "react";
import { motion } from "framer-motion";
import Container from "../container/Container";

const PageBanner = ({ bannerInfo }) => {
  const { title, description, icon } = bannerInfo;
  return (
    <section className="bg-linear-to-r from-primary/10 via-secondary/10 to-primary/10 py-12 md:py-16">
      <Container>
        <div className="sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {icon && <div className="text-5xl md:text-6xl mb-4">{icon}</div>}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-700 mb-4">{title}</h1>
            {description && <p className="text-base md:text-lg text-indigo-900 max-w-5xl mx-auto opacity-90">{description}</p>}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default PageBanner;
