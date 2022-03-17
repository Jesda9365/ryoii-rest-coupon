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

const MasterCouoons = ({data}) => {

  console.log(data);

  const [masterCoupon, setMasterCoupon] = useState({
    name: '',
    coupons: [],
  });
  const [errorRestaurants, setErrorRestaurants] = useState(null);

  const fetchMasterCoupon = async () => {
    const url = 'https://app-api.ryoii.io/api/coupon';
    const res = await axios.get(url);
    const masterCoupon = res.data?res.data:'';
    setMasterCoupon({...masterCoupon,coupons:masterCoupon.data?masterCoupon.data.item:''});  
  }

  useEffect(() => {
    fetchMasterCoupon();
  }, [])


  const handleChange = ({ target: { name, value } }) => {
    
  };

  
  const handleSubmit = async e => {
    e.preventDefault();
    fetchMasterCoupon()
    try {
    
    } catch (error) {
      setErrorRestaurants(error);
    }
  };


  const couponTable = masterCoupon.coupons?masterCoupon.coupons.map((coupon,k) =>
  <tr key={coupon.master_coupon_id}>    
    <td>{k+1}</td>
    <td>{new Date(coupon.updated_at).toLocaleDateString()}</td>
    <td>{coupon.brand_restaurant.brand_name} ({coupon.brand_id})</td>    
    <td>{coupon.name}({coupon.master_coupon_id})</td>
    <td>{coupon.coupon_list.length}</td>
    <td>{new Date(coupon.start_date).toLocaleDateString()}</td>
    <td>{new Date(coupon.expire_date).toLocaleDateString()}</td>
    <td>{coupon.total_cnt} [{coupon.ryoii_price}]</td>
    <td>{coupon.total_cnt-coupon.sold_cnt}</td>
    <td>{coupon.sold_cnt}</td>
    <td>{coupon.use_cnt}</td>
    <td>{coupon.status}</td>
    <td><button className="btn btn-sm btn-primary">View</button></td>
  </tr>
):'';

  return (
      <>    
        <div className="header pb-8 pt-5 pt-md-8">
          <Container fluid>
          <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
          <Card className="shadow mb-5">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Master Coupons</h3>
                  </div>
                  <div className="col text-right">
                    <div className="d-flex">
                      <Form className="form-inline mr-3 d-none d-md-flex ml-lg-auto">
                        <div className="mb-0 form-group">
                          <div className="input-group-alternative input-group">                            
                            <input placeholder="Search" name="inp_search" type="text" className="form-control" onChange={handleChange}  />
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
                    <th scope="col">Brand</th>
                    <th scope="col">Name</th>
                    <th scope="col">Coupon List</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">Expire Date</th>
                    <th scope="col">Total</th>
                    <th scope="col">Available</th>
                    <th scope="col">Sold</th>
                    <th scope="col">Used</th>
                    <th scope="col">Status</th>
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
MasterCouoons.layout = Admin;

MasterCouoons.getInitialProps = async ctx => {
  try {              
        const data = {name:'Ryoii Admin',coupons:res.data}
        return {data};
     } catch (error) {
        return { error };
     }
};

export default MasterCouoons;