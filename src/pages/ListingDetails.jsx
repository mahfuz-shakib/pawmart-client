import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import useAxios from "../hooks/useAxios";
import Container from "../container/Container";
import OrderForm from "../component/OrderForm";
import useAuth from "../hooks/useAuth";
import Loader from "../component/Loader";
import useTheme from "../hooks/useTheme";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

const ListingDetails = () => {
  const [item, setItem] = useState({});
  const { user, loading, setLoading } = useAuth();
  const { theme } = useTheme();
  const { id } = useParams();
  const loacation = useLocation();
  const navigate = useNavigate();
  const modalRef = useRef();
  const axiosInstance = useAxios();
  useEffect(() => {
    // setLoading(true);
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
    if (user && !loading) {
      modalRef.current.showModal();
    } else {
      console.log("navigate");
      navigate("/login", { state: loacation.pathname, replace: true });
    }
  };
  const handleBack=()=>{
    navigate(-1);
  }
  return (
    <div className="min-h-scree flex justify-center items-center">
      <title>{name}</title>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <div className="mt-3">
            <button onClick={handleBack} className="btn ">
              <FaArrowLeft /> Go Back!
            </button>
          </div>
          <div className="bg-primary/5 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-32 mb-8 mt-3 py-16 rounded-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <img src={image} alt={name} className="h-64 mx-auto md:h-96 bg-white rounded" />
              <div className="p-3 md:p-5  w-76 md:w-96 bg-secondary/10 rounded">{description}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6 w-fit"
            >
              <div className="card  p-5 space-y-3 bg-secondary/10">
                <h1 className="text-2xl md:text-3xl font-bold">{name}</h1>
                <p className=" badge bg-secondary/50">{category}</p>
              </div>
              <div className="p-5 text-lg  flex justify-between rounded-lg bg-secondary/10">
                <p>Price:</p>
                <p className="font-bold">{price} tk</p>
              </div>
              <div className="p-5 text-lg  flex flex-wrap justify-between md:gap-16 rounded-lg bg-secondary/10">
                <p>Location:</p>
                <p className="font-bold">{location}</p>
              </div>
              <div className="p-5 text-lg flex flex-col md:flex-row justify-between md:gap-16 rounded-lg bg-secondary/10">
                <p>Owner:</p>
                <p className="font-bold">{email}</p>
              </div>
              <button onClick={handleOrder} className="btn w-full bg-grad">
                {category === "Pets" ? "Adopt Now" : "Order Now"}
              </button>
            </motion.div>
          </div>
          <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle ">
            <div
              className={`p-2 md:p-4 -mt-20 md:mt-20 rounded mx-auto my-auto scale-65 md:scale-100 ${
                theme === "dark" ? "bg-black border border-gray-500" : "bg-white"
              }`}
            >
              <h1 className="text-center font-bold mb-3">Place Order Information</h1>
              <OrderForm modalRef={modalRef} item={item} />
              <div className="w-fit mx-auto mt-1">
                <form method="dialog">
                  <button className="btn bg-primary/10">Cancel</button>
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
