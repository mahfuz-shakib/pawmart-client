import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { toast } from "react-toastify";

const UpdateListing = ({ updateItem, modalRef, setMyListings }) => {
  const [category, setCategory] = useState(updateItem.category);
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const handleUpdateInfo = (e) => {
    e.preventDefault();
    let price = parseInt(e.target.price.value);
    // const category = e.target.category.value;
    if (category === "Pets") price = 0;
    const updatedListing = {
      name: e.target.name.value,
      category: category,
      price: price,
      location: e.target.location.value,
      description: e.target.description.value,
      image: e.target.photo.value,
      email: e.target.email.value,
      date: e.target.date.value,
    };
    console.log(updatedListing);
    axiosInstance
      .patch(`/products/${updateItem._id}`, updatedListing)
      .then((data) => {
        console.log(data);
        axiosInstance
          .get(`/products/?email=${user.email}`)
          .then((data) => setMyListings(data.data))
          .catch((err) => console.log(err));
        toast.success("Updated successfully");
        modalRef.current.close();
      })
      .catch((err) => {
        toast.error("Added failed");
        console.log(err);
      });
    // e.target.reset();
  };
  return (
    <>
      <form onSubmit={handleUpdateInfo}>
        <fieldset className="fieldset space-y-1">
          <div className="flex flex-col md:flex-row justify-between gap-5">
            <div className="w-xs md:w-md">
              <label className="label">Product/Pet Name</label>
              <br />
              <input type="text" name="name" className="input-field " defaultValue={updateItem.name} required />
            </div>
            <div>
              <label className="label">Select Category</label>
              <br />
              <select
                defaultValue={updateItem.category}
                onChange={(e) => setCategory(e.target.value)}
                className="md:w-xs select select-bordered"
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
            <div className="w-xs md:w-md">
              <label className="label">Location</label>
              <br />
              <input type="text" name="location" className="input-field" defaultValue={updateItem.location} required />
            </div>
            <div className=" w-xs">
              <label className="label">Price (tk) [0 is category is pets] </label> <br />
              <input type="number" name="price" className="input-field" defaultValue={updateItem.price} required />
            </div>
          </div>
          <div>
            <label className="label">Description</label>
            <br />
            <textarea
              name="description"
              className="textarea textarea-bordered h-24 md:h-4 w-xs md:w-full"
              defaultValue={updateItem.description}
              required
            ></textarea>
          </div>
          <div className="w-xs md:w-full">
            <label className="label">Photo URL</label>
            <input type="text" name="photo" className="input-field" defaultValue={updateItem.image} required />
          </div>
          <div className="w-full flex flex-col md:flex-row gap-5 md:gap-10 justify-between">
            <div className="w-xs md:w-md">
              <label className="label">Email</label>
              <input type="email" name="email" className="input-field" defaultValue={user.email} readOnly />
            </div>
            <div className="w-xs">
              <label className="label">Pick Up Date</label>
              <input type="date" name="date" className="input-field" defaultValue={updateItem.date} required />
            </div>
          </div>
          <button className="btn mx-auto w-sm bg-purple-700 text-white mt-4 hover:bg-purple-800">Update</button>
        </fieldset>
      </form>
    </>
  );
};

export default UpdateListing;
