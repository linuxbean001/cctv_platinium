import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Papa from "papaparse";
import { Navigate, useNavigate } from "react-router-dom";
import noImage from "../../no_Image.jpg";

import {
  setSelectedCabling,
  deleteCabling,
  setFinalData,
  setTotalCablesSelected,
  setSelectedNumberOfDrops,
} from "../../../src/app/features/counter/counterSlice";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Loader.js";
import { useEffect } from "react";

function Cabling() {
  const [isLoading, setIsLoading] = useState(true); // Loader State

  const selectedCameraNumber = useSelector(
    (state) => state.counter1.totalCamera
  );

  // Numbner of Drops :
  const totalDrops = useSelector(
    (state) => state.counter1.selectedNumberOfDrops
  );

  // Numbner of Drops :
  const totalOfCablesNumbers = useSelector(
    (state) => state.counter1.totalCablesSelected
  );

  const countCabling = useSelector((state) => state.counter1.selectedCabling);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0); // How many cables you have selected
  const [categoryCSV, setCategoriesCSV] = useState([]);
  const [productCSV, setProductCSV] = useState([]);
  const [productOption, setProductOptionCSV] = useState([]);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const [filteredData, setfilteredData] = useState([]);
  const [filteredData2, setfilteredData2] = useState([]);
  const [show, setShow] = useState(false);

  //warning modal
  const [lgShow, setLgShow] = useState(false);

  const cableNextPage = () => {
    if (totalOfCablesNumbers < selectedCameraNumber + totalDrops) {
      setLgShow(true);
    } else {
      navigate("/labor_rate");
    }
  };

  const [dataforProduct, setdataForProduct] = useState([]);
  const [priceCab, setPriceCab] = useState(0);
  const [basePrice, setBasePrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setCartItems(countCabling || []);
    let totalPrice = 0;
    countCabling.forEach((item) => {
      totalPrice += item.totalPriceForItem;
    });
    setTotalPrice(totalPrice);
  }, []);

  // Total Cables Selected Quantity
  React.useEffect(() => {
    setCartItems(countCabling || []);
    let quantity = 0;
    countCabling.forEach((item) => {
      quantity += item.quantity;
    });
    setTotalQuantity(quantity);
  }, []);

  React.useEffect(() => {
    dispatch(setTotalCablesSelected(totalQuantity));
  }, [totalQuantity]);

  const handlePlusClicks = () => {
    setCount(count + 1);
  };

  const handleMinusClicks = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  // Use a useEffect hook to update priceCab whenever count changes
useEffect(() => {
  const priceCabling = parseFloat(dataforProduct.price) * count;
  setPriceCab(priceCabling);
}, [count, dataforProduct.price]);

  React.useEffect(() => {
    const parseCSVFiles2 = async () => {
      try {
        const categoryCSV = await fetch("assets/CSVs/categories.csv");
        const categoryArray1 = await categoryCSV.text();
        const products1 = Papa.parse(categoryArray1, { header: true }).data;
        const productsCSV = await fetch("assets/CSVs/products.csv");
        const categoryArray2 = await productsCSV.text();
        const products2 = Papa.parse(categoryArray2, { header: true }).data;
        const productOptionsCSV = await fetch(
          "assets/CSVs/products_options.csv"
        );
        const categoryArray3 = await productOptionsCSV.text();
        const products3 = Papa.parse(categoryArray3, { header: true }).data;

        setCategoriesCSV(products1);
        setProductCSV(products2);
        setProductOptionCSV(products3);
        setIsLoading(false);
      } catch (error) {
        console.error("Error parsing CSV files:", error);
      }
    };
    parseCSVFiles2();
  }, []);

  const cablingData = productCSV.filter((item) => {
    return item.categories && item.categories.includes("Hardware/Cabling");
  });

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
      setBasePrice(parseFloat(selectedProduct.price));
      const priceCabling = parseFloat(selectedProduct.price) * count;
      setPriceCab(priceCabling);
    }
  }


  const addButtonClick = () => {
    setShow(false);
    const totalPriceForItem = basePrice * count;
    const newItem = {
      id: dataforProduct.id,
      name: dataforProduct.name,
      quantity: count,
      pricePerItem: basePrice,
      totalPriceForItem: totalPriceForItem,
    };
    dispatch(setSelectedCabling(newItem));
    dispatch(setFinalData(newItem));
    setCartItems((prevCartItems) => [...prevCartItems, newItem]);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + totalPriceForItem);
    setTotalQuantity((prevTotalPrice) => prevTotalPrice + count);
    setCount(1);
    setPriceCab(0);
  };

  const handleClose = () => {
    setShow(false);
    setCount(1);
    setPriceCab(0);
  };

  const handleDelete = (index) => {
    dispatch(deleteCabling(index));
    const updatedCartItems = [...cartItems];
    const itemToRemove = updatedCartItems[index];
    const newTotalPrice = totalPrice - itemToRemove.totalPriceForItem;
    const TotalQuantity = totalQuantity - itemToRemove.quantity;

    updatedCartItems.splice(index, 1);

    setCartItems(updatedCartItems);
    setTotalPrice(newTotalPrice);
    setTotalQuantity(TotalQuantity);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
                <Row className="mb-2">
                  <Col className="text-end">
                    Number of Drops :{" "}
                    <span className="fw-bold">{totalDrops}</span>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col className="text-end">
                    Total Needed Cables :{" "}
                    <span className="fw-bold">
                      {selectedCameraNumber + totalDrops}
                    </span>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col className="text-end">
                    Total Cables Selected:{" "}
                    <span className="fw-bold">{totalOfCablesNumbers}</span>
                  </Col>
                </Row>
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

            <Row className="my-4" style={{ padding: "8px" }}>
              <Col>
                <h5 className="fw-bold">Add to Cart: </h5>

                <div className="table-border">
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>SKU: </th>
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
                          <td>{item.id}</td>
                          <td>{item.quantity}</td>
                          <td>{item.pricePerItem}</td>
                          <td>$ {item.totalPriceForItem.toFixed(2)}</td>
                          <td>
                            <Button
                              variant="dark"
                              onClick={() => handleDelete(index)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <th></th>
                        <td></td>
                        <td>{totalQuantity}</td>
                        <td>
                          <b>Total Price :</b>
                        </td>
                        <td>$ {totalPrice.toFixed(2)}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
            <Row className="my-4" style={{ backgroundColor: "" }}>
              <Col className="d-flex justify-content-end">
                <Button variant="dark" onClick={cableNextPage}>
                  Next
                </Button>
              </Col>
            </Row>
          </Container>
        </Container>
      )}

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
            <Row className="mt-5 justify-content-start">
              {" "}
              
              <div className="w-100 my-1 d-flex justify-content-start">
                {" "}
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
          </Container>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="dark" onClick={() => setShow(false)}>
            Back
          </Button>
          <Button
            variant="dark"
            onClick={addButtonClick}
            // disabled={priceCab === 0}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Warning Modal*/}

      <Modal show={lgShow} onHide={() => setLgShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h6>
              {" "}
              Warning ! There are less cables added to cart than Total Needed
              Cables
            </h6>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>Are you sure want to continue ?</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => setLgShow(false)}>
            No
          </Button>
          {/* <Button variant="dark" onClick={() => navigate("/labor_rate")}> */}
          <Button variant="dark" onClick={() => navigate("/labor_rate")}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Cabling;
