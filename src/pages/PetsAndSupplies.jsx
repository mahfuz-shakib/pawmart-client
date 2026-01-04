import React from "react";
import Container from "../container/Container";
import ListingCard from "../component/ListingCard";
import PageBanner from "../component/PageBanner";
import { useState } from "react";
import useAxios from "../hooks/useAxios";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Loader from "../component/Loader";
import { useLocation } from "react-router";
import NotAvailable from "../component/NotAvailable";
import { useMemo } from "react";
import { motion } from "framer-motion";

const PetsAndSupplies = () => {
  const [filter, setFilter] = useState({ category: "", price: "", search: "", date: "" });
  const [response, setResponse] = useState([]);
  const { loading, setLoading } = useAuth();
  const axiosInstance = useAxios();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // 12 items per page (4 columns x 3 rows)
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({
      ...filter,
      page: currentPage.toString(),
      limit: pageSize.toString(),
    }).toString();
    console.log(filter, params);
    axiosInstance.get(`/products/?${params}`).then((data) => {
      setResponse(data.data);
      setLoading(false);
    });
  }, [axiosInstance, setLoading, filter, currentPage]);

  const products = response?.data || [];
  const pagination = response?.pagination || { page: 1, limit: pageSize, total: 0, totalPages: 1 };

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filter.category, filter.price, filter.date, filter.search]);

  const paginationButtons = useMemo(() => {
    if (pagination.totalPages <= 1) return [];
    const pages = Array.from({ length: pagination.totalPages }, (_, i) => i + 1);
    return pages.filter((page) => {
      return page === 1 || page === pagination.totalPages || (page >= currentPage - 1 && page <= currentPage + 1);
    });
  }, [pagination.totalPages, currentPage]);

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
            <option value="" className="text-gray-500">
              All Categories
            </option>
            <option value="Pets">Pets</option>
            <option value="Food">Food</option>
            <option value="Accessories">Accessories</option>
            <option value="Care Products">Care Products</option>
          </select>

          <select
            onChange={(e) => setFilter({ ...filter, price: e.target.value })}
            className="w-full md:w-64 select select-bordered"
          >
            <option value="" className="text-gray-500">
              Sort by Price
            </option>
            <option value="HighToLow">High &gt; Low</option>
            <option value="LowToHigh">Low &gt; High</option>
          </select>
          <select
            onChange={(e) => setFilter({ ...filter, date: e.target.value })}
            className="w-full md:w-64 select select-bordered"
          >
            <option value="" className="text-gray-500">
              Sort by Date
            </option>
            <option value="NewtoOld">New &gt; Old</option>
            <option value="OldToNew">Old &gt; New </option>
          </select>
        </div>
        {loading ? (
          <Loader />
        ) : !products.length ? (
          <NotAvailable pathname={location.pathname} />
        ) : (
          <>
            <div className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {products?.map((product, index) => (
                <ListingCard key={product._id} product={product} index={index}></ListingCard>
              ))}
            </div>
            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap justify-center items-center gap-3  my-8"
              >
                <motion.button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="btn btn-outline"
                  whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                  whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                >
                  Previous
                </motion.button>
                <div className="flex gap-2">
                  {paginationButtons.map((page, index, array) => {
                    const showEllipsisBefore = index > 0 && array[index - 1] !== page - 1;
                    return (
                      <React.Fragment key={page}>
                        {showEllipsisBefore && <span className="px-2 text-gray-500">...</span>}
                        <motion.button
                          onClick={() => setCurrentPage(page)}
                          className={`btn ${currentPage === page ? "btn-primary" : "btn-outline"}`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {page}
                        </motion.button>
                      </React.Fragment>
                    );
                  })}
                </div>
                <motion.button
                  onClick={() => setCurrentPage((prev) => Math.min(pagination.totalPages, prev + 1))}
                  disabled={currentPage === pagination.totalPages}
                  className="btn btn-outline"
                  whileHover={{ scale: currentPage === pagination.totalPages ? 1 : 1.05 }}
                  whileTap={{ scale: currentPage === pagination.totalPages ? 1 : 0.95 }}
                >
                  Next
                </motion.button>
                <span className="text-sm text-gray-600 px-4">
                  Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
                </span>
              </motion.div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default PetsAndSupplies;
