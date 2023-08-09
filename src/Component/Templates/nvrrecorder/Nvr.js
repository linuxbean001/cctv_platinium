import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import warehouseImage from "../../../assets/images/Categories/Warehouse-Security-Cameras.jpg";
import "./index.css";
import Papa from "papaparse";
import { CompareSharp } from "@mui/icons-material";

function Nvr(props) {
     const [data, setData] = useState([]);
     console.log("first",data)
    let categoriesData = [];
    let productOptionsDetails = []


  React.useEffect(() => {
    const parseCSVFiles = async () => {
    try {
    //   const categoryData = await fetch('assets/CSVs/categories.csv');
      const productData = await fetch('assets/CSVs/products.csv');
    //   const productOptionData = await fetch('assets/CSVs/products_options.csv');
    //   const categoryArray = await categoryData.text();
      const productArray = await productData.text();
      console.log("productArray",productArray)
    //   const productOptionArray = await productOptionData.text();
    //   const categories = Papa.parse(categoryArray, { header: true }).data;
    //   categories.map(({ id, category_name, category_description, category_parent, iconimage, filename, sorting }) => {
        
    //     categoriesData.push({
    //       id,
    //       category_name,
    //       category_description,
    //       category_parent,
    //       iconimage,
    //       filename,
    //       sorting,
    //     });
    //   });
      const products = Papa.parse(productArray, { header: true }).data;
      console.log("products",products)
       setData(products)
      //   const productOptions = Papa.parse(productOptionArray, { header: true }).data;
    //   productOptions.map(({ optionid, productid, featurecaption, featuretype, featureprice, partnumber, selected,sorting ,thumbpath,featurerequired}) => {
        
    // //     productOptionsDetails.push({
    //       optionid, productid, featurecaption, featuretype, featureprice, partnumber, selected,sorting ,thumbpath,featurerequired
    //     });
    //   });
     
    //   setData((data)=>({
    //     // categories: categoriesData,
    //     products,
    //     // productOptions:productOptionsDetails ,
    //   }));
    
      
    } catch (error) {
      console.error('Error parsing CSV files:', error);
    }
  };
  parseCSVFiles();
}, []);
console.log(data)
// for(let i =0; i<data.products.length;i++){
//     console.log(data.products[i])
// }
    
  return (
    <>
      <Container fluid className="my-4" style={{ backgroundColor: "" }}>
        <Container>
          <Row style={{ backgroundColor: "" }}>
            <Col style={{ backgroundColor: "" }}>
              <h2>
                NVR Recorders{" "}
                <span className="fst-italic fs-6">(Category)</span>
              </h2>
            </Col>
            {/* Right */}
            <Col className="" style={{ backgroundColor: "" }}>
              <Row>
                <Col className="text-end">
                  {props.userDetail.map((element, index) => {
                    return (
                      <h6>
                        Number of Cameras :{" "}
                        <span className="fw-bold">{element.cameraNumber}</span>
                      </h6>
                    );
                  })}
                </Col>
              </Row>
              <Row>
                <Col className="text-end">
                  <h6>
                    Number of Licenses : <span className="fw-bold">20</span>
                  </h6>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Box Row */}

          <Row className="my-4" style={{}}>
            <Col>
              <Card style={{ width: "", margin: "" }}>
                <Card.Body>
                  <Card.Title className="fw-bold">SKU: Micro NVR</Card.Title>
                  <Card.Text>
                    {" "}
                    Description: Micro NVR to build Micro NVR to build Micro NVR
                    to build.....
                  </Card.Text>

                  <Row>
                    <Col xs={8}>
                      <Card.Img
                        variant="top"
                        height={150}
                        src={warehouseImage}
                      />
                    </Col>
                    <Col
                      xs={4}
                      className="d-flex align-items-center justify-content-center fw-bold"
                    >
                      $500
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: "", margin: "" }}>
                <Card.Body>
                  <Card.Title className="fw-bold">SKU: Mid NVR</Card.Title>
                  <Card.Text>
                    {" "}
                    Description: Micro NVR to build Micro NVR to build Micro NVR
                    to build.....
                  </Card.Text>

                  <Row>
                    <Col xs={8}>
                      <Card.Img
                        variant="top"
                        height={150}
                        src={warehouseImage}
                      />
                    </Col>
                    <Col
                      xs={4}
                      className="d-flex align-items-center justify-content-center fw-bold"
                    >
                      $500
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: "", margin: "" }}>
                <Card.Body>
                  <Card.Title className="fw-bold">SKU: Platinum NVR</Card.Title>
                  <Card.Text className="fs-6">
                    {" "}
                    Description: Micro NVR to build Micro NVR to build Micro NVR
                    to build.....
                  </Card.Text>

                  <Row>
                    <Col xs={8}>
                      <Card.Img
                        variant="top"
                        height={150}
                        src={warehouseImage}
                      />
                    </Col>
                    <Col
                      xs={4}
                      className="d-flex align-items-center justify-content-center fw-bold"
                    >
                      $500
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Table */}

          <Row className="my-4" style={{ padding: "8px" }}>
            <Col style={{}}>
              <div className="table-border">
                <Table striped hover>
                  <thead></thead>
                  <tbody>
                    <tr>
                      <td>Adding to Cart</td>
                      <td>QTY</td>
                      <td>SKU</td>
                      <td>Description</td>
                      <td>Total:</td>
                      <td>Licenses:</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>QTY</td>
                      <td>SKU</td>
                      <td>Description</td>
                      <td>Total:</td>
                      <td>Licenses:</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>QTY</td>
                      <td>SKU</td>
                      <td>Description</td>
                      <td>Total:</td>
                      <td>Licenses:</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>Total:</td>
                      <td>Total:</td>
                      <td>Licenses:</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>

          {/* Button */}

          <Row className="my-4" style={{ backgroundColor: "" }}>
            <Col className="d-flex justify-content-between">
              <Button variant="dark">Previous</Button>
              <Button variant="dark">Next</Button>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default Nvr;
