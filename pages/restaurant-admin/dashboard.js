import React from "react";
import { useState, useEffect } from 'react';
import axios from '../api/axios.config';
import {useRouter } from "next/router";

import { useSession,signOut } from "next-auth/react"
import AppBar from '@mui/material/AppBar';
import { Box, Container, Grid } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { TotalCouponList } from '../../components/dashboard/total-coupon-list';
import { LatestOrders } from '../../components/dashboard/latest-orders';
import { LatestUsed } from '../../components/dashboard/latest-used';
import { SoldCouponList } from '../../components/dashboard/sold-coupon-list';
import { AvailableCouponList } from '../../components/dashboard/available-cupon-list';
import { UsedCouponList } from '../../components/dashboard/used-coupon-list';
import { DashboardLayout } from '../../components/dashboard-layout';
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
    availableCoupon:0
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
    let availableCoupon = 0;

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

    availableCoupon = totalCoupon-soldCoupon;
    
    setDataBrand({
      ...dataBrand,
      masterCoupon:dataMasterCoupon,
      memberCouponList:dataMemberCouponList,
      memberCouponUse:dataMemberCouponUse,
      totalCoupon:totalCoupon,
      soldCoupon:soldCoupon,
      useCoupon:useCoupon,
      availableCoupon:availableCoupon
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
       
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <Grid>
            <h1 style={{marginBottom:'3rem'}}>Dashboard</h1>
        </Grid>
        <Grid container spacing={3}>            
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalCouponList dataBrand={dataBrand} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <AvailableCouponList dataBrand={dataBrand} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <SoldCouponList dataBrand={dataBrand} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <UsedCouponList dataBrand={dataBrand} sx={{ height: '100%' }} />
          </Grid>
          <Grid item lg={12} sm={12} xl={12} xs={12} >
            <LatestOrders dataBrand={dataBrand} />
          </Grid>
          <Grid item lg={12} sm={12} xl={12} xs={12} >
            <LatestUsed dataBrand={dataBrand} />
          </Grid>

        </Grid>
      </Container>
    </Box>
    </>
  );
};

//Dashboard.layout = Admin;
Dashboard.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );

export default Dashboard;
