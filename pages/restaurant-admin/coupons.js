import React from "react";
import { useState, useEffect } from 'react';
import axios from '../api/axios.config';
import Admin from "layouts/Admin.js";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input, 
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

const Coupons = ({data}) => {

  console.log(data.coupons.data.items[0].master_coupon.name);

  const couponTable = data.coupons.data.items.map((item,k) =>
  <tr key={item.master_coupon_id}>    
    <td>{k+1}</td>
    <td>{item.brand_id}</td>    
    <td>{item.master_coupon?item.master_coupon.name:''}</td>
    <td>{item.master_coupon?new Date(item.master_coupon.start_date).toLocaleDateString():''}</td>
    <td>{item.master_coupon?new Date(item.master_coupon.expire_date).toLocaleDateString():''}</td>
    <td>{item.coupon_code}</td>
    <td>{item.mint_address}</td>
    <td>{item.mint_state}</td>
    <td>{item.nft_id}</td>
    <td>{item.nft_url}</td>
    <td>{item.sold_status}</td>
    <td>{item.use_status}</td>
    <td>{item.txn_hash_ryc}</td>
    <td></td>
  </tr>
);

  return (
      <>    
        <div className="header pb-8 pt-5 pt-md-8">
          <Container fluid>
          <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
          <Card className="shadow mb-5" style={{maxHeight:'1024px'}}>
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Coupons</h3>
                  </div>
                  <div className="col text-right">
                    <div className="d-flex">
                      <Form className="form-inline mr-3 d-none d-md-flex ml-lg-auto">
                        <div className="mb-0 form-group">
                          <div className="input-group-alternative input-group">                            
                            <input placeholder="Search" type="text" className="form-control" />
                            <div className="input-group-prepend">
                              <button className="btn btn-outline-secondary">
                                <i className="fas fa-search"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </Form>
                      <div className="d-flex align-items-center">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                        >
                          <i className="fas fa-plus mr-1"></i>
                          Add
                        </Button>
                      </div>                    
                    </div>                   
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light" style={{position:'sticky',top:'0'}}>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Coupon Name</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">Expire Date</th>
                    <th scope="col">Coupon Code</th>
                    <th scope="col">Mint Address</th>
                    <th scope="col">Mint State</th>
                    <th scope="col">NFT ID</th>
                    <th scope="col">NFT URL</th>
                    <th scope="col">Sold</th>
                    <th scope="col">Used</th>
                    <th scope="col">txn hash ryc</th>
                    <th scope="col">Tool</th>
                  </tr>
                </thead>
                <tbody>               
                  {couponTable}       
                </tbody>
              </Table>
            </Card>
            </Col>
            </Row>
          </Container>          
        </div>      
      </>
    )
}
Coupons.layout = Admin;

Coupons.getInitialProps = async ctx => {
  try {       
        const url = 'https://app-api.ryoii.io/api/coupon-list';
        const res = await axios.get(url);
        const data = {name:'Ryoii Admin',coupons:res.data}
        return {data};
     } catch (error) {
        return { error };
     }
};

export default Coupons;


