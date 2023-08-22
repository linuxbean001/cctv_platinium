import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import hotelImage from "../../assets/images/Categories/Restaurant-Security-Cameras-1.jpg";
// import hotelImage from "assets/";

import Papa from "papaparse";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home(props) {
const [numboptions, setNumbOptions] = useState(0);
const handleOptionsIncre = () => {
  setNumbOptions(numboptions + 1);
  props.addToCartHandler({numboptions:numboptions})
};

const handleOptionsDecre = () => {
  if (numboptions > 0) {
    setNumbOptions(numboptions - 1);
  props.addToCartHandler({numboptions:numboptions})
  }
};
// Storing value of + and - button in state (No. of options)
const [numbcamera, setNumbCamera] = useState(0);
const handleCameraIncre = () => {
  setNumbCamera(numbcamera + 1);
  props.addToCartHandler({numbcamera:numbcamera})
};

const handleCameraDecre = () => {
  if (numbcamera > 0) {
    setNumbCamera(numbcamera - 1);
  props.addToCartHandler({numbcamera:numbcamera})
  }
};

// Storing value (Camera of options) ends
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showTemp, setShowTemp] = useState(false);
  const [showCam_num, setShowCam_num] = useState(false)
  let categoriesData = [];
  let productOptionsDetails = []

  const cameraOptions = [
    { location_name: "Home" },
    { location_name: "Restaurant" },
    { location_name: "Internet" },
    { location_name: "Dealer" },
    { location_name: "Custom" },
    { location_name: "Property Mangaement" },
  ];

  React.useEffect(() => {
      const parseCSVFiles = async () => {
      try {
        const categoryData = await fetch('assets/CSVs/categories.csv');
        const productData = await fetch('assets/CSVs/products.csv');
        const productOptionData = await fetch('assets/CSVs/products_options.csv');
        const categoryArray = await categoryData.text();
        const productArray = await productData.text();
        const productOptionArray = await productOptionData.text();
        const categories = Papa.parse(categoryArray, { header: true }).data;
        categories.map(({ id, category_name, category_description, category_parent, iconimage, filename, sorting }) => {
          categoriesData.push({
            id,
            category_name,
            category_description,
            category_parent,
            iconimage,
            filename,
            sorting,
          });
        });
        const products = Papa.parse(productArray, { header: true }).data;
        const productOptions = Papa.parse(productOptionArray, { header: true }).data;
        productOptions.map(({ optionid, productid, featurecaption, featuretype, featureprice, partnumber, selected,sorting ,thumbpath,featurerequired}) => {
          
          productOptionsDetails.push({
            optionid, productid, featurecaption, featuretype, featureprice, partnumber, selected,sorting ,thumbpath,featurerequired
          });
        });
       
        setData((data)=>({
          categories: categoriesData,
          products,
          productOptions:productOptionsDetails ,
        }));
      } catch (error) {
        console.error('Error parsing CSV files:', error);
      }
    };
    parseCSVFiles();
  }, []);

  const fetchInfo = () => { 
    return axios.get('assets/CSVs/products.csv') 
             .then((response) => setData(response.data));
  }
  React.useEffect(() => { 
        fetchInfo(); 
  }, [])

  const handleOptions = (e) => {
    const { name, value } = e.target;
    setOptions((prevValues) => {
      return {
        ...prevValues,
        name: value,
      };
    });
    setShow(true);
  };

  const handleClick = () => {
    setShowTemp(true);
    setShow(false);
  };

  const handleNext=()=>{
    props.addToCartHandler(options)
    navigate("/recorder")
  }
  return (
    <>
    
      <Container className="my-4" fluid style={{ backgroundColor: "" }}>
        <Row className="p-1">
          {/* Left */}
          <Col md={9}>
            <Row className="my-4">
              {cameraOptions.map((details) => {
                return (
                  <Col className="my-4" style={{ backgroundColor: "" }}>
                    <Card style={{ width: "18rem" }}>
                      <Card.Img variant="top" height={200} src={'assets/images/Categories/Restaurant-Security-Cameras-1.jpg'} />
                      <Card.Body>
                        <Card.Title>{details.location_name}</Card.Title>
                        <Card.Text>
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </Card.Text>
                        <Button
                          variant="dark"
                          name={details.location_name || ""}
                          value={details.location_name || ""}
                          onClick={handleOptions}
                        >
                          {details.location_name}
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
        {/*Options Modal*/}
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>First Modal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="my-2">
              <Col md={8} style={{ backgroundColor: "" }}>
                Number of Options
              </Col>
              <Col md={4} style={{ backgroundColor: "" }}>
                  
              <div className="d-flex align-items-end justify-content-end" style={{ backgroundColor: '' }}>
                <Button variant="dark" onClick={handleOptionsIncre}>
                  +
                </Button>
                <h6 className="mx-3">{numboptions}</h6>
                <Button variant="dark" onClick={handleOptionsDecre}>
                  -
                </Button>
              </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button className="d-block" variant="info" onClick={handleClick}>
              Next
            </Button>
          </Modal.Footer>
        </Modal>
        {/*Template Modal*/}
        <Modal show={showTemp} onHide={() => setShowTemp(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Use Templates</Modal.Title>
          </Modal.Header>
          <Modal.Body>Use Templates?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Yes</Button>
            <Button variant="primary" onClick={() => setShowCam_num(true)}>No</Button>
          </Modal.Footer>
        </Modal>

        {/*Camera Number Modal*/}

        <Modal show={showCam_num} onHide={() => setShowCam_num(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Camera Number</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="my-2">
              <Col md={8} style={{ backgroundColor: "" }}>
                Total Number Of Cameras
              </Col>
              <Col md={4} style={{ backgroundColor: "" }}>
              <div className="d-flex align-items-end justify-content-end" style={{ backgroundColor: '' }}>
                <Button variant="dark" onClick={handleCameraIncre}>
                  +
                </Button>
                <h6 className="mx-3"> {numbcamera}</h6>
                <Button variant="dark" onClick={handleCameraDecre}>
                  -
                </Button>
              </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button className="d-block" variant="info" onClick={handleNext}>
              Next
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default Home;
