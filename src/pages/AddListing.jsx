import React, { useState } from "react";
import Container from "../container/Container";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { toast } from "react-toastify";
import PageBanner from "../component/PageBanner";
import Loader from "../component/Loader";
import useTheme from "../hooks/useTheme";
import { motion } from "framer-motion";

const AddListing = () => {
  const { user, loading, setLoading } = useAuth();
  const [category, setCategory] = useState("Pets");
  const axiosInstance = useAxios();
  const { theme } = useTheme();
  const handleSubmit = (e) => {
    e.preventDefault();
    let price = parseInt(e.target.price.value);
    if (category === "Pets") price = 0;
    const newListing = {
      name: e.target.name.value,
      category: category,
      price: price,
      location: e.target.location.value,
      description: e.target.description.value,
      image: e.target.photo.value,
      email: e.target.email.value,
      date: e.target.date.value,
    };
    setLoading(true);
    axiosInstance
      .post("/products", newListing)
      .then((data) => {
        console.log(data);
        toast.success("Listing added successfully");
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Added failed");
        console.log(err);
      });
    console.log(newListing);
    e.target.reset();
  };
  const bannerInfo = {
    title: "Add New Listing",
    description: "Share your listing with the PawMart community and help pets find loving homes.",
    icon: "➕",
  };
  return (
    <div className="min-h-screen">
      <title>AddListing</title>
      <PageBanner bannerInfo={bannerInfo}></PageBanner>
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className=" max-w-76 md:max-w-[856px]  mx-auto card rounded-lg overflow-hidden my-16"
          >
            <div
              className={`card-body px-2 ${
                theme === "dark" ? "bg-linear-to-r from-primary/10 via-secondary/10 to-primary/10 " : "bg-indigo-50"
              } `}
            >
              <form onSubmit={handleSubmit}>
                <fieldset className="! fieldset space-y-2">
                  <div className="flex flex-col md:flex-row justify-between gap-5">
                    <div className="w-72 md:w-md">
                      <label className="label">Product/Pet Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="input-field"
                        placeholder="Enter product/pet name"
                        required
                      />
                    </div>
                    <div className="w-72 md:w-xs">
                      <label className="label">Select Category</label>
                      <br />
                      <select
                        defaultValue={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="select select-bordered"
                        required
                      >
                        <option>Pets</option>
                        <option>Food</option>
                        <option>Accessories</option>
                        <option>Care Products</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full flex flex-col md:flex-row gap-5 md:gap-10 justify-between">
                    <div className="w-72 md:w-md">
                      <label className="label">Location</label>
                      <br />
                      <input type="text" name="location" className="input-field" placeholder="e.g. Jashore" required />
                    </div>
                    <div className="w-72 md:w-xs">
                      <label className="label">Price (tk)</label> <br />
                      <input
                        type="number"
                        name="price"
                        id="price"
                        className="input-field"
                        placeholder="0 if category is pets"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-72 md:w-full">
                    <label className="label">Description</label>
                    <br />
                    <textarea
                      name="description"
                      className="textarea textarea-bordered h-24 md:h-8 md:w-full"
                      placeholder="Enter description"
                      required
                    ></textarea>
                  </div>
                  <div className="w-72 md:w-full">
                    <label className="label">Photo URL</label>
                    <input
                      type="text"
                      name="photo"
                      id="text"
                      className="input-field "
                      placeholder="Add product photo url"
                      required
                    />
                  </div>
                  <div className="w-full flex flex-col md:flex-row gap-5 md:gap-10 justify-between">
                    <div className="w-72  md:w-md">
                      <label className="label">Email</label>
                      <input type="email" name="email" className="input-field" defaultValue={user.email} readOnly />
                    </div>
                    <div className="w-72 md:w-xs">
                      <label className="label">Pick Up Date</label>
                      <input type="date" name="date" className="input-field" placeholder="Pick up a date" required />
                    </div>
                  </div>
                  <button
                    className={`btn mx-auto w-72  md:w-sm  text-white mt-4 hover:bg-purple-800 ${
                      theme === "dark" ? "bg-linear-to-r from-primary via-secondary/10 to-primary" : "bg-grad"
                    }`}
                  >
                    Add to Listings
                  </button>
                </fieldset>
              </form>
            </div>
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default AddListing;
