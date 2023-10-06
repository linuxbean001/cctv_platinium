import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ThreeDots } from "react-loader-spinner";
function Loader() {
  return (
    <>
      <Container fluid style={{ backgroundColor: "red" }}>
        <Row
          style={{
            backgroundColor: "",
            position: "relative",
          }}
        >
          <Col
            style={{
              backgroundColor: "",
              width: "100%",
              height: "100vh",
              position: "relative",
            }}
          >
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="black"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Loader;
