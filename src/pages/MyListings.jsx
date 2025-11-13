import React, { useEffect, useRef, useState } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import PageBanner from "../component/PageBanner";
import Container from "../container/Container";
import { easeInOut, easeOut, motion } from "framer-motion";
import UpdateListing from "../component/UpdateListing";
import Swal from "sweetalert2";
import Loader from "../component/Loader";

const MyListings = () => {
  const [myListings, setMyListings] = useState([]);
  const [updateItem, setUpdateItem] = useState({});
  const modalRef = useRef();
  const { user, loading, setLoading } = useAuth();
  const axiosInstance = useAxios();
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/products/?email=${user.email}`)
      .then((data) => {
        setMyListings(data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [user, axiosInstance, setLoading]);

  const bannerInfo = {
    title: "Pets & Supplies",
    description:
      "Browse through all available pets for adoption and pet care products. Find your perfect companion or everything your pet needs.",
    icon: "🐾",
  };

  const handleUpdate = (item) => {
    setUpdateItem(item);
    modalRef.current.showModal();
  };
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(item._id);
        axiosInstance
          .delete(`/products/${item._id}`)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your listing item has been deleted.",
              icon: "success",
            });
            axiosInstance
              .get(`/products/?email=${user.email}`)
              .then((data) => setMyListings(data.data))
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      }
    });
  };
  return (
    <div className="min-h-screen">
      <PageBanner bannerInfo={bannerInfo}></PageBanner>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <div className="overflow-x-auto py-16">
            {myListings.length === 0 ? (
              ""
            ) : (
              <motion.table
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="table"
              >
                {/* head */}
                <thead>
                  <tr className="bg-green-50">
                    <th>SL. No. </th>
                    <th>Product Name</th>
                    <th>Price (tk)</th>
                    <th>Created At</th>
                    <th>Created By</th>
                    <th>Action</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {myListings?.map((list, index) => (
                    <tr key={list._id} className={`${index % 2 ? "bg-gray-50" : "bg-violet-50"}`}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img src={list.image} alt={list.name} />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{list.name}</div>
                            <div className="text-sm opacity-50">({list.category})</div>
                          </div>
                        </div>
                      </td>

                      <td>{list.price}</td>
                      <td>{list.date}</td>
                      <td className="opacity-75">{user.email}</td>
                      <td>
                        <button
                          onClick={() => handleUpdate(list)}
                          className="btn badge badge-primary btn-xs hover:scale-101"
                        >
                          Update
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(list)}
                          className="btn badge badge-secondary btn-xs hover:scale-101"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </motion.table>
            )}
          </div>
          {/* update modal form */}
          <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
            <div className="bg-white p-2 md:p-4 rounded ">
              <h1 className="text-center font-bold mb-3">Update Information</h1>
              <UpdateListing updateItem={updateItem} modalRef={modalRef} setMyListings={setMyListings} />
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

export default MyListings;
