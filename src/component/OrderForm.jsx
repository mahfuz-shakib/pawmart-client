import React from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const OrderForm = ({ item, modalRef }) => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const handleFormInfo = (e) => {
    e.preventDefault();
    let quantity = parseInt(e.target.quantity.value);
    if (item.category === "Pets") quantity = 1;
    const orderInfo = {
      productId: item._id,
      productName: item.name,
      buyerName: e.target.name.value,
      email: e.target.email.value,
      quantity: quantity,
      price: item.price,
      address: e.target.address.value,
      phone: e.target.phone.value,
      date: e.target.date.value,
      additionalNotes: e.target.notes.value,
    };
    console.log(orderInfo);
    axiosInstance
      .post("/orders", orderInfo)
      .then((data) => {
        console.log(data);
        toast.success("Order placed successfully");
        modalRef.current.close();
      })
      .catch((err) => {
        toast.error("Order failed");
        console.log(err);
      });
    e.target.reset();
  };
  return (
    <>
      <form onSubmit={handleFormInfo}>
        <fieldset className="fieldset space-y-1">
          <div className="flex flex-col md:flex-row justify-between gap-5">
            <div className="w-xs md:w-sm">
              <label className="label">Buyer Name</label>
              <br />
              <input type="text" name="name" className="input-field " defaultValue={user.displayName} readOnly />
            </div>
            <div className="w-xs md:w-sm">
              <label className="label">Email</label>
              <input type="email" name="email" className="input-field" defaultValue={user.email} readOnly />
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row gap-5 md:gap-10 justify-between">
            <div className="w-xs md:w-sm">
              <label className="label">Address</label>
              <br />
              <input type="text" name="address" className="input-field " placeholder="Enter your address" required />
            </div>
            <div className="w-xs md:w-sm">
              <label className="label">Phone</label>
              <br />
              <input type="text" name="phone" className="input-field " placeholder="+880..." required />
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row gap-5 md:gap-10 justify-between">
            <div className="w-xs md:w-sm">
              <label className="label">Product/Listing ID</label>
              <input type="text" name="productId" className="input-field" defaultValue={item._id} readOnly />
            </div>
            <div className="w-xs md:w-sm">
              <label className="label">Product/Listing Name</label>
              <input type="text" name="productName" className="input-field" defaultValue={item.name} readOnly />
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row gap-5 md:gap-10 justify-between">
            <div className="">
              <label className="label">Price (tk)</label> <br />
              <input type="number" name="price" className="input-field" defaultValue={item.price} readOnly />
            </div>
            <div className="">
              <label className="label">Quantity</label>
              <input
                type="number"
                name="quantity"
                className="input-field"
                placeholder="1 if category is pet, else 1 or more"
                required
              />
            </div>
            <div className="">
              <label className="label">Pick Up Date</label>
              <input type="date" name="date" className="input-field" placeholder="Pick up date" required />
            </div>
          </div>
          <div>
            <label className="label">Additional Notes</label>
            <br />
            <textarea
              name="notes"
              className="textarea textarea-bordered h-24 md:h-4 w-xs md:w-full"
              placeholder="Enter some extra notes"
              required
            ></textarea>
          </div>
          <button className="btn mx-auto w-sm bg-grad text-white mt-4 hover:scale-102">Place Order</button>
        </fieldset>
      </form>
    </>
  );
};

export default OrderForm;
