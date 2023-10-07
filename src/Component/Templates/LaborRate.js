import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Papa from "papaparse";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate, Link } from "react-router-dom";
import noImage from "../../no_Image.jpg";
import Form from "react-bootstrap/Form";
import {
  setSelectedLabor,
  deleteLabor,
  setFinalData,
} from "../../../src/app/features/counter/counterSlice";

import { useSelector, useDispatch } from "react-redux";
import Loader from "./Loader.js";

function LaborRate() {
  const [isLoading, setIsLoading] = useState(true); // Loader State

  const navigate = useNavigate();
  const [categoryCSV, setCategoryCSV] = useState([]);
  const [productCSV, setProductCSV] = useState([]);
  const [productOption, setProductOptionCSV] = useState([]);
  const selectedCameraNumber = useSelector(
    (state) => state.counter1.totalCamera
  );
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [count, setCount] = useState(1);
  const [basePrice, setBasePrice] = useState(0);
  const [basePrice1, setBasePrice1] = useState(0);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [filteredData2, setfilteredData2] = useState([]);
  const [categoryName2, setCategoryName2] = useState([]);
  const countLabor = useSelector((state) => state.counter1.selectedLabor);

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

        setCategoryCSV(products1);
        setProductCSV(products2);
        setProductOptionCSV(products3);
        setIsLoading(false);

      } catch (error) {
        console.error("Error parsing CSV files:", error);
      }
    };
    parseCSVFiles2();
  }, []);

  React.useEffect(() => {
    if (countLabor) {
      setCartItems(countLabor || []);
      let totalPrice = 0;
      countLabor.forEach((item) => {
        totalPrice += item.totalPriceForItem;
      });
      setTotalPrice(totalPrice);
    }
  }, [countLabor]);

  const laborData = categoryCSV.filter((item) => {
    return item.category_parent && item.category_parent.includes("105");
  });

  const handleButtonClick = (e, category_name) => {
    setCategoryName(category_name);
    setShow(true);

    const laborData2 = productCSV.filter((item) => {
      if (item.categories) {
        const categoriesWords = item.categories.split("/");
        return categoriesWords.some((word) => category_name == word);
      }
      return false;
    });
    setfilteredData(laborData2);
  };

  function modal_1(e, id, item) {
    setShow2(true);
    setShow(false);

    const laborData3 = filteredData.filter((item) => {
      if (item.id == id) {
        return item;
      }
    });
    setBasePrice(parseFloat(laborData3[0].price));
    setfilteredData2(laborData3);
    setCategoryName2(id);
  }

  function modal_3() {
    setShow3(true);
    setShow2(false);
  }

  const handleClickPlus = () => {
    setCount(count + 1);
  };

  const handleClickMinus = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const calculateFinalPrice = () => {
    const data = basePrice * count;
    setBasePrice1(data);
  };

  const handleCablingData = () => {
    setShow2(false);
    const totalPriceForItem = basePrice * count;
    const dataforProduct = filteredData2[0];
    const newItem = {
      id: dataforProduct.id,
      name: dataforProduct.name,
      quantity: count,
      pricePerItem: basePrice,
      totalPriceForItem: totalPriceForItem,
    };
    dispatch(setSelectedLabor(newItem));
    dispatch(setFinalData(newItem));
    setCartItems((prevCartItems) => [...prevCartItems, newItem]);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + totalPriceForItem);
    setCount(1);
    setBasePrice1(0);
  };

  const handleDelete = (index) => {
    dispatch(deleteLabor(index));
    const updatedCartItems = [...cartItems];
    const itemToRemove = updatedCartItems[index];
    const newTotalPrice = totalPrice - itemToRemove.totalPriceForItem;

    updatedCartItems.splice(index, 1);

    setCartItems(updatedCartItems);
    setTotalPrice(newTotalPrice);
  };

  const handleNext = () => {
    navigate("/pdf");
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
                Labor <span className="fst-italic fs-6">(Category)</span>
              </h2>
            </Col>
            <Col className="" style={{ backgroundColor: "" }}>
              <Row>
                <Col className="text-end">
                  Number of Cameras :{" "}
                  <span className="fw-bold">{selectedCameraNumber}</span>
                </Col>
              </Row>
              <Row>
                <Col className="text-end">
                  <Link to="/">
                    <h6>
                      Edit here <span className="fw-bold"></span>
                    </h6>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="my-4" style={{ backgroundColor: "" }}>
            {laborData.map((item) => {
              return (
                <>
                  <Col
                    md={4}
                    className="mb-4"
                    onClick={(e) => handleButtonClick(e, item.category_name)}
                  >
                    <Card style={{ width: "", margin: "" }}>
                      <Card.Body>
                        <Row>
                          <Col xs={7}>
                            <Card.Img
                              variant="top"
                              height={150}
                              src={item.iconimage ? item.iconimage : noImage}
                            />
                          </Col>
                          <Col
                            xs={5}
                            className=" align-items-center justify-content-center fw-bold"
                          >
                            <Card.Text className="fs-6">
                              {item.category_name}
                            </Card.Text>
                            <p className="camera_category_title">
                              {" "}
                              {item.category_title
                                ? item.category_title
                                : "No Title Found"}
                            </p>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </>
              );
            })}
          </Row>

          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            onHide={() => setShow(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>{categoryName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="my-4">
                {filteredData.map((item) => {
                  return (
                    <>
                      <Col
                        md={4}
                        className="nvr_col my-2"
                        onClick={(e) => modal_1(e, item.id)}
                        key={item.id}
                      >
                        <Card
                          style={{
                            width: "",
                            backgroundColor: "",
                            height: "300px",
                          }}
                        >
                          <Card.Body>
                            <Card.Title className="fw-bold">
                              SKU : {item.id}
                            </Card.Title>
                            <Card.Text>
                              {" "}
                              {item.name.split(" ").slice(0, 10).join(" ")}...
                            </Card.Text>

                            <Row>
                              <Col xs={8}>
                                <Card.Img
                                  variant="top"
                                  height={100}
                                  src={
                                    item.thumbnail ? item.thumbnail : noImage
                                  }
                                />
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
                    </>
                  );
                })}
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="dark" onClick={() => setShow(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show2}
            onHide={() => setShow2(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>{categoryName2}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row>
                  {filteredData2.map((val) => {
                    return (
                      <>
                        <Col md={5} style={{ backgroundColor: "" }}>
                          <Row>
                            <Card.Img
                              variant="top"
                              height={150}
                              src={val.thumbnail ? val.thumbnail : noImage}
                            />
                          </Row>
                          <Row className="my-2">
                            <Col>
                              {" "}
                              <Card.Img
                                variant="top"
                                height={40}
                                className="camera_thumbnail_img"
                                src={val.image1 ? val.imgae1 : noImage}
                                // onClick={() => { setThumbimg({ img1: onlineImg }) }}
                              />
                            </Col>
                            <Col>
                              {" "}
                              <Card.Img
                                variant="top"
                                height={40}
                                className="camera_thumbnail_img"
                                src={val.image2 ? val.imgae2 : noImage}
                                // onClick={() => { setThumbimg({ img1: onlineImg }) }}
                              />
                            </Col>
                            <Col>
                              {" "}
                              <Card.Img
                                variant="top"
                                height={40}
                                className="camera_thumbnail_img"
                                src={val.image3 ? val.imgae3 : noImage}
                                // onClick={() => { setThumbimg({ img1: onlineImg }) }}
                              />
                            </Col>
                            <Col>
                              {" "}
                              <Card.Img
                                variant="top"
                                height={40}
                                className="camera_thumbnail_img"
                                src={val.image4 ? val.imgae4 : noImage}
                                // onClick={() => { setThumbimg({ img1: image4 }) }}
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col md={7}>
                          <p className="fst-italic">
                            {" "}
                            <span className="fw-bold">
                              Description 22:{" "}
                            </span>{" "}
                            {val.name}
                          </p>
                          <div
                            className="d-flex align-items-end justify-content-end my-4"
                            style={{ backgroundColor: "" }}
                          >
                            <Button variant="dark" onClick={handleClickPlus}>
                              +
                            </Button>
                            <h6 className="mx-3">{count}</h6>
                            <Button variant="dark" onClick={handleClickMinus}>
                              -
                            </Button>
                          </div>
                        </Col>
                        <Row className="mt-5 justify-content-start">
                          <div className="w-100 d-flex justify-content-start">
                            <Button
                              variant="dark"
                              onClick={calculateFinalPrice}
                            >
                              Final Price
                            </Button>
                          </div>
                          <div className="w-100 my-1 d-flex justify-content-start">
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
                                      {basePrice1 ? (
                                        <b>$ {basePrice1.toFixed(2)}</b>
                                      ) : (
                                        <b>$ 0</b>
                                      )}
                                    </th>
                                  </tr>
                                </thead>
                              </Table>
                            </div>
                          </div>
                        </Row>
                      </>
                    );
                  })}
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <div className="w-100 my-4 d-flex align-items-end justify-content-between">
                <Button
                  className="mx-3"
                  variant="dark"
                  onClick={() => setShow2(false)}
                >
                  Back
                </Button>
                <Button
                  variant="dark"
                  onClick={handleCablingData}
                  disabled={basePrice1 === 0}
                >
                  Add
                </Button>
              </div>
            </Modal.Footer>
          </Modal>

          <Row className="my-4" style={{ padding: "8px" }}>
            <Col>
              <h5 className="fw-bold">Add to Cart: </h5>

              <div className="table-border">
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>QTY: </th>
                      <th>SKU: </th>
                      <th>Labor Base Price: </th>
                      <th>Total: </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.quantity}</td>
                        <td>{item.id}</td>
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
                      <td></td>

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
              <Button variant="dark" onClick={handleNext}>
                Next
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>
      )}

    </>
  );
}

export default LaborRate;
