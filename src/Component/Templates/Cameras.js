import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from 'react-bootstrap/Modal';
import Papa from "papaparse";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link } from "react-router-dom";

function Cameras(props) {
  const [data, setData] = useState([]); // for category csv
  const [data2, setData2] = useState([]); // for products csv
  const [categoryDatas, setCategoryDatas] = useState([]); // for products csv

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };
  // Modal_1
  function modal_1() {
    setShow2(true)
    setShow(false)
  }
  function modal_3() {
    setShow3(true)
    setShow2(false)
  }
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

        setData(products1)
        setData2(products2)


      } catch (error) {
        console.error('Error parsing CSV files:', error);
      }
    };
    parseCSVFiles2();
  }, []);

  const handleButtonClick = (e,category_name) => {
    setShow(true)
    setCategoryDatas(category_name)
  }

  console.log(categoryDatas)


  // Filter Condition-1
  const targetIds = ['Moving PTZ Cameras', 'Domes', 'Turrets', 'NDAA', 'LPR - License Plate Recognition', 'Bullets'];
  const filteredData = data.filter(item => targetIds.includes(item.category_name));

  // Filter Condition-2
  const filteredData4 = data2.filter((item)=>{
    if (item.categories) {
      const categoriesWords = item.categories.split('/');
      return categoriesWords.some(word => targetIds.includes(word));
    }
    return false
  });

  // console.log(filteredData4)
 



  return (
    <>
      <Container fluid className="my-4" style={{ backgroundColor: "" }}>
        <Container>
          <Row style={{ backgroundColor: "" }}>
            <Col style={{ backgroundColor: "" }}>
              <h2>
                Camera{" "}
                <span className="fst-italic fs-6">(Category)</span>
              </h2>
            </Col>
            <Col className="" style={{ backgroundColor: "" }}>
              <Row>
                <Col className="text-end">
                  Number of Cameras : <span className="fw-bold">??</span>
                </Col>
              </Row>
              <Row>
                <Col className="text-end">
                
                <Link to='/'>
                  <h6>
                    Edit here <span className="fw-bold"></span>
                  </h6>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="my-4" style={{ backgroundColor: '' }}>
            {
              filteredData.map((val) => {
                return (
                  <Col md={4} className="mb-4" onClick={(e) => handleButtonClick(e,val.category_name)}>
                    <Card style={{ width: "", margin: "" }}>
                      <Card.Body>
                        <Row>
                          <Col xs={7} >
                            <Card.Img
                              variant="top"
                              height={150}
                              src={val.iconimage}
                            />
                          </Col>
                          <Col
                            xs={5}
                            className=" align-items-center justify-content-center fw-bold"
                          >
                            <Card.Text className="fs-6">
                              {" "}
                              {val.category_name}
                            </Card.Text>
                            <p className="camera_category_title"> {val.category_title}</p>
                          </Col>
                        </Row>
                      </Card.Body>

                    </Card>
                  </Col>
                )
              })
            }
          </Row>
          <Row className="my-4" style={{ backgroundColor: "" }}>
            <Col className="d-flex justify-content-end">

              <Button variant="dark">Next</Button>
            </Col>
          </Row>

          {/* Modal Code - 1 */}
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Turrets</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="my-4">
                <Col md={6} className="nvr_col" onClick={modal_1}>
                  <Card style={{ width: "", margin: "" }}>
                    <Card.Body>
                      <Card.Title className="fw-bold">SKU : ?</Card.Title>
                      <Card.Text>

                        Description : ?

                      </Card.Text>

                      <Row>
                        <Col xs={8}>
                          <Card.Img
                            variant="top"
                            height={150}
                            src='assets/images/Categories/Fake-Cameras.jpg'
                          />
                        </Col>
                        <Col
                          xs={4}
                          className="d-flex align-items-center justify-content-center fw-bold"
                        >
                          $ 500
                        </Col>
                      </Row>
                    </Card.Body>

                  </Card>
                </Col>
                

              </Row>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
          </Modal>

          {/* Modal-2 */}
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show2} onHide={() => setShow2(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Modal 2</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>

                <Row>
                  <Col md={4} style={{ backgroundColor: '' }}>
                    <Row>
                      <Card.Img
                        variant="top"
                        height={150}
                        src='assets/images/Categories/Fake-Cameras.jpg'
                      />
                    </Row>
                    <Row className="my-2">
                      <Col> <Card.Img
                        variant="top"
                        height={50}
                        src='assets/images/Categories/Fake-Cameras.jpg'

                      /></Col>
                      <Col> <Card.Img
                        variant="top"
                        height={50}
                        src='assets/images/Categories/Fake-Cameras.jpg'

                      /></Col>
                      <Col> <Card.Img
                        variant="top"
                        height={50}
                        src='assets/images/Categories/Fake-Cameras.jpg'

                      /></Col>

                    </Row>

                  </Col>
                  <Col md={8}>
                    <p>Description:
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem, corrupti?
                    </p>
                    <p>Options:
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                    <DropdownButton variant="dark" id="dropdown-basic-button" title="Options">
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>

                    <div className="d-flex align-items-end justify-content-end" style={{ backgroundColor: '' }}>
                      <Button variant="dark" onClick={handleIncrement}>
                        +
                      </Button>
                      <h6 className="mx-3">{count}</h6>
                      <Button variant="dark" onClick={handleDecrement}>
                        -
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <div className="w-100 my-4 d-flex align-items-end justify-content-between" >

                <Button className="mx-3" variant="dark">
                  Back
                </Button>
                <Button variant="dark" onClick={modal_3}>
                  Add
                </Button>
              </div>
            </Modal.Footer>
          </Modal>
          {/* Modal-3 */}
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show3} onHide={() => setShow3(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Warning ! </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                Less Brackets Than Camera !
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <div className="w-100 my-4 d-flex align-items-end justify-content-between" >

                <Button className="mx-3" variant="dark">
                  Go Back
                </Button>
                <Button variant="dark" >
                  Continue Anyways
                </Button>
              </div>
            </Modal.Footer>
          </Modal>
        </Container>
      </Container>
    </>
  );
}

export default Cameras;
