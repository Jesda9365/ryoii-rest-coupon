import React from "react";
import { useState, useEffect } from 'react';
import classnames from "classnames";

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
import Admin from "layouts/Admin.js";

import axios from '../api/axios.config';

import Header from "components/Headers/Header-rest.js";
import {gingunjangDb} from '../../db/restCoupon.js';
const Dashboard = (props) => {
  const [activeNav, setActiveNav] = React.useState(1);
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");

  const [users, setUsers] = useState(null);
  const [brands, setBrands] = useState(null);

  useEffect(() => {
        console.log(gingunjangDb);
  }, []);

  const restBrand = gingunjangDb[0].member_coupon_list.map((coupon,k) =>
      <tr key={k+Math.random()}>
        <td>{k+1}</td>
        <td>{new Date(coupon.date_at).toLocaleDateString()}</td>
        <td>{coupon.name}</td>
        <td>ซื้อคูปอง</td>
        <td>-</td>
      </tr>
  );


  const couponUsed = gingunjangDb[0].member_coupon_use.map((couponUse,k) =>
  <tr key={k+Math.random()}>    
    <td>{k+1}</td>
    <td>{new Date(couponUse.used_date).toLocaleDateString()}</td>
    <td>{couponUse.coupon_code}</td>
    <td>{couponUse.name}</td>
    <td>{couponUse.rest_used}</td>
    <td>-</td>
  </tr>
);
 
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };


  return (
    <>
      <Header coupon={gingunjangDb} />
      {/* Page content */}
      <Container className="mt-7" fluid>
        
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow mb-5" style={{maxHeight:'650px'}}>
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">รายการซื้อ</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
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
                  {restBrand}                
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
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"                      
                    >
                      See all
                    </Button>
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
                  {couponUsed}                
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

Dashboard.getInitialProps = async ctx => {
  try {
    //   //const res = await axios.get('/api/restaurant-brand');
        const restName = {name:gingunjangDb[0].brand_name}
       return {restName};
     } catch (error) {
      return { error };
     }
};

export default Dashboard;
