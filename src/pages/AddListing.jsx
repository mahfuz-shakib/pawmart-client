import React, { useState } from "react";
import Container from "../container/Container";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { toast } from "react-toastify";
import PageBanner from "../component/PageBanner";

const AddListing = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [category, setCategory] = useState("Pet");
  const handleSubmit = (e) => {
    e.preventDefault();
    const newListing = {
      name: e.target.name.value,
      category: category,
      price: parseInt(e.target.price.value),
      location: e.target.location.value,
      description: e.target.description.value,
      image: e.target.photo.value,
      email: e.target.email.value,
      date: e.target.date.value,
    };
    axiosInstance
      .post("/products", newListing)
      .then((data) => {
        console.log(data);
        toast.success("Added successfully");
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
      <PageBanner bannerInfo={bannerInfo}></PageBanner>
      <Container>
        <div className="max-w-[856px] mx-auto card rounded-lg overflow-hidden my-16">
          <div className="card-body bg-violet-50">
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset space-y-2">
                <div className="flex flex-col md:flex-row gap-5">
                  <div>
                    <label className="label">Product/Pet Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="input-field md:!w-md"
                      placeholder="Enter product/pet name"
                      required
                    />
                  </div>
                  <div>
                    <label className="label">Select Category</label>
                    <br />
                    <select
                      defaultValue={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-xs select select-bordered"
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
                  <div className="md:w-md">
                    <label className="label">Location</label>
                    <br />
                    <input type="text" name="location" className="input-field" placeholder="e.g. Jashore" required />
                  </div>
                  <div className="md:w-xs">
                    <label className="label">Price (tk)</label> <br />
                    <input
                      type="number"
                      name="price"
                      id="price"
                      className="input-field"
                      placeholder="e.g. 1000"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="label">Description</label>
                  <textarea
                    name="description"
                    className="textarea textarea-bordered h-24 md:h-8 md:w-full"
                    placeholder="Enter description"
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="label">Photo URL</label>
                  <input
                    type="text"
                    name="photo"
                    id="text"
                    className="input-field"
                    placeholder="Add product photo url"
                    required
                  />
                </div>
                <div className="w-full flex flex-col md:flex-row gap-5 md:gap-10 justify-between">
                  <div className="md:w-md">
                    <label className="label">Email</label>
                    <input type="email" name="email" className="input-field" defaultValue={user.email} readOnly />
                  </div>
                  <div className="md:w-xs">
                    <label className="label">Pick Up Date</label>
                    <input type="date" name="date" className="input-field" placeholder="Pick up a date" required />
                  </div>
                </div>
                <button className="btn mx-auto w-sm bg-purple-700 text-white mt-4 hover:bg-purple-800">
                  Add to Listings
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AddListing;
