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

const PetsAndSupplies = () => {
  const [products, setProducts] = useState([]);
  const {loading,setLoading} = useAuth();
  const [selectedCategory, setSeletedCategory] = useState("All Categories");
  // const [selectedSort, setSeletedSort] = useState("All");
  const axiosInstance = useAxios();

  useEffect(() => {
    setLoading(true)
    axiosInstance.get(`/products/?category=${selectedCategory}`).then((data) => {
      setProducts(data.data);
      setLoading(false)
    });
  }, [selectedCategory, axiosInstance,setLoading]);
  const handleSearch = (e) => {
    e.preventDefault();

    axiosInstance.get(`/search/?search=${e.target.value}`).then((data) => {
      setLoading(true)
      setProducts(data.data);
      setLoading(false)
    });
  };

  const bannerInfo = {
    title: "Pets & Supplies",
    description:
      "Browse through all available pets for adoption and pet care products. Find your perfect companion or everything your pet needs.",
    icon: "🐾",
  };
  return (
    <div className="min-h-screen">
      <PageBanner bannerInfo={bannerInfo}></PageBanner>
      <Container>
        <div className="flex flex-col md:flex-row justify-center gap-5 md:gap-12 my-10 px-3">
          <select
            onChange={(e) => setSeletedCategory(e.target.value)}
            defaultValue="All Categories"
            className="w-64 select select-bordered bg-indigo-50"
          >
            <option className="text-gray-500">All Categories</option>
            <option>Pets</option>
            <option>Food</option>
            <option>Accessories</option>
            <option>Care Products</option>
          </select>
          <label className="input rounded-full lg:w-md bg-indigo-50">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input onChange={handleSearch} type="search" required placeholder="Search by name" />
          </label>
          {/* <select defaultValue="Sort by Date" className="w-64 select select-bordered bg-indigo-50">
            <option className="text-gray-500">Sort by Date</option>
            <option>
              New <FaArrowRight /> Old
            </option>
            <option>
              Old <FaArrowRight /> New{" "}
            </option>
          </select> */}
        </div>
        <div className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading?<Loader/>:products?.map((product) => (
            <ListingCard key={product._id} product={product}></ListingCard>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default PetsAndSupplies;
