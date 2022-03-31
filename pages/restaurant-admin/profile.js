import React from "react";
import { useState, useEffect } from 'react';
import axios from '../api/axios.config';
import {useRouter } from "next/router";
import { useSession,signOut } from "next-auth/react"

import AppBar from '@mui/material/AppBar';
import { Box, Container, Grid } from '@mui/material';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { DashboardLayout } from '../../components/dashboard-layout';
// layout for this page
const Profile = (props) => {
  
  const [masterCoupons, setMasterCoupons] = useState(null);

  const {data:session, status} = useSession()
  const router = useRouter()  

  const loading = status === "loading"

  useEffect(() => {       

    
    console.log(session);
    
  },[session]);

  if(!session&&!loading){
    router.push('/')
  }
  


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
            <h1 style={{marginBottom:'3rem'}}>Profile</h1>
        </Grid>
        <Grid container spacing={3}>            
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h4" component="div">
                  Brand Name: {session?session.user.brand_name:''}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                 {session?'('+session.user.rest_brand_code+')':''}
                </Typography>
                <Typography variant="h5" component="div">
                  Description:
                </Typography>
                <Typography variant="body2">
                 {session?session.user.description:''}
                </Typography>
              </CardContent>
              <CardActions>
        
              </CardActions>
            </Card>
          </Grid>
          

        </Grid>
      </Container>
    </Box>
    </>
  );
};

//Dashboard.layout = Admin;
Profile.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );

export default Profile;
