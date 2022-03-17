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

const BrandRestarants = (props) => {

  console.log(props);

  const brandTable = props.data.brand.data?props.data.brand.data.items.map((brand,k) =>
  <tr key={brand.brand_id}>    
    <td>{k+1}</td>
    <td>{new Date(brand.updated_at).toLocaleDateString()}</td>
    <td>{brand.brand_name}</td>
    <td>{brand.rest_brand_code}</td>
    <td></td>
  </tr>
):'';

  return (
      <>    
        <div className="header pb-8 pt-5 pt-md-8">
          <Container fluid>
          <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
          <Card className="shadow mb-5" style={{maxHeight:'650px'}}>
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Brands</h3>
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
                    <th scope="col">Date</th>
                    <th scope="col">Name</th>
                    <th scope="col">Code</th>
                    <th scope="col">Tool</th>
                  </tr>
                </thead>
                <tbody>               
                  {brandTable}       
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
BrandRestarants.layout = Admin;

BrandRestarants.getInitialProps = async ctx => {
  try {
       
        const url = 'https://app-api.ryoii.io/api/restaurant-brand';
        const res = await axios.get(url);
        console.log(res);
        const data = {name:'Ryoii Admin',brand:res.data}
        return {data};
     } catch (error) {
        return { error };
     }
};

export default BrandRestarants;