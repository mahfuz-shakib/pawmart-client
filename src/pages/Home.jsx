import React from "react";
import { useLoaderData } from "react-router";
import Container from "../container/Container";
import ListingCard from "../component/ListingCard";
const Home = () => {
  const recentProducts = useLoaderData();
  console.log(recentProducts);
  return (
    <div>
      <Container>
        <h1 className="text-5xl font-bold text-center my-10">
          Recent <span className="text-fuchsia-500">Listing</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentProducts?.map(product=><ListingCard key={product._id} product={product}></ListingCard>)}
        </div>
      </Container>
    </div>
  );
};

export default Home;
