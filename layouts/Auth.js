import React from "react";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import routes from "routes.js";

function Auth(props) {
  React.useEffect(() => {
    
  }, []);
  return (
    <>
      <div className="main-content">

        <div className="header pt-5 pb-5">
          <Container>
           
            {/* Page content */}

            <Row className="justify-content-center">{props.children}</Row>
          </Container>
        </div>
        
      </div>
      
    </>
  );
}

export default Auth;
