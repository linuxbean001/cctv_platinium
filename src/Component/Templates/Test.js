import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function Test() {
  const [show, setShow] = useState(false);

  const handleButtonHover = () => {
    setShow(true);
  };

  const handleButtonLeave = () => {
    setShow(false);
  };

  return (
    <Row>
      <Col xs={6}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Bootstrap</strong>
          </Toast.Header>
        </Toast>
      </Col>
      <Col xs={6}>
        <Button onMouseEnter={handleButtonHover} onMouseLeave={handleButtonLeave}>
          Show Toast
        </Button>
      </Col>
    </Row>
  );
}

export default Test;
