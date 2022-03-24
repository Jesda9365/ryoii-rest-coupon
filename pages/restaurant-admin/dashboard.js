import React from "react";
import { useState, useEffect } from 'react';
import axios from '../api/axios.config';
import {useRouter } from "next/router";

import { useSession,signOut } from "next-auth/react"

// layout for this page
const Dashboard = (props) => {
  const { data: session } = useSession()
  const router = useRouter()  

  const [dataBrand, setDataBrand] = useState({
    masterCoupon:null,
    memberCouponList:null,
    memberCouponUse:null,
    totalCoupon:0,
    soldCoupon:0,
    useCoupon:0,
  });


  const fetchMasterCoupon = async (brand_id) => {
    const url = 'https://www.ryoiireview.com/hius-rest/coupons?brand_id='+brand_id;
    const res = await axios.get(url);
    const dataMasterCoupon = res.data?res.data:'';
    console.log(dataMasterCoupon);
    const dataMemberCouponList = [];
    const dataMemberCouponUse = [];
    let totalCoupon = 0;
    let soldCoupon = 0;
    let useCoupon = 0;

    dataMasterCoupon?dataMasterCoupon.map((masterCoupon)=>{

        masterCoupon.member_coupon_list?masterCoupon.member_coupon_list.map((memberCouponList)=>{
          dataMemberCouponList.push(memberCouponList)
        }):'';

        masterCoupon.member_coupon_used?masterCoupon.member_coupon_used.map((memberCouponUse)=>{
          dataMemberCouponUse.push(memberCouponUse)
        }):'';

        totalCoupon+=parseInt(masterCoupon.total_cnt);
        soldCoupon+=masterCoupon.member_coupon_list.length;
        useCoupon+=masterCoupon.member_coupon_used.length;

    }):'';
    
    setDataBrand({
      ...dataBrand,
      masterCoupon:dataMasterCoupon,
      memberCouponList:dataMemberCouponList,
      memberCouponUse:dataMemberCouponUse,
      totalCoupon:totalCoupon,
      soldCoupon:soldCoupon,
      useCoupon:useCoupon,
    });
    
  }

  useEffect(() => {        
    if (session) {
        fetchMasterCoupon(session.user.brand_id)
        console.log(session);
    }

    if(!session){
      router.push('/')
    }
  }, []);


  return (
    <>
        <h1>Dashboard</h1>
        <button onClick={signOut}>Logout</button>
    </>
  );
};

//Dashboard.layout = Admin;


export default Dashboard;
