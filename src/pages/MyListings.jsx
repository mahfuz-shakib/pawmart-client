import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import useAuth from '../hooks/useAuth';
import PageBanner from '../component/PageBanner';

const MyListings = () => {
    const [myListings, setMyListings]=useState([]);
    const {user} = useAuth();
    const axiosInstance = useAxios();
    useEffect(()=>{
        axiosInstance.get(`/products/?email=${user.email}`)
        .then(data=>setMyListings[data.data])
        .catch(err=>console.log(err))
    },[user,axiosInstance]);
    console.log(myListings);
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

export default MyListings;