import React, { useState } from 'react';
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import Card from "react-bootstrap/Card";
import noImage from "../../no_Image.jpg";

function Test() {

  const [productCSV, setProductCSV] = useState([]);

  const navigate = useNavigate();
  // Redux State
  const customerUserData = useSelector((state) => state.counter1.apiDATA);
  // Fetch APis
  React.useEffect(() => {
    const parseCSVFiles2 = async () => {
      try {
        const productsCSV = await fetch("assets/CSVs/products.csv");
        const categoryArray2 = await productsCSV.text();
        const products2 = Papa.parse(categoryArray2, { header: true }).data;
        setProductCSV(products2);
      } catch (error) {
        console.error("Error parsing CSV files:", error);
      }
    };
    parseCSVFiles2();
  }, []);

  const recorderData = customerUserData.filter((item) => {
    return item.id && item.id.includes("NVR");
  });
  return (

    <Container fluid className="my-4" style={{ backgroundColor: "" }}>
    <h1>Test Page</h1>
    <Row className="my-4">
              {recorderData.map((val) => {
                return (
                  <>
                    <Col
                      md={4}
                      className="nvr_col my-3"
                   
                    >
                      <Card style={{ width: "", margin: "" }}>
                        <Card.Body>
                          <Card.Title className="fw-bold">
                            SKU : {val.id}
                          </Card.Title>
                          <Card.Text> Description : {val.name}</Card.Text>
                          <Row>
                            <Col xs={8}>
                              <Card.Img
                                variant="top"
                                height={150}
                                src={val.thumbnail}
                              />
                            </Col>
                            <Col
                              xs={4}
                              className="d-flex align-items-center justify-content-center fw-bold"
                            >
                              $ {val.price}
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  </>
                );
              })}

          
            </Row>
      
        </Container>
  );
}

export default Test;
