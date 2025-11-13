import React from "react";
import Container from "../container/Container";
import { useState } from "react";
import { useEffect } from "react";
import useAxios from "../hooks/useAxios";
import { Link, useLocation, useParams } from "react-router";
import ListingCard from "../component/ListingCard";
import useAuth from "../hooks/useAuth";
import Loader from "../component/Loader";
import NotAvailable from "../component/NotAvailable";
import { FaArrowLeft } from "react-icons/fa";
const CategoyrFiltered = () => {
  const [products, setProducts] = useState([]);
  const { categoryName } = useParams();
  const { loading, setLoading } = useAuth();
  const axiosInstance = useAxios();
  const location = useLocation();
  console.log(products);
  useEffect(() => {
    setLoading(true);
    axiosInstance.get(`/products/?category=${categoryName}`).then((data) => {
      setProducts(data.data);
      setLoading(false);
    });
  }, [categoryName, axiosInstance, setLoading]);
  return (
    <div className="min-h-screen">
      <Container>
        <title>{categoryName}</title>
        <Link to='/' className="flex items-center gap-2 mt-5 btn w-fit"><FaArrowLeft/> <span>Go Back</span></Link>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-center mt-8">
            Our Featured <span className="text-yello-500 bg-grad bg-clip-text text-transparent">{categoryName}</span>
          </h1>
          {loading ? (
            <Loader />
          ) : products.length === 0 ? (
            <NotAvailable pathname={location.pathname} />
          ) : (
            <div className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-16">
              {products?.map((product) => (
                <ListingCard key={product._id} product={product}></ListingCard>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default CategoyrFiltered;
