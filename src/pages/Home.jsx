import React from "react";
import { useLoaderData } from "react-router";
import Container from "../container/Container";
import ListingCard from "../component/ListingCard";
import Categories from "../component/Categories";
const Home = () => {
  const recentProducts = useLoaderData();
  console.log(recentProducts);
  return (
    <div>
      <Container>
        <Categories></Categories>
        <h1 className="text-5xl font-bold text-center mb-10">
          Recent <span className="text-fuchsia-500">Listing</span>
        </h1>
        <div className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {recentProducts?.map(product=><ListingCard key={product._id} product={product}></ListingCard>)}
        </div>
      </Container>
    </div>
  );
};

export default Home;
