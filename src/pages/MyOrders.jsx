import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import PageBanner from "../component/PageBanner";
import { easeInOut, easeOut, motion } from "framer-motion";
import Container from "../container/Container";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { user } = useAuth();
  const axiosInstance = useAxios();
  console.log(user.email);
  useEffect(() => {
    axiosInstance
      .get(`/orders/?email=${user?.email}`)
      .then((data) => {
        setMyOrders(data.data);

        // console.log(data.data);
      })
      .catch((err) => console.log(err));
  }, [user, axiosInstance]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('My Orders Report', 14, 10);
    autoTable(doc, {
      startY: 20,
      head: [["SL. No.", "Product/Listing Name", "Buyer Name", "Price", "Quantity", "Address", "Date", "Phone"]],
      body: myOrders.map((order, index) => [
        index + 1,
        order.productName,
        order.buyerName,
        order.price,
        order.quantity,
        order.address,
        order.date,
        order.phone,
      ]),
    });
    doc.save("MyOrders.pdf");
    toast.success("PDF Downloaded Successfully")
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
        <div className="text-right mt-8">
          <button onClick={handleDownloadPDF} className="btn text-red-600 hover:text-red-800">
            Download Order's PDF
          </button>
        </div>
        <div className="overflow-x-auto py-8 ">
          {myOrders.length === 0 ? (
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
                  <th>Product/Listing Name</th>
                  <th>Buyer Name</th>
                  <th>Price (tk)</th>
                  <th>Quantity</th>
                  <th>Address</th>
                  <th>Date</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {myOrders?.map((order, index) => (
                  <tr key={order._id} className={`${index % 2 ? "bg-gray-50" : "bg-violet-50"}`}>
                    <td>{index + 1}</td>
                    <td>{order.productName}</td>
                    <td>{order.buyerName}</td>
                    <td>{order.price}</td>
                    <td>{order.quantity}</td>
                    <td>{order.address}</td>
                    <td>{order.date}</td>
                    <td>{order.phone}</td>
                  </tr>
                ))}
              </tbody>
            </motion.table>
          )}
        </div>
        <div className="text-center mb-16">
          <button onClick={handleDownloadPDF} className="btn text-red-600 hover:text-red-800">
            Download Order's PDF
          </button>
        </div>
      </Container>
    </div>
  );
};

export default MyOrders;
