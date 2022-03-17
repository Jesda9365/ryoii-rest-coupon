import { useState, useEffect } from 'react';
import classnames from "classnames";


import Admin from "layouts/Admin.js";
import {useRouter } from "next/router";
import axios from '../api/axios.config';

import { useSession,signOut } from "next-auth/react"

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

const MasterCouoons = (props) => {

  const [masterCoupons, setMasterCoupons] = useState(null);

  const { data: session, status} = useSession()
  const router = useRouter()  

  const loading = status === "loading"

  useEffect(() => {       
    if (session) {
      fetchMasterCoupon(session.user.brand_id);
    }
    
  },[session]);

  if(!session&&!loading){
    router.push('/')
  }
  

  const fetchMasterCoupon = async (brand_id) => {
    const url = 'https://www.ryoiireview.com/hius-rest/coupons?brand_id='+brand_id;
    const res = await axios.get(url);
    const dataMasterCoupon = res.data?res.data:'';
    setMasterCoupons(dataMasterCoupon);
  }


  const tableMasterCoupon = masterCoupons?masterCoupons.sort((a,b)=>new Date(b.updated_at)-new Date(a.updated_at)).map((masterCoupon,k) =>
  <tr key={k+Math.random()}>
    <td>{k+1}</td>
    <td>{new Date(masterCoupon.updated_at).toLocaleDateString()}</td>   
    <td>{masterCoupon.name}</td>
    <td>{new Date(masterCoupon.start_date).toLocaleDateString()}</td>
    <td>{new Date(masterCoupon.expire_date).toLocaleDateString()}</td>
    <td>{masterCoupon.total_cnt}</td>
    <td>{parseInt(masterCoupon.total_cnt)-masterCoupon.member_coupon_list.length}</td>
    <td>{masterCoupon.member_coupon_list.length}</td>
    <td>{masterCoupon.member_coupon_used.length}</td>
    <td>{masterCoupon.status}</td>
    <td></td>
  </tr>
):'';


  return (
      <>    
        <div className="header pb-8 pt-5 pt-md-8">
          <Container fluid>
          <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
          {loading && <div>Loading...</div>}
          <Card className="shadow mb-5" >
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
                  {tableMasterCoupon}       
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


export default MasterCouoons;