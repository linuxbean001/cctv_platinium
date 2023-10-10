import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Papa from "papaparse";
import Card from "react-bootstrap/Card";
import noImage from "../../no_Image.jpg";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/esm/Table";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  setSelectedSpecial,
  deleteSpecial,
  setFinalData,
} from "../../../src/app/features/counter/counterSlice";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "./Loader.js";

function Special() {
  const [isLoading, setIsLoading] = useState(true); // Loader State

  const [categoryCSV, setCategoriesCSV] = useState([]);
  const [productCSV, setProductCSV] = useState([]);
  const [productOption, setProductOptionCSV] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const [filteredData2, setfilteredData2] = useState([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [categoryName, setCategoryName] = useState([]);
  const [categoryName2, setCategoryName2] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [count, setCount] = useState(1);
  const [basePrice, setBasePrice] = useState(0);
  const [priceCab, setPriceCab] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const selectedCameraNumber = useSelector(
    (state) => state.counter1.totalCamera
  );
  const countSpecial = useSelector((state) => state.counter1.selectedSpecial);

  const dispatch = useDispatch();

  React.useEffect(() => {
    setCartItems(countSpecial || []);
    let totalPrice = 0;
    countSpecial.forEach((item) => {
      totalPrice += item.totalPriceForItem;
    });
    setTotalPrice(totalPrice);
  }, []);

  const handlePlusClick = () => {
    setCount(count + 1);
  };

  const handleMinusClick = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

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

  const specialData = categoryCSV.filter((item) => {
    return (
      item.category_parent &&
      (item.category_parent.includes("101") ||
        item.category_parent.includes("107"))
    );
  });

  const handleButtonClick = (e, category_name) => {
    setCategoryName(category_name);
    setShow(true);
    const specialData2 = productCSV.filter((item) => {
      if (item.categories) {
        const categoriesWords = item.categories.split("/");
        return categoriesWords.some((word) => category_name == word);
      }
      return false;
    });
    setfilteredData(specialData2);
  };

  function modal_1(e, id) {
    setFinalData([]);
    let firstIndex = -1;
    let lastIndex = -1;
    for (let i = 0; i < productOption.length; i++) {
      if (productOption[i].productid === id && firstIndex === -1) {
        firstIndex = i;
      }
      if (productOption[i].productid === id) {
        lastIndex = i;
      }
    }
    if (firstIndex !== -1 && lastIndex !== -1) {
      const valuesBetween = [];
      for (let i = firstIndex; i <= lastIndex; i++) {
        if (
          productOption[i].productid === id ||
          productOption[i].productid === ""
        ) {
          valuesBetween.push(productOption[i]);
        }
      }
      const separatedArrays = [];
      let currentArray = [];
      valuesBetween.forEach((item) => {
        if (item.optionid !== "") {
          if (currentArray.length > 0) {
            separatedArrays.push([...currentArray]);
            currentArray = [];
          }
        }
        currentArray.push(item);
      });
      if (currentArray.length > 0) {
        separatedArrays.push([...currentArray]);
      }
      setFinalData(separatedArrays);
    } else {
      console.log("No suitable data found in the data array with '83' cateId.");
    }

    setShow2(true);
    setShow(false);
    setCategoryName2(id);
    const specialData3 = filteredData.filter((item) => {
      if (item.id == id) {
        return item;
      }
    });
    setfilteredData2(specialData3);
  }

  const calculateTotalPrice = () => {
    let basePrices = filteredData2.map((item) => item.price);
    setBasePrice(basePrices);
    const priceCabling = parseFloat(basePrices) * count;
    setPriceCab(priceCabling);
  };

  const handleCablingData = () => {
    setShow2(false);
    const totalPriceForItem = basePrice * count;
    const newItem = {
      id: categoryName2,
      name: filteredData2[0]?.name || "Unknown",
      quantity: count,
      pricePerItem: basePrice,
      totalPriceForItem: totalPriceForItem,
    };
    dispatch(setSelectedSpecial(newItem));
    setCartItems((prevCartItems) => [...prevCartItems, newItem]);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + totalPriceForItem);
    setCount(1);
    setPriceCab(0);
  };

  const handleDelete = (index) => {
    dispatch(deleteSpecial(index));
    const updatedCartItems = [...cartItems];
    const itemToRemove = updatedCartItems[index];
    const newTotalPrice = totalPrice - itemToRemove.totalPriceForItem;
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    setTotalPrice(newTotalPrice);
  };

  const handleNext = () => {
    navigate("/cabling");
  };

  // Custom Model

  const [showCustom, setShowCustom] = useState(false);
  const handleCloseCustom = () => setShowCustom(false);
  const handleShowCustom = () => setShowCustom(true);

  const validationSchema = Yup.object().shape({
    customQuantity: Yup.number().required("Please Enter Quantity"),
    customSKU: Yup.string().required("Please Enter SKU"),
    customDescription: Yup.string().required("Please Enter Some Description"),
    customCost: Yup.number().required("Enter Your Cost"),
  });

  const formik = useFormik({
    initialValues: {
      customQuantity: "",
      customSKU: "",
      customDescription: "",
      customCost: "",
    },
    validationSchema,
    onSubmit: (values,{ resetForm }) => {
      console.log("Form submitted:", values);
      resetForm();
      handleCloseCustom();
    },
  });

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
                Special Items{" "}
                <span className="fst-italic fs-6">(Category)</span>
              </h2>
            </Col>
            <Col className="" style={{ backgroundColor: "" }}>
              <Row>
                <Col className="text-end">
                  Number of Cameras:&nbsp;
                  <span className="fw-bold">{selectedCameraNumber}</span>
                </Col>
              </Row>
              <Row>
                <Col className="text-end">
                  Number of Drops:&nbsp;
                  <span className="fw-bold">{}</span>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="my-4" style={{ backgroundColor: "" }}>
            {specialData.map((val) => {
              return (
                <>
                  <Col
                    md={4}
                    className="mb-4"
                    onClick={(e) => handleButtonClick(e, val.category_name)}
                  >
                    <Card style={{ width: "", margin: "" }}>
                      <Card.Body>
                        <Row>
                          <Col xs={7}>
                            <Card.Img
                              variant="top"
                              height={150}
                              src={val.iconimage ? val.iconimage : noImage}
                            />
                          </Col>
                          <Col
                            xs={5}
                            className=" align-items-center justify-content-center fw-bold"
                          >
                            <Card.Text className="fs-6">
                              {val.category_name}
                            </Card.Text>
                            <p className="camera_category_title">
                              {" "}
                              {val.category_title
                                ? val.category_title
                                : "No Category Found"}{" "}
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
                              Description :{" "}
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
                              src={val.thumbnail}
                            />
                          </Row>
                          <Row className="my-2">
                            <Col>
                              {" "}
                              <Card.Img
                                variant="top"
                                height={40}
                                className="camera_thumbnail_img"
                                src={val.image1}
                                // onClick={() => { setThumbimg({ img1: val.image1 }) }}
                              />
                            </Col>
                            <Col>
                              {" "}
                              <Card.Img
                                variant="top"
                                height={40}
                                className="camera_thumbnail_img"
                                src={val.image2}
                                // onClick={() => { setThumbimg({ img1: val.image2 }) }}
                              />
                            </Col>
                            <Col>
                              {" "}
                              <Card.Img
                                variant="top"
                                height={40}
                                className="camera_thumbnail_img"
                                src={val.image3}
                                // onClick={() => { setThumbimg({ img1: val.image3 }) }}
                              />
                            </Col>
                            <Col>
                              {" "}
                              <Card.Img
                                variant="top"
                                height={40}
                                className="camera_thumbnail_img"
                                src={val.image4}
                                // onClick={() => { setThumbimg({ img1: val.image4 }) }}
                              />
                            </Col>
                          </Row>
                          {/* Final Price */}
                          <Row className="mt-5">
                            <div className="w-100 d-flex align-items-start">
                              <Button
                                variant="dark"
                                onClick={calculateTotalPrice}
                              >
                                Final Price
                              </Button>
                            </div>
                            <div className="w-100 my-1 d-flex align-items-start">
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
                                        {priceCab ? (
                                          <b>$ {priceCab}</b>
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
                        </Col>
                        <Col md={7}>
                          <p className="fst-italic">
                            {" "}
                            <span className="fw-bold">
                              Description 22:{" "}
                            </span>{" "}
                            {val.name}
                          </p>

                          {finalData.map((item, index) => {
                            return (
                              <>
                                <Form.Select
                                  key={index}
                                  aria-label="Default select example"
                                  className="mb-3"
                                >
                                  <option value={2}>
                                    {item[0].featurecaption}
                                  </option>
                                  {item.map((option, optionIndex) => (
                                    <option
                                      key={optionIndex}
                                      value={option.value}
                                    >
                                      {option.featurename}
                                    </option>
                                  ))}
                                </Form.Select>
                              </>
                            );
                          })}
                          <div
                            className="d-flex align-items-end justify-content-end mt-5"
                            style={{ backgroundColor: "" }}
                          >
                            <Button variant="dark" onClick={handlePlusClick}>
                              +
                            </Button>
                            <h6 className="mx-3">{count}</h6>
                            <Button variant="dark" onClick={handleMinusClick}>
                              -
                            </Button>
                          </div>
                        </Col>
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
                  disabled={priceCab === 0}
                >
                  Add
                </Button>
              </div>
            </Modal.Footer>
          </Modal>

          {/* Custom Model */}
          <Modal show={showCustom} onHide={handleCloseCustom}>
            <Modal.Header closeButton>
              <Modal.Title>Custom Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={formik.handleSubmit}>
      {/* Quantity */}
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Quantity :</Form.Label>
        <Form.Control
          type="number"
          placeholder="SKU"
          name="customQuantity"
          value={formik.values.customQuantity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.customQuantity && formik.errors.customQuantity && (
              <div className="text-danger">{formik.errors.customQuantity}</div>
              )}
      </Form.Group>

      {/* SKU */}
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>SKU :</Form.Label>
        <Form.Control
          type="text"
          placeholder="SKU"
          name="customSKU"
          value={formik.values.customSKU}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
           {formik.touched.customSKU && formik.errors.customSKU && (
              <div className="text-danger">{formik.errors.customSKU}</div>
              )}
      </Form.Group>

      {/* Description */}
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description :</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="SKU"
          name="customDescription"
          value={formik.values.customDescription}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
         {formik.touched.customDescription && formik.errors.customDescription && (
              <div className="text-danger">{formik.errors.customDescription}</div>
              )}
      </Form.Group>

      {/* Cost */}
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Cost :</Form.Label>
        <Form.Control
          type="number"
          placeholder="$"
          name="customCost"
          value={formik.values.customCost}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
           {formik.touched.customCost && formik.errors.customCost && (
              <div className="text-danger">{formik.errors.customCost}</div>
              )}
      </Form.Group>
      <Button variant="dark" type="submit">
        Add
      </Button>
    </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="dark" onClick={handleCloseCustom}>
                Back
              </Button>
            
            </Modal.Footer>
          </Modal>

          {/* Custom Model */}

          <Row className="my-4" style={{ padding: "8px" }}>
            <Col>
              <h5 className="fw-bold">Add to Cart: </h5>

              <div className="table-border">
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product Name: </th>
                      <th>QTY: </th>
                      <th>Product Price: </th>
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
                        <td>$ {item.pricePerItem}</td>
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

          <Row
            className="my-4 d-flex justify-content-between"
            style={{ backgroundColor: "" }}
          >
            <Col className="">
              <Button variant="dark" onClick={handleShowCustom}>
                Custom
              </Button>
            </Col>
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

export default Special;
