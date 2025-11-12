import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import Container from "../container/Container";
import ListingCard from "../component/ListingCard";
import Categories from "../component/Categories";
import useAxios from "../hooks/useAxios";
import { motion } from "framer-motion";
import HeroBanner from "../component/HeroBanner";
const Home = () => {
  // const recentProducts = useLoaderData();
  const [recentProducts, setRecentProducts] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance.get("/recentProducts").then((data) => {
      setRecentProducts(data.data);
    });
  }, [axiosInstance]);
  // if(!recentProducts.length) return <p className="min-h-screen flex items-center justify-center">loading.....</p>
  return (
    <div>
      <HeroBanner />
      <Container>
        <Categories></Categories>
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Recent <span className="text-yello-500 bg-grad bg-clip-text text-transparent">Listings</span>
        </h1>
        <div className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {recentProducts?.map((product) => (
            <ListingCard key={product._id} product={product}></ListingCard>
          ))}
        </div>
        <div className="mb-14 w-fit mx-auto">
          <Link to='/allListings' className="btn bg-grad text-white hover:!from-pink-500 hover:!to-yellow-600">
            See All Listings
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Home;
