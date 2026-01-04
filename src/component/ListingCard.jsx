import React, { useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";
import useTheme from "../hooks/useTheme";

const ListingCard = ({ product, index }) => {
  const { theme } = useTheme();

  const { _id, name, image, category, location, price } = product;
  return (
    <motion.div
      key={_id}
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`card md:h-[420px]   border-gray-200 shadow-sm overflow-hidden ${
        theme === "dark" ? "bg-gray-700" : "border"
      }`}
    >
      <div className="relative card-body p-5 flex flex-col justify-between ">
        <div className="absolute right-0 top-3">
          <i className="text-sm right-0 badge badge-sm badge-secondary rounded-r-none">{category}</i>
        </div>
        <img src={image} alt={name} className="bg-white rounded" />
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <h2 className="card-title">{name}</h2>
          </div>
          <div className="flex justify-between ">
            <span className="badge text-center">{location}</span>
            <p className="text-right ">{price} tk</p>
          </div>
        </div>
        <Link to={`/allListings/${_id}`} className="btn btn-outline">
          See Details
        </Link>
      </div>
    </motion.div>
  );
};

export default ListingCard;
