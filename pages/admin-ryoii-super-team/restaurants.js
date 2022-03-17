import React from "react";
import { useState, useEffect } from 'react';

import Admin from "layouts/Admin.js";
import Header from "../../components/Headers/Header.js";
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

  console.log(props);

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
                    <h3 className="mb-0">Restarants</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Add
                    </Button>
                  </div>
                </Row>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light" style={{position:'sticky',top:'0'}}>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                    <th scope="col">Tool</th>
                  </tr>
                </thead>
                <tbody>                      
                </tbody>
              </Table>
            </Card></Col></Row>
          </Container>          
        </div>      
      </>
    )
}
Restarants.layout = Admin;

Restarants.getInitialProps = async ctx => {
  try {
    
      const restName = {name:'Restaurants'}
       return {restName};
     } catch (error) {
      return { error };
     }
};

export default Restarants;