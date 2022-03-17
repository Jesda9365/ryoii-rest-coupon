import React from "react";
import { useState, useEffect } from 'react';
import classnames from "classnames";


import Admin from "layouts/Admin.js";
import {useRouter } from "next/router";
import axios from '../api/axios.config';

import Header from "components/Headers/Header-rest.js";

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
// layout for this page
const Dashboard = (props) => {
  const [activeNav, setActiveNav] = React.useState(1);

  const [users, setUsers] = useState(null);
  const [dataBrand, setDataBrand] = useState({
    masterCoupon:null,
    memberCouponList:null,
    memberCouponUse:null,
    totalCoupon:0,
    soldCoupon:0,
    useCoupon:0,
  });

  const { data: session } = useSession()
  const router = useRouter()  

  const fetchMasterCoupon = async (brand_id) => {
    const url = 'https://www.ryoiireview.com/hius-rest/coupons?brand_id='+brand_id;
    const res = await axios.get(url);
    const dataMasterCoupon = res.data?res.data:'';
    //console.log(dataMasterCoupon);

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
      fetchMasterCoupon(session.user.brand_id);
    }

    if(!session){
      router.push('/')
    }
  }, []);

  const tableCouponList = dataBrand.memberCouponList?dataBrand.memberCouponList.sort((a,b)=>new Date(b.updated_at)-new Date(a.updated_at)).map((couponList,k) =>{ 
      return(<tr key={k+Math.random()}>
        <td>{k+1}</td>
        <td>{new Date(couponList.updated_at).toLocaleDateString()}</td>
        <td>{dataBrand.masterCoupon?dataBrand.masterCoupon.find((masterCoupon)=>masterCoupon.master_coupon_id==couponList.master_coupon_id).name:''}</td>
        <td>ซื้อคูปอง</td>
        <td>-</td>
      </tr>)}
  ):'';



  const tableCouponUse = dataBrand.memberCouponUse?dataBrand.memberCouponUse.sort((a,b)=>new Date(b.updated_at)-new Date(a.updated_at)).map((couponUse,k) =>
    <tr key={k+Math.random()}>    
      <td>{k+1}</td>
      <td>{new Date(couponUse.updated_at).toLocaleDateString()}</td>
      <td>{couponUse.coupon_code}</td>
      <td>{dataBrand.masterCoupon?dataBrand.masterCoupon.find((masterCoupon)=>masterCoupon.master_coupon_id==couponUse.master_coupon_id).name:''}</td>
      <td>{couponUse.rest_name_th}</td>
      <td>-</td>
    </tr>
  ):'';

  const cardMasterCoupon = dataBrand.masterCoupon?dataBrand.masterCoupon.map((masterCoupon,keyMaster)=>
      <Card className="shadow mb-2" key={keyMaster+Math.random()}>
        <div className="row g-0">                    
          <div className="col-md-12">
            <CardBody className="border-0">
              <h3 className="card-title">{masterCoupon.name}</h3>
              <p className="card-text" style={{fontSize:'11px'}}>{masterCoupon.description}</p>
              <div className="mb-2">                            
                  <span className="badge bg-primary rounded-pill text-white mr-2">Total : {masterCoupon.total_cnt}</span>
                  <span className="badge bg-info rounded-pill text-white mr-2">Sold : {masterCoupon.member_coupon_list.length}</span>
                  <span className="badge bg-success rounded-pill text-white mr-2">Used : {masterCoupon.member_coupon_used.length}</span>
              </div>
              <div className="d-flex">
                <p className="mr-2 card-text" style={{fontSize:'11px'}}><b>Start Date</b> :  {new Date(masterCoupon.start_date).toLocaleDateString()}</p>
                <p className="mr-2 card-text" style={{fontSize:'11px'}}><b>Expire Date</b> : {new Date(masterCoupon.expire_date).toLocaleDateString()}</p>
              </div>
            </CardBody>
          </div>
        </div>
      </Card>
  ):'';
 
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const genCouponList = (e)=>{
    e.preventDefault()
    console.log(e.target.text);
  }

  return (
    <>
    {dataBrand?<Header dataBrand={dataBrand} />:''}
      
      {/* Page content */}
      <Container className="mt-5" fluid>
        
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
          <Card className="shadow mb-5" >
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">คูปองปัจจุบัน</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={genCouponList}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <Row className="align-items-center">
                  <div className="col">
                      {cardMasterCoupon}
                  </div>                  
                </Row>
              </CardBody>
            </Card>
            
            <Card className="shadow mb-5" style={{maxHeight:'650px'}}>
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">รายการซื้อ</h3>
                  </div>
                  <div className="col text-right">
                    {/* <Button
                      color="primary"
                      href="#pablo"
                      onClick={genCouponList}
                      size="sm"
                    >
                      See all
                    </Button> */}
                  </div>
                </Row>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light" style={{position:'sticky',top:'0'}}>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Coupon Name</th>
                    <th scope="col">Action</th>
                    <th scope="col">Tool</th>
                  </tr>
                </thead>
                <tbody>                   
                  {tableCouponList}                
                </tbody>
              </Table>
            </Card>

            <Card className="shadow" style={{maxHeight:'650px'}}>
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">รายการใช้คูปอง</h3>
                  </div>
                  <div className="col text-right">
                    {/* <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"                      
                    >
                      See all
                    </Button> */}
                  </div>
                </Row>
              </CardHeader>
      
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light" style={{position:'sticky',top:'0'}}>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Coupon Name</th>
                    <th scope="col">Coupon Code</th>
                    <th scope="col">Restaurant</th>
                    <th scope="col">Tool</th>
                  </tr>
                </thead>
                <tbody>                   
                  {tableCouponUse}                
                </tbody>
              </Table>
            </Card>
          </Col>

        </Row>
      </Container>
    </>
  );
};

Dashboard.layout = Admin;

// Dashboard.getInitialProps = async ctx => {
//   try {
//         const restName = {name:moomuekkungDb[0].brand_name}
//        return {restName};
//      } catch (error) {
//       return { error };
//      }
// };

export default Dashboard;
