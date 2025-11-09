import React from "react";
import { Link } from "react-router";

const ListingCard = ({ product }) => {
  const { name, image, category, location, price } = product;
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={image} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="text-sm">{category}</p>
        <p className="">{location}</p>
        <p className="">{price}</p>
        <Link className="btn btn-outline">See Details</Link>
      </div>
    </div>
  );
};

export default ListingCard;
