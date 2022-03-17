import React from "react";
import { useState, useEffect } from 'react';

import Admin from "layouts/Admin.js";
import {useRouter } from "next/router";
import axios from '../api/axios.config';

import { useSession,signOut } from "next-auth/react"
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

const Profile = (props) => {

  const [userBrand, setuserBrand] = useState(null);

  const { data: session,status } = useSession()
  const router = useRouter()  

  const loading = status === "loading"


  useEffect(() => {        
    if (session) {
      setuserBrand(session.user);
      console.log(session);
    }
  },[session]);

  if(!session&&!loading){
    router.push('/')
  }


  return (
      <>    
        <div className="header pb-8 pt-5 pt-md-8">
          <Container fluid>
          <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
          <Card className="shadow mb-5" >
              <CardHeader className="border-0">
              <h1 className="card-title">{userBrand?userBrand.brand_name:''}</h1>
              <h3 className="card-subtitle mb-2 text-muted">Description : {userBrand?userBrand.description:''}</h3>
              <h3 className="card-subtitle mb-2 text-muted">Address : </h3>
              <h3 className="card-subtitle mb-2 text-muted">Code : {userBrand?userBrand.rest_brand_code:''}</h3>
              <p className="card-text">-</p>              
              <a href="#" className="btn btn-sm btn-primary">Edit</a>
              </CardHeader>
            </Card>
            </Col>
            </Row>
          </Container>          
        </div>      
      </>
    )
}
Profile.layout = Admin;

// Restarants.getInitialProps = async ctx => {
//   try {
    
//       const restName = {name:'Restaurants'}
//        return {restName};
//      } catch (error) {
//       return { error };
//      }
// };

export default Profile;