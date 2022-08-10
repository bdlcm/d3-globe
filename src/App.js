import './App.css';
import { useData } from './useData';
import { Marks } from './Marks';
import { Container, Row, Col } from 'react-bootstrap';
import { Globe } from './Globe';
import { Test } from './Test';
    

function App() {
  const data = useData();



 
  if (!data) {
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" rel="stylesheet" />
    return <pre className='text'>Loading..</pre>;
  }


  return (
    <>

       <Container fluid className='star bg-black' >
      
        <Row>
 
          <Col xs lg="12" className="text-center">


          <Globe data={data}></Globe>  

          </Col>

        </Row>

 


      </Container>
    </>
  );
};

export default App;
