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

const Restarants = (props) => {

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
    console.log(dataMasterCoupon);
    dataMasterCoupon?dataMasterCoupon.map((masterCoupon)=>{
      setRestCouponList(masterCoupon.rest_coupon_list);
    }):'';
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
    return(<tr key={k+Math.random()}>
      <td>{k+1}</td>
      <td>{restCoupon.display_name}</td>
      <td>{masterCoupons.map(masterCoupon=>masterCoupon.member_coupon_used.filter(a=>a.rest_id==restCoupon.rest_id).length).reduce((sum, x) => sum + x)}</td>
      <td>{restCoupon.tel_send_sms?restCoupon.tel_send_sms:'-'}</td>
      <td>-</td>
    </tr>)}
):'';

  return (
      <>    
        <div className="header pb-8 pt-5 pt-md-8">
          <Container fluid>
          <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
          <Card className="shadow mb-5" >
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Restarants</h3>
                  </div>
                  <div className="col text-right">
                   
                  </div>
                </Row>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light" style={{position:'sticky',top:'0'}}>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>                    
                    <th scope="col">Used Coupon</th>
                    <th scope="col">Tel.</th>
                    <th scope="col">Tool</th>
                  </tr>
                </thead>
                <tbody>        
                  {tableRestCouponList}              
                </tbody>
              </Table>
            </Card></Col></Row>
          </Container>          
        </div>      
      </>
    )
}
Restarants.layout = Admin;

// Restarants.getInitialProps = async ctx => {
//   try {
    
//       const restName = {name:'Restaurants'}
//        return {restName};
//      } catch (error) {
//       return { error };
//      }
// };

export default Restarants;