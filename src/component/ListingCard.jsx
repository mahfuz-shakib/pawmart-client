import React, { useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import { Link } from "react-router";
import useTheme from "../hooks/useTheme";

const ListingCard = ({ product }) => {
    const {theme} = useTheme();

  const { _id, name, image, category, location, price } = product;
  return (
    <div className={`card h-[484px] shadow-sm ${theme==='dark'?"bg-gray-700":""}`}>
      <img src={image} alt={name} className="size-64 mx-auto h-[65%] w-full object-cover" />
      <div className="card-body flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <h2 className="card-title">{name}</h2>
            <i className="text-sm badge badge-secondary ">{category}</i>
          </div>
          <div className="flex justify-between ">
            <i className="badge text-center">{location}</i>
            <p className="text-right ">{price} tk</p>
          </div>
        </div>
        <Link to={`/allListings/${_id}`} className="btn btn-outline">
          See Details
        </Link>
      </div>
    </div>
  );
};

export default ListingCard;
