import React from "react";
import { useState, useEffect } from 'react';
import axios from '../api/axios.config';
import {useRouter } from "next/router";
import { useSession,signOut } from "next-auth/react"
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
const MasterCoupons = (props) => {
  
  const [masterCoupons, setMasterCoupons] = useState(null);

  const {data:session, status} = useSession()
  const router = useRouter()  

  const loading = status === "loading"

  useEffect(() => {       
    if (session) {
      fetchMasterCoupon(session.user.brand_id);
    }
    
    console.log(session);
    
  },[session]);

  if(!session&&!loading){
    router.push('/')
  }
  

  const fetchMasterCoupon = async (brand_id) => {
    const url = 'https://www.ryoiireview.com/hius-rest/coupons?brand_id='+brand_id;
    const res = await axios.get(url);
    const dataMasterCoupon = res.data?res.data:'';
    setMasterCoupons(dataMasterCoupon);
  }


  const tableMasterCoupon = masterCoupons?masterCoupons.sort((a,b)=>new Date(b.updated_at)-new Date(a.updated_at)).map((masterCoupon,k) =>
  <TableRow key={k+Math.random()}>
    <TableCell>{k+1}</TableCell>
    <TableCell>{new Date(masterCoupon.updated_at).toLocaleDateString()}</TableCell>   
    <TableCell>{masterCoupon.name}</TableCell>
    <TableCell>{new Date(masterCoupon.start_date).toLocaleDateString()}</TableCell>
    <TableCell>{new Date(masterCoupon.expire_date).toLocaleDateString()}</TableCell>
    <TableCell>{masterCoupon.total_cnt}</TableCell>
    <TableCell>{parseInt(masterCoupon.total_cnt)-masterCoupon.member_coupon_list.length}</TableCell>
    <TableCell>{masterCoupon.member_coupon_list.length}</TableCell>
    <TableCell>{masterCoupon.member_coupon_used.length}</TableCell>
    <TableCell>{masterCoupon.status}</TableCell>
    <TableCell></TableCell>
  </TableRow>
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
            <h1 style={{marginBottom:'3rem'}}>Master Coupons</h1>
        </Grid>
        <Grid container spacing={3}>            
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <Card>
              <PerfectScrollbar>
                <Box style={{overflow:'auto',maxHeight:'800px'}}>
                  <Table>
                    <TableHead style={{position:'sticky',top:'0'}}>
                      <TableRow>                        
                        <TableCell scope="col">#</TableCell>
                        <TableCell scope="col">Date</TableCell>
                        <TableCell scope="col">Name</TableCell>
                        <TableCell scope="col">Start Date</TableCell>
                        <TableCell scope="col">Expire Date</TableCell>
                        <TableCell scope="col">Total</TableCell>
                        <TableCell scope="col">Available</TableCell>
                        <TableCell scope="col">Sold</TableCell>
                        <TableCell scope="col">Used</TableCell>
                        <TableCell scope="col">Status</TableCell>
                        <TableCell scope="col">Tool</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableMasterCoupon}
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
MasterCoupons.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );

export default MasterCoupons;
