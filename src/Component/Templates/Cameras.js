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
import { useNavigate } from "react-router-dom"

function Cameras(props) {
  const navigate = useNavigate();

  const [data, setData] = useState([]); // for category csv
  const [productCSV, setProductCSV] = useState([]); // for products csv
  const [categoryDatas, setCategoryDatas] = useState([]); // for products csv

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [count, setCount] = useState(0);

  const [test, setTest] = useState([])
  const [test2, setTest2] = useState([])
  const [thumbimg, setThumbimg] = useState([])


  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

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
        setProductCSV(products2)


      } catch (error) {
        console.error('Error parsing CSV files:', error);
      }
    };
    parseCSVFiles2();
  }, []);

  // Filter Condition-1
  const targetIds = ['Moving PTZ Cameras', 'Domes', 'Turrets', 'NDAA', 'LPR - License Plate Recognition', 'Bullets'];
  const filteredData = data.filter(item => targetIds.includes(item.category_name));

  const handleButtonClick = (e, category_name) => {
    setShow(true)
    setCategoryDatas(category_name) 
    // Filter Condition-2
    const filteredData4 = productCSV.filter((item) => {
      if (item.categories) {
        const categoriesWords = item.categories.split('/');
        // console.log('items are' ,categoriesWords)
        return categoriesWords.some(word => category_name == word);
      }
      return false
    });
    setTest(filteredData4)
  }

  // Modal_1
  function modal_1(e,id) {
    setShow2(true)
    setShow(false)
    // console.log('id is', id) // getting id from product csv

     // Filter Condition-2
     const filteredData5 = test.filter((item) => {
      // console.log(test)
      if (item.id == id) {
        return item
      }
    });
    setTest2(filteredData5)
  }
console.log('test 2 :',  test2)
  console.log('imagess', thumbimg.img1)

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

          {/* Box */}
          <Row className="my-4" style={{ backgroundColor: '' }}>
            {
              filteredData.map((val) => {
                return (
                  <Col md={4} className="mb-4" onClick={(e) => handleButtonClick(e, val.category_name)}>
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

              <Button variant="dark" onClick={() => navigate("/poe-switch")} >Next</Button>
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
              <Modal.Title>{categoryDatas}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="my-4">
                {test.map(item => (
                  <Col md={4} className="nvr_col" onClick={(e) => modal_1(e, item.id)} key={item.id}>
                    <Card style={{ width: "", backgroundColor: "", height:'350px' }}>
                      <Card.Body>
                        <Card.Title className="fw-bold">SKU : {item.id}</Card.Title>
                        <Card.Text>Description :  {item.description.split(' ').slice(0, 20).join(' ')}...</Card.Text>

                        <Row>
                          <Col xs={8}>
                            <Card.Img variant="top" height={100} src={item.thumbnail} />
                          </Col>
                          <Col
                            xs={4}
                            className="d-flex align-items-center justify-content-center fw-bold"
                          >
                            $ {item.price}
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}


              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="dark" onClick={() => setShow(false)}>Close</Button>
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
              <Modal.Title>{categoryDatas}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>

                <Row>

                  {

                      test2.map((val)=>{
                        return(
                          <>
                        <Col md={5} style={{ backgroundColor: '' }}>
                    <Row>
                      <Card.Img
                        variant="top"
                        height={150}
                        src= {thumbimg.img1}
                      />
                    </Row>
                    <Row className="my-2">
                      <Col> <Card.Img
                        variant="top"
                        height={40}
                        className="camera_thumbnail_img"
                        src={val.image1}
                         onClick={()=>{setThumbimg({img1:val.image1})}}

                      /></Col>
                      <Col> <Card.Img
                        variant="top"
                        height={40}
                        className="camera_thumbnail_img"
                        src={val.image2}
                        onClick={()=>{setThumbimg({img1:val.image2})}}

                      /></Col>
                      <Col> <Card.Img
                        variant="top"
                        height={40}
                        className="camera_thumbnail_img"
                        src={val.image3}
                        onClick={()=>{setThumbimg({img1:val.image3})}}

                      /></Col>
                        <Col> <Card.Img
                        variant="top"
                        height={40}
                        className="camera_thumbnail_img"
                        src={val.image4}
                        onClick={()=>{setThumbimg({img1:val.image4})}}
                      /></Col>

                    </Row>

                  </Col>
                  <Col md={7}>
                    <p>{val.name}
                    </p>
                    <p>
                    {val.name}
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
                          </>
                        )
                      })
                  }
                  
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <div className="w-100 my-4 d-flex align-items-end justify-content-between" >

                <Button className="mx-3" variant="dark" onClick={() => setShow2(false)}>
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

                <Button className="mx-3" variant="dark" onClick={() => setShow3(false)}>
                  Go Back
                </Button>
                <Button variant="dark" onClick={() => setShow3(false)}>
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
