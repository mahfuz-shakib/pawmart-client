import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';
import PageBanner from '../component/PageBanner';

const MyOrders = () => {
    const [myOrders, setMyOrders]=useState([]);
    const {user} = useAuth();
    const axiosInstance = useAxios();
    useEffect(()=>{
        axiosInstance.get(`/bids/?email=${user.email}`)
        .then(data=>setMyOrders[data.data])
        .catch(err=>console.log(err))
    },[user,axiosInstance]);
    console.log(myOrders);
    const bannerInfo = {
        title: "Pets & Supplies",
        description:
          "Browse through all available pets for adoption and pet care products. Find your perfect companion or everything your pet needs.",
        icon: "🐾",
      };
      return (
        <div className="min-h-screen">
          <PageBanner bannerInfo={bannerInfo}></PageBanner>
            
        </div>
    );
};

export default MyOrders;