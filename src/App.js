import './App.css';
import { useData } from './useData';
import { Marks } from './Marks';
import { Container, Row, Col } from 'react-bootstrap';
  

function App() {
  const data = useData();

  if (!data) {
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" rel="stylesheet" />
    return <pre className='text'>Loading..</pre>;
  }


  return (
    <>
      <link href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" rel="stylesheet" />
      
      <Container fluid className='star bg-black' >
      
        <Row>
 
          <Col xs lg="12" className="text-center">


            <svg width='80vw' height='100vh' viewBox="40 0 900 500" className="d-block m-auto">

              <Marks
                data={data}
              />

            </svg>

          </Col>

        </Row>

 


      </Container>
    </>
  );
};

export default App;
