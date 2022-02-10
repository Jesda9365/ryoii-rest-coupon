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

import Header from "components/Headers/Header-hongmin.js";
import {hongminDb} from '../../db/restCoupon.js';
const Dashboard = (props) => {
  const [activeNav, setActiveNav] = React.useState(1);
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");

  const [users, setUsers] = useState(null);
  const [brands, setBrands] = useState(null);

  useEffect(() => {
       

  }, []);

  const restBrand = hongminDb.map((hongmin,k) =>
      <tr key={k+Math.random()}>
        <td>{k+1}</td>
        <td>{hongmin.date_at}</td>
        <td>{hongmin.name}</td>
        <td>ซื้อคูปอง</td>
        <td>-</td>
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
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Transactions</h3>
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
                <thead className="thead-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Coupon Name</th>
                    <th scope="col">Action</th>
                    <th scope="col">Restaurant</th>
                    <th scope="col">Tool</th>
                  </tr>
                </thead>
                <tbody>                   
                  {restBrand}                
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
      const restName = {name:'Hongmin'}
     return {restName};
   } catch (error) {
    return { error };
   }
};

export default Dashboard;
