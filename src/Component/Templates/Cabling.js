import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from 'react-bootstrap/Modal';
// import "./index.css";
import Papa from "papaparse";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Navigate, useNavigate } from "react-router-dom"
import noImage from '../../no_Image.jpg'

const onlineImageURL = 'https://images.pexels.com/photos/326508/pexels-photo-326508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';


function Cabling() {
  const navigate = useNavigate();

  const [categoryCSV, setCategoriesCSV] = useState([]) // categoryCsv data
  const [productCSV, setProductCSV] = useState([])  // productCSV data
  const [productOption, setProductOptionCSV] = useState([]); // product_options.csv data

  // Filtered Data
  const [filteredData, setfilteredData] = useState([])
  const [filteredData2, setfilteredData2] = useState([])

  //modal state
  const [show, setShow] = useState(false);

  // Warning Modals state
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  //category name in modal
  const [categoryName, setCategoryName] = useState([])

  // Data sent in Modal
  const [dataforProduct, setdataForProduct] = useState([])


  // Fetching APIs data
  React.useEffect(() => {
    const parseCSVFiles2 = async () => {
      try {
        //Category CSV
        const categoryCSV = await fetch('assets/CSVs/categories.csv');
        const categoryArray1 = await categoryCSV.text();
        const products1 = Papa.parse(categoryArray1, { header: true }).data;
        //Products CSV
        const productsCSV = await fetch('assets/CSVs/products.csv');
        const categoryArray2 = await productsCSV.text();
        const products2 = Papa.parse(categoryArray2, { header: true }).data;
        // Product Options CSV
        const productOptionsCSV = await fetch('assets/CSVs/products_options.csv');
        const categoryArray3 = await productOptionsCSV.text();
        const products3 = Papa.parse(categoryArray3, { header: true }).data;

        setCategoriesCSV(products1)
        setProductCSV(products2)
        setProductOptionCSV(products3)

      } catch (error) {
        console.error('Error parsing CSV files:', error);
      }
    };
    parseCSVFiles2();
  }, []);

  // It'll search for NVR from ProductCSV (only from column "id") and Sending Filter Data in a state
  const cablingData = productCSV.filter((item) => {
    return item.categories && item.categories.includes('Hardware/Cabling');
  });

  // Button Click (COl)

  function handleButtonClick(e, id, name, thumbnail, image1, image2, image3, image4) {

    setShow(true)
    setdataForProduct({
      id: id,
      name: name,
      thumbnail: thumbnail,
      image1: image1,
      image2: image2,
      image3: image3,
      iamge4: image4
    }
    )
    console.log(typeof dataforProduct)
  }


  return (
    <>
      <Container fluid className="my-4" style={{ backgroundColor: "" }}>
        <Container>
          <Row style={{ backgroundColor: "" }}>
            <Col style={{ backgroundColor: "" }}>
              <h2>
                Cables{" "}
                <span className="fst-italic fs-6">(Category)</span>
              </h2>
            </Col>
            {/* Right */}
            <Col className="" style={{ backgroundColor: "" }}>
              <Row className="mb-2">
                <Col className="text-end">
                  Total Number of Cameras : <span className="fw-bold">10</span>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col className="text-end">
                  <h6>
                    Toal Number of Drops : <span className="fw-bold">10</span>
                  </h6>
                </Col>
              </Row>

              <Row className="mb-2">
                <Col className="text-end">
                  <h6>
                    Toal Needed Cables : <span className="fw-bold">??</span>
                  </h6>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col className="text-end">
                  <h6>
                    Toal Cables : <span className="fw-bold">??</span>
                  </h6>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Box*/}

          <Row className="my-4">
            {
              cablingData.map((val) => {
                return (
                  <>
                    <Col style={{ backgroundColor: '' }} md={4} className="nvr_col my-3" onClick={(e) => handleButtonClick(e, val.id, val.name, val.thumbnail, val.iamge1, val.image2, val.image3)} >
                      <Card style={{ width: "", margin: "", height: '300px' }}>
                        <Card.Body>
                          <Card.Title className="fw-bold">SKU : {val.id} </Card.Title>
                          <Card.Text>
                            {val.name}
                          </Card.Text>
                          <Row>
                            <Col xs={8}>
                              <Card.Img
                                variant="top"
                                height={150}
                                // src={hardware.thumbnail === '' ? noImage : ''}
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
                )
              })
            }
          </Row>

          {/* Table */}
          <Row className="my-4" style={{ padding: "8px" }}>
            <Col style={{}}>
              <div className="table-border">
                <Table striped hover>
                  <thead></thead>
                  <tbody>
                    {" "}
                    <tr>
                      {" "}
                      <td>Adding to Cart</td> <td>QTY</td> <td>SKU</td>{" "}
                      <td>Description</td> <td>Total:</td> <td>Licenses:</td>{" "}
                    </tr>{" "}
                    <tr>
                      {" "}
                      <td></td> <td>10</td> <td>10</td> <td>Description</td>
                      <td>Total: 100 </td> <td>Licenses:</td>
                    </tr>{" "}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>

          {/* Button */}
          <Row className="my-4" style={{ backgroundColor: "" }}>
            <Col className="d-flex justify-content-between">
              <Button variant="dark">Previous</Button>
              <Button variant="dark" onClick={handleShow2}>
                Next
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>


      {/* Modal Code - 1 */}
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show} onHide={() => setShow(false)}>

        <Modal.Header closeButton>
          <Modal.Title>{dataforProduct.id}</Modal.Title>

        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>

              <Col md={4}>
                <Row>
                  <Card.Img
                    variant="top"
                    height={150}
                    src={dataforProduct.thumbnail ? dataforProduct.thumbnail : noImage}

                  />
                </Row>
                <Row className="my-2">
                  <Col> <Card.Img
                    variant="top"
                    height={50}
                    src={dataforProduct.image1 ? dataforProduct.image1 : noImage}
                  /></Col>

                  <Col> <Card.Img
                    variant="top"
                    height={50}
                    src={dataforProduct.image2 ? dataforProduct.image2 : noImage}
                  /></Col>
                  <Col> <Card.Img
                    variant="top"
                    height={50}
                    src={dataforProduct.image3 ? dataforProduct.image3 : noImage}
                  /></Col>
                </Row>
              </Col>
              <Col md={8}>
                <p> {dataforProduct.name} </p>

                <div className="d-flex align-items-end justify-content-end" style={{ backgroundColor: '' }}>
                  <Button variant="dark">
                    +
                  </Button>
                  <h6 className="mx-3">0</h6>
                  <Button variant="dark">
                    -
                  </Button>
                </div>
              </Col>


            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="dark" onClick={() => setShow(false)} >Back</Button>
          {/* <Button variant="dark" onClick={() => navigate("/cameras")} >Add</Button> */}
        </Modal.Footer>
      </Modal>

      {/* Warning Modal */}

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <h6> Warning ! There are less cameras and drops than cables</h6>{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to continue</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose2}>
            Go Back
          </Button>
          <Button variant="dark" onClick={()=>navigate('/labor_rate')} >
            Continue Anyways
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  )
}
export default Cabling