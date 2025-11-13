import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import useAxios from "../hooks/useAxios";
import Container from "../container/Container";
import OrderForm from "../component/OrderForm";
import useAuth from "../hooks/useAuth";
import Loader from "../component/Loader";

const ListingDetails = () => {
  const [item, setItem] = useState({});
  const { loading, setLoading } = useAuth();
  const { id } = useParams();
  const modalRef = useRef();
  const axiosInstance = useAxios();
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/products/${id}`)
      .then((data) => {
        setItem(data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id, axiosInstance, setLoading]);
  const { name, image, category, price, location, description, email } = item || {};
  const handleOrder = () => {
    modalRef.current.showModal();
  };
  return (
    <div className="min-h-screen">
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 my-16">
            <div className="space-y-5">
              <img src={image} alt={name} />
              <p>{description}</p>
            </div>
            <div className="space-y-5">
              <h1>{name}</h1>
              <p>{category}</p>
              <p>{price}</p>
              <p>{location}</p>
              <p>{email}</p>
              <button onClick={handleOrder} className="btn">
                {category === "Pets" ? "Adopt Now" : "Order Now"}
              </button>
            </div>
          </div>
          <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
            <div className="bg-white p-2 md:p-5 rounded ">
              <h1 className="text-center font-bold mb-3">Place Order Information</h1>
              <OrderForm modalRef={modalRef} item={item} />
              <div className="">
                <form method="dialog">
                  <button className="btn">Cancel</button>
                </form>
              </div>
            </div>
          </dialog>
        </Container>
      )}
    </div>
  );
};

export default ListingDetails;
