import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
// import "./index.css";
import Papa from "papaparse";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Navigate, useNavigate } from "react-router-dom";
import noImage from "../../no_Image.jpg";
import {
  setSelectedCabling,
  deleteCabling,
} from "../../../src/app/features/counter/counterSlice";
import { useSelector, useDispatch } from "react-redux";

const onlineImageURL =
  "https://images.pexels.com/photos/326508/pexels-photo-326508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

function Cabling() {
  const navigate = useNavigate();
  const selectedCameraNumber = useSelector(
    (state) => state.counter1.totalCamera
  );
  const countCabling = useSelector((state) => state.counter1.selectedCabling);
  const [totalPrice, setTotalPrice] = useState(0);
  const [categoryCSV, setCategoriesCSV] = useState([]); // categoryCsv data
  const [productCSV, setProductCSV] = useState([]); // productCSV data
  const [productOption, setProductOptionCSV] = useState([]); // product_options.csv data
  const [count, setCount] = useState(1);
  // Filtered Data
  const [filteredData, setfilteredData] = useState([]);
  const [filteredData2, setfilteredData2] = useState([]);
  //modal state
  const [show, setShow] = useState(false);
  // Warning Modals state
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  //category name in modal
  const [categoryName, setCategoryName] = useState([]);

  // Data sent in Modal
  const [dataforProduct, setdataForProduct] = useState([]);
  const [priceCab, setPriceCab] = useState(0);
  const [initialPrice, setInitialPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setCartItems(countCabling || []);
    console.log('first',countCabling)
    let totalPrice = 0;
    countCabling.forEach((item) => {
      totalPrice += item.totalPriceForItem;
    });
    setTotalPrice(totalPrice);
  }, []);

  const handlePlusClicks = () => {
    setCount(count + 1);
  };

  const handleMinusClicks = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  // Fetching APIs data
  React.useEffect(() => {
    const parseCSVFiles2 = async () => {
      try {
        //Category CSV
        const categoryCSV = await fetch("assets/CSVs/categories.csv");
        const categoryArray1 = await categoryCSV.text();
        const products1 = Papa.parse(categoryArray1, { header: true }).data;
        //Products CSV
        const productsCSV = await fetch("assets/CSVs/products.csv");
        const categoryArray2 = await productsCSV.text();
        const products2 = Papa.parse(categoryArray2, { header: true }).data;
        // Product Options CSV
        const productOptionsCSV = await fetch(
          "assets/CSVs/products_options.csv"
        );
        const categoryArray3 = await productOptionsCSV.text();
        const products3 = Papa.parse(categoryArray3, { header: true }).data;

        setCategoriesCSV(products1);
        setProductCSV(products2);
        setProductOptionCSV(products3);
      } catch (error) {
        console.error("Error parsing CSV files:", error);
      }
    };
    parseCSVFiles2();
  }, []);

  // It'll search for NVR from ProductCSV (only from column "id") and Sending Filter Data in a state
  const cablingData = productCSV.filter((item) => {
    return item.categories && item.categories.includes("Hardware/Cabling");
  });

  //****************** Changes Saturday *******************//
  function handleButtonClick(
    e,
    id,
    name,
    thumbnail,
    image1,
    image2,
    image3,
    image4
  ) {
    setShow(true);
    const selectedProduct = productCSV.find((product) => product.id === id);
    if (selectedProduct) {
      setdataForProduct({
        id: id,
        name: name,
        thumbnail: thumbnail,
        image1: image1,
        image2: image2,
        image3: image3,
        iamge4: image4,
        price: selectedProduct.price,
      });
      setInitialPrice(parseFloat(selectedProduct.price));
    }
  }
  //****************** Changes Saturday *******************//

  //****************** Changes Saturday *******************//
  const calculatePrice = () => {
    const priceCabling = initialPrice * count;
    setPriceCab(priceCabling);
  };
  //****************** Changes Saturday *******************//

  //****************** Changes Saturday *******************//
  const handleCablingData = () => {
    setShow(false);
    const totalPriceForItem = initialPrice * count;
    const newItem = {
      id: dataforProduct.id,
      name: dataforProduct.name,
      quantity: count,
      pricePerItem: initialPrice,
      totalPriceForItem: totalPriceForItem,
    };
    dispatch(setSelectedCabling(newItem));
    setCartItems((prevCartItems) => [...prevCartItems, newItem]);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + totalPriceForItem);
    setCount(1);
    setPriceCab(0);
  };
  //****************** Changes Saturday *******************//

  //****************** Changes Saturday *******************//
  const handleClose = () => {
    setShow(false);
    setCount(1);
    setPriceCab(0);
  };
  //****************** Changes Saturday *******************//

  //****************** Changes Saturday *******************//
  const handleDelete = (index) => {
    dispatch(deleteCabling(index));
    const updatedCartItems = [...cartItems];
    const itemToRemove = updatedCartItems[index];
    const newTotalPrice = totalPrice - itemToRemove.totalPriceForItem;

    updatedCartItems.splice(index, 1);

    setCartItems(updatedCartItems);
    setTotalPrice(newTotalPrice);
  };
  //****************** Changes Saturday *******************//

  return (
    <>
      <Container fluid className="my-4" style={{ backgroundColor: "" }}>
        <Container>
          <Row style={{ backgroundColor: "" }}>
            <Col style={{ backgroundColor: "" }}>
              <h2>
                Cables <span className="fst-italic fs-6">(Category)</span>
              </h2>
            </Col>
            {/* Right */}
            <Col className="" style={{ backgroundColor: "" }}>
              <Row className="mb-2">
                <Col className="text-end">
                  Number of Cameras :{" "}
                  <span className="fw-bold">{selectedCameraNumber}</span>
                </Col>
              </Row>
              {/* <Row className="mb-2">
                <Col className="text-end">
                  <h6>
                    Total Number of Drops : <span className="fw-bold">10</span>
                  </h6>
                </Col>
              </Row>

              <Row className="mb-2">
                <Col className="text-end">
                  <h6>
                    Total Needed Cables : <span className="fw-bold">??</span>
                  </h6>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col className="text-end">
                  <h6>
                    Total Cables : <span className="fw-bold">??</span>
                  </h6>
                </Col>
              </Row> */}
            </Col>
          </Row>

          {/* Box*/}

          <Row className="my-4">
            {cablingData.map((val) => {
              return (
                <>
                  <Col
                    style={{ backgroundColor: "" }}
                    md={4}
                    className="nvr_col my-3"
                    onClick={(e) =>
                      handleButtonClick(
                        e,
                        val.id,
                        val.name,
                        val.thumbnail,
                        val.iamge1,
                        val.image2,
                        val.image3
                      )
                    }
                  >
                    <Card style={{ width: "", margin: "", height: "300px" }}>
                      <Card.Body>
                        <Card.Title className="fw-bold">
                          SKU : {val.id}{" "}
                        </Card.Title>
                        <Card.Text>{val.name}</Card.Text>
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
              );
            })}
          </Row>

          {/********************** Create TableData *********************/}
          <Row className="my-4" style={{ padding: "8px" }}>
            <Col>
              <h5 className="fw-bold">Add to Cart: </h5>

              <div className="table-border">
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>QTY: </th>
                      <th>CableCard Price: </th>
                      <th>Total: </th>
                      <th>Action:</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.quantity}</td>
                        <td>{item.pricePerItem}</td>
                        <td>$ {item.totalPriceForItem.toFixed(2)}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(index)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {/* Final Section */}
                    <tr>
                      <th></th>
                      <td></td>
                      <td>
                        <b>Total Price :</b>
                      </td>
                      <td>$ {totalPrice.toFixed(2)}</td>
                      <td></td>
                    </tr>
                    {/* Final Section */}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
          {/********************** Create TableData *********************/}

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
        show={show}
        onHide={handleClose}
      >
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
                    src={
                      dataforProduct.thumbnail
                        ? dataforProduct.thumbnail
                        : noImage
                    }
                  />
                </Row>
                <Row className="my-2">
                  <Col>
                    {" "}
                    <Card.Img
                      variant="top"
                      height={50}
                      src={
                        dataforProduct.image1 ? dataforProduct.image1 : noImage
                      }
                    />
                  </Col>

                  <Col>
                    {" "}
                    <Card.Img
                      variant="top"
                      height={50}
                      src={
                        dataforProduct.image2 ? dataforProduct.image2 : noImage
                      }
                    />
                  </Col>
                  <Col>
                    {" "}
                    <Card.Img
                      variant="top"
                      height={50}
                      src={
                        dataforProduct.image3 ? dataforProduct.image3 : noImage
                      }
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={8}>
                <p> {dataforProduct.name} </p>

                <div
                  className="d-flex align-items-end justify-content-end"
                  style={{ backgroundColor: "" }}
                >
                  <Button variant="dark" onClick={handlePlusClicks}>
                    +
                  </Button>
                  <h6 className="mx-3">{count}</h6>
                  <Button variant="dark" onClick={handleMinusClicks}>
                    -
                  </Button>
                </div>
              </Col>
            </Row>
            {/* Final Price */}
            <Row className="mt-5 justify-content-start">
              {" "}
              {/* Aligning to the right */}
              <div className="w-100 d-flex justify-content-start">
                {" "}
                {/* Aligning to the right */}
                <Button variant="dark" onClick={calculatePrice}>
                  Final Price
                </Button>
              </div>
              <div className="w-100 my-1 d-flex justify-content-start">
                {" "}
                {/* Aligning to the right */}
                <div className="text">
                  <Table
                    striped
                    bordered
                    hover
                    responsive
                    style={{ width: "14rem" }}
                  >
                    <thead>
                      <tr>
                        <th>
                          <b>$ {priceCab.toFixed(2)}</b>
                        </th>
                      </tr>
                    </thead>
                  </Table>
                </div>
              </div>
            </Row>
            {/* Final Price */}
          </Container>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="dark" onClick={() => setShow(false)}>
            Back
          </Button>
          <Button variant="dark" onClick={handleCablingData}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Warning Modal */}

      {/* <Modal show={show2} onHide={handleClose2}>
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
      </Modal> */}
    </>
  );
}
export default Cabling;