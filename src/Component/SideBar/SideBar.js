

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SideBar(props) {
  return (
    <>
      <Container className="my-4" fluid style={{ backgroundColor: '' }}>
        <Row className='p-1'>
                 <Col className='cart_box' md={3} style={{ backgroundColor: '', height: '320px' }}>
            <h5 className='my-4 text-center' style={{ backgroundColor: 'black', color: '#fff', padding: '10px', borderRadius: '5px' }}>Price Details</h5>
            <Row className='my-4 text-center' style={{ backgroundColor: '' }}>
              <Col className='text-muted text-start'>Price (1 Item)</Col>
              <Col className='text-muted'>$500</Col>
            </Row>
            <Row className='my-4 text-center'>
              <Col className='text-muted  text-start'>Discount </Col>
              <Col className='text-muted'>$50</Col>
            </Row>
            <Row className='my-4 text-center'>
              <Col className='text-muted text-start'>Delivery Charges</Col>
              <Col className='text-muted'>Free</Col>
            </Row>

            {/* Final Amount */}

            <Row className='my-5 text-center'>
              <Col>
                <h6>Total Amount</h6>
              </Col>
              <Col>
                <h6>$450</h6>

              </Col>
            </Row> </Col>
        </Row>

      </Container>
    </>
  )
}

export default SideBar