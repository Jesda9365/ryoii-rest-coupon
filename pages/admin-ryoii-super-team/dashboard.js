import React from "react";
import { useState, useEffect } from 'react';


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
import Admin from "../../layouts/Admin.js";

import axios from '../api/axios.config';
import restCoupon from '../api/rest-coupon';
import Header from "../../components/Headers/Header.js";

const Dashboard = (props) => {
  const [activeNav, setActiveNav] = React.useState(1);

  const [users, setUsers] = useState(null);
  const [brand, setBrand] = useState([]);

  useEffect(() => {
    fetchComments()
  }, []);

  const fetchComments = async () => {
    const response = await fetch('../api/rest-coupon')
    const data = await response.json()
    console.log(data);
    setBrand(data)
  }
 
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
  };


  return (
    <>
      <Header />
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
        const data = {name:'Dashboard'}
        return {data};
     } catch (error) {
      return { error };
     }
};

export default Dashboard;
