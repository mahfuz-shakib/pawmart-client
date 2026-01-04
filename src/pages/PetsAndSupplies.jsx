import React from "react";
import Container from "../container/Container";
import ListingCard from "../component/ListingCard";
import PageBanner from "../component/PageBanner";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import useAxios from "../hooks/useAxios";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Loader from "../component/Loader";
import { useLocation } from "react-router";
import NotAvailable from "../component/NotAvailable";

const PetsAndSupplies = () => {
  const [filter, setFilter] = useState({ category: "", price: "", search: "", date: "" });
  const [products, setProducts] = useState([]);
  const { loading, setLoading } = useAuth();
  const axiosInstance = useAxios();
  const location = useLocation();
  useEffect(() => {
    setLoading(true);
    const params= new URLSearchParams(filter).toString();
    console.log(filter,params);
    axiosInstance.get(`/products/?${params}`).then((data) => {
      setProducts(data.data);
      setLoading(false);
    });
  }, [axiosInstance, setLoading,filter]);
  // const handleSearch = (e) => {
  //   e.preventDefault();

  //   axiosInstance.get(`/search/?search=${e.target.value}`).then((data) => {
  //     setLoading(true);
  //     setProducts(data.data);
  //     setLoading(false);
  //   });
  // };

  const bannerInfo = {
    title: "Pets & Supplies",
    description:
      "Browse through all available pets for adoption and pet care products. Find your perfect companion or everything your pet needs.",
    icon: "🐾",
  };
  return (
    <div className="min-h-screen mb-16">
      <title>Pet & Supplies</title>
      <PageBanner bannerInfo={bannerInfo}></PageBanner>
      <Container>
        <div className="flex flex-col md:flex-row justify-center gap-5 md:gap-12 my-6 px-3 md:bg-primary/5 py-2 rounded-md">
          <label className="input rounded-full w-full lg:w-md ">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              type="search"
              required
              placeholder="Search by name"
            />
          </label>
          <select
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            className="w-full md:w-64 select select-bordered "
          >
            <option value="" className="text-gray-500">All Categories</option>
            <option value="Pets">Pets</option>
            <option value="Food">Food</option>
            <option value="Accessories">Accessories</option>
            <option value="Care Products">Care Products</option>
          </select>

          <select
            onChange={(e) => setFilter({ ...filter, price: e.target.value })}
            className="w-full md:w-64 select select-bordered"
          >
            <option value="" className="text-gray-500">Sort by Price</option>
            <option value="HighToLow">
              High &gt; Low
            </option>
            <option value="LowToHigh">
              Low &gt; High
            </option>
          </select>
          <select
            onChange={(e) => setFilter({ ...filter, date: e.target.value })}
            className="w-full md:w-64 select select-bordered"
          >
            <option value="" className="text-gray-500">Sort by Date</option>
            <option value="NewtoOld">
              New &gt; Old
            </option>
            <option value="OldToNew">
              Old &gt; New{" "}
            </option>
          </select>
        </div>
        {loading ? (
          <Loader />
        ) : !products.length ? (
          <NotAvailable pathname={location.pathname} />
        ) : (
          <div className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {products?.map((product, index) => (
              <ListingCard key={product._id} product={product} index={index}></ListingCard>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default PetsAndSupplies;
