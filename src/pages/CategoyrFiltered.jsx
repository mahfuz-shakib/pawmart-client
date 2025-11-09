import React from "react";
import Container from "../container/Container";
import { useState } from "react";
import { useEffect } from "react";
import useAxios from "../hooks/useAxios";
import { useParams } from "react-router";
import ListingCard from "../component/ListingCard";
const CategoyrFiltered = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const axiosInstance = useAxios();
  console.log(products);
  useEffect(() => {
    axiosInstance.get(`/products/?category=${categoryName}`).then((data) => {
      setProducts(data.data);
    });
  }, [categoryName, axiosInstance]);
  return (
    <Container>
      <title>{categoryName}</title>
      <div>
        <h1 className="text-5xl font-bold text-center my-10">
          Our Featured <span className="text-fuchsia-500">{categoryName}</span>
        </h1>
        <div className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products?.map((product) => (
            <ListingCard key={product._id} product={product}></ListingCard>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default CategoyrFiltered;
