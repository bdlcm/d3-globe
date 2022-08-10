import "./App.css";
import { useEffect, useState } from "react";
import { useData } from "./useData";
 import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Globe } from "./Globe";
  
function App() {

  const data = useData();

  

   if (!data) {
  
    return (  
    <>
    <Container fluid className="star bg-black">
    <Spinner animation="border" role="status">
   </Spinner>
    </Container>
  </>
  );
 
  }

  return (
    <>
      <Container fluid className="star bg-black">
        <Row>
          <Col xs lg="12" className="text-center">
            <Globe data={data}></Globe>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
