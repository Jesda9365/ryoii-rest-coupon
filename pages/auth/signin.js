import React from "react";
import { getCsrfToken } from "next-auth/react"
import { getProviders, signIn } from "next-auth/react"

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Auth from "layouts/Auth.js";

function credentials({ csrfToken }) {
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0 mt-5">
          <CardHeader className="bg-transparent pb-1">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Ryoii Coin Restaurant Management</small>
            </div>
            
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" method="post" action="/api/auth/callback/credentials">
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="username"
                    placeholder="Username"
                    type="text"
                    autoComplete="new-username"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="password"
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>

      </Col>
    </>
  );
}
credentials.layout = Auth;
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}


export default credentials;
