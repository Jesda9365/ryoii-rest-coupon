import React from "react";
import { useState, useEffect } from 'react';
import axios from '../api/axios.config';
import {useRouter } from "next/router";
import { useSession } from "next-auth/react"

import AppBar from '@mui/material/AppBar';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Grid,
  Container,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';

import { DashboardLayout } from '../../components/dashboard-layout';
// layout for this page
const Restaurants = (props) => {
  
  const { data: session,status } = useSession()
  const router = useRouter()  

  const loading = status === "loading"


  const [masterCoupons, setMasterCoupons] = useState(null);
  const [restCouponList, setRestCouponList] = useState(null);

  

  const fetchMasterCoupon = async (brand_id) => {
    const url = 'https://www.ryoiireview.com/hius-rest/coupons?brand_id='+brand_id;
    const res = await axios.get(url);
    const dataMasterCoupon = res.data?res.data:'';
    setMasterCoupons(dataMasterCoupon);
 
    dataMasterCoupon?dataMasterCoupon.map((masterCoupon)=>{
      setRestCouponList(masterCoupon.rest_coupon_list);
    }):'';
    console.log(process.env);
  }

  useEffect(() => {        
    if (session) {
      fetchMasterCoupon(session.user.brand_id);
    }
   
  },[session]);

  if(!session&&!loading){
    router.push('/')
  }

    const tableRestCouponList = restCouponList?restCouponList.map((restCoupon,k) =>{ 
      return(<TableRow key={k+Math.random()}>
        <TableCell>{k+1}</TableCell>
        <TableCell>{restCoupon.display_name}</TableCell>
        <TableCell>{masterCoupons.map(masterCoupon=>masterCoupon.member_coupon_used.filter(a=>a.rest_id==restCoupon.rest_id).length).reduce((sum, x) => sum + x)}</TableCell>
        <TableCell>{restCoupon.tel_send_sms?restCoupon.tel_send_sms:'-'}</TableCell>
        <TableCell>-</TableCell>
      </TableRow>)}
  ):'';


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
            <h1 style={{marginBottom:'3rem'}}>Restaurants</h1>
        </Grid>
        <Grid container spacing={3}>            
          <Grid item lg={12} sm={12} xl={12} xs={12}>
          <Card>
              <PerfectScrollbar >
                <Box style={{overflow:'auto',maxHeight:'1600px'}}>
                  <Table>
                    <TableHead style={{position:'sticky',top:'0'}}>
                      <TableRow>                        
                        <TableCell scope="col">#</TableCell>
                        <TableCell scope="col">Name</TableCell>
                        <TableCell scope="col">Used Coupon</TableCell>
                        <TableCell scope="col">Tel.</TableCell>
                        <TableCell scope="col">Tool</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableRestCouponList}
                    </TableBody>
                  </Table>
                </Box>
              </PerfectScrollbar>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  p: 2
                }}
              >
              </Box>
            </Card>
          </Grid>
          

        </Grid>
      </Container>
    </Box>
    </>
  );
};

//Dashboard.layout = Admin;
Restaurants.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );

export default Restaurants;
