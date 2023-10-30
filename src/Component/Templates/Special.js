import React, { useEffect, useState } from "react";
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
  setSelectedNumberOfDrops,
  setCustomData,
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

  //
  const [dropdownData, setDropDownData] = useState([]);
  const [finalNewState2, setFinalNewState2] = useState({});
  const [dropDownItemPrice, setDropDownItemPrice] = useState(0);

  // Number of Drops

  const [drops, setDrops] = useState(""); // <30FPS
  const [drops2, setDrops2] = useState(""); // stored only numbers i.e. 30
  const [drops3, setDrops3] = useState(""); // Total number of Drops with Formula
  const [drops4, setDrops4] = useState(""); // Total number of Drops with Formula


  // Today
  const [basePrice2, setBasePrice2] = useState(0);
  const [displayPrice, setDisplayPrice] = useState(0);
  const [dropdownFirstValue, setdropdownFirstValue] = useState(0);
  const [dropDownChangePrice, setDropDownChangePrice] = useState(0);

  const navigate = useNavigate();
  const selectedCameraNumber = useSelector(
    (state) => state.counter1.totalCamera
  );
  const totalDrops = useSelector(
    (state) => state.counter1.selectedNumberOfDrops
  );

  const countSpecial = useSelector((state) => state.counter1.selectedSpecial);
  //
  const customDataDetails = useSelector((state) => state.counter1.customData);

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

  const handleButtonClick = (e, val, category_name) => {
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

  // Setting Number of Drops Start
  React.useEffect(() => {
    const dropNumbers = drops.match(/\d+/);
    if (dropNumbers) {
      setDrops2(dropNumbers[0]);
    } else {
      console.log("No numbers found in the string.");
    }
  }, [drops]);

  // console.log('drops2 :', drops2)   // It will show '30'

  // Setting Number of Drops Ends

  function modal_1(e, item, id) {
    setBasePrice2(item.price);
    // Code Starts
    let result = [];
    let currentArray = [];
    for (let i = 0; i < productOption.length; i++) {
      const item = productOption[i];

      if (
        item.productid === id ||
        (currentArray.length > 0 && item.productid === "")
      ) {
        currentArray.push(item);
      } else if (currentArray.length > 0) {
        result = currentArray;
        currentArray = [];
      }
    }
    if (currentArray.length > 0) {
      result = [...currentArray];
    }

    const result1 = [];
    let currentArray1 = [];

    for (let i = 0; i < result.length; i++) {
      const item = result[i];

      if (item.productid === id) {
        if (currentArray1.length > 0) {
          result1.push([...currentArray1]);
          currentArray1 = [];
        }
        currentArray1.push(item);
      } else if (currentArray1.length > 0 || i === result.length - 1) {
        currentArray1.push(item);
      }
    }

    if (currentArray1.length > 0) {
      result1.push([...currentArray1]);
    }
    // Number of Drops (<30FPS) :
    if (item.extra_field_2) {
      console.log("drops are :", item.extra_field_2);
      setDrops(item.extra_field_2);
      setDrops4(item.extra_field_2)
    } else {
      console.log("No drops found");
      setDrops4(0)
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
    const sumDefault = [];
    result1 &&
      result1.map((item, index) => {
        sumDefault.push(Number(item[0].featureprice));
      });
    const sum = sumDefault.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    let basePrices = specialData3.map((item) => item.price);
    const priceCabling = parseFloat(basePrices) * count + sum; // 245 Price
    setDropDownData(result1);

    setdropdownFirstValue(sumDefault);

    // Code Ends
  }

  React.useEffect(() => {
    setDisplayPrice((Number(basePrice2) + Number(dropdownFirstValue)) * count);
  }, [basePrice2, count, dropdownFirstValue]);

  function handleSelectChange(e) {
    const { name, value } = e.target;
    const selectedOption = dropdownData
      .flat()
      .find((option) => option.featurename === value);

    setdropdownFirstValue(selectedOption.featureprice);

    const prevOptionPrice =
      finalNewState2[name] &&
      dropdownData
        .flat()
        .find((option) => option.featurename === finalNewState2[name])
        ? parseFloat(
            dropdownData
              .flat()
              .find((option) => option.featurename === finalNewState2[name])
              .featureprice
          )
        : 0;

    const optionPrice = selectedOption
      ? parseFloat(selectedOption.featureprice)
      : 0;
    const priceDifference = optionPrice - prevOptionPrice;
    setDropDownItemPrice((prevTotalPrice) => prevTotalPrice + priceDifference);

    setFinalNewState2((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // const finalClickButton = () => {
  //   // Final Button Click
  //   let basePrices = filteredData2.map((item) => item.price);
  //   setBasePrice(basePrices);

  //   const priceCabling = parseFloat(basePrices) * count;
  //   setPriceCab(priceCabling);

  //   // const finalPriceWithDrops = selectedCameraNumber + drops2 * count;
  //   // console.log('selectedCameraNumber',count)
  //   // setDrops3(finalPriceWithDrops);
  //   // dispatch(setSelectedNumberOfDrops(finalPriceWithDrops));
  // };
  // console.log('drops3', drops3)

  // selectedCameraNumber
  const addButton = () => {
    setShow2(false);
    const totalPriceForItem = basePrice2 * count;
    const newItem = {
      id: categoryName2,
      name: filteredData2[0]?.name || "Unknown",
      quantity: count,
      pricePerItem: basePrice2,
      totalPriceForItem: displayPrice,
    };

    //
    const finalPriceWithDrops = selectedCameraNumber + drops2 * count;
    setDrops3(finalPriceWithDrops);
    dispatch(setSelectedNumberOfDrops(finalPriceWithDrops));
    //
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
    console.log("total price :", totalPrice);
  };

  const calculateTotalPrice = () => {
    let totalPrice3 = 0;
    cartItems.forEach((val) => {
      totalPrice3 += parseFloat(val.totalPriceForItem);
    });
    return totalPrice3.toFixed(2);
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
    onSubmit: (values, { resetForm }) => {
      console.log("Form submitted:", values);
      dispatch(setCustomData(values));

      resetForm();
      handleCloseCustom();
    },
  });

  //
  React.useEffect(() => {
    const initialSelectedOptions = {};
    dropdownData.forEach((item) => {
      if (item.length > 0) {
        const firstOption = item[0];
        initialSelectedOptions[firstOption.featurecaption] =
          firstOption.featurename;
      }
    });
    setFinalNewState2(initialSelectedOptions);
  }, [dropdownData]);

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
                <Row className="mb-2">
                  <Col className="text-end">
                    Number of Drops :{" "}
                    <span className="fw-bold">{totalDrops}</span>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col className="text-end" style={{color:'red'}}>
                    Number of Drops :{" "}
                    <span className="fw-bold">{drops4} </span>
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* Box-Click */}
            <Row className="my-4" style={{ backgroundColor: "" }}>
              {specialData.reverse().map((val) => {
                return (
                  <>
                    <Col
                      md={4}
                      className="mb-4"
                      onClick={(e) =>
                        handleButtonClick(e, val, val.category_name)
                      }
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
                          onClick={(e) => modal_1(e, item, item.id)}
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
                              <div className="w-100 my-1 d-flex align-items-start">
                                <div className="text">
                                  {/* <h2 style={{color:'red'}}>$ {displayPrice.toFixed(2)}</h2> */}

                                  <Table
                                    striped
                                    bordered
                                    hover
                                    responsive
                                    style={{ width: "14rem" }}
                                  >
                                    <thead>
                                      <tr>
                                        <th>{displayPrice.toFixed(2)}</th>
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
                                Description:{" "}
                              </span>{" "}
                              {val.name}
                            </p>

                            {/* Code */}
                            {dropdownData.map((item, index) => {
                              return (
                                <>
                                  <Form.Label>
                                    {" "}
                                    {item[0].featurecaption}
                                  </Form.Label>
                                  <Form.Select
                                    key={index}
                                    aria-label="Default select example"
                                    className="mb-3"
                                    name={item[0].featurecaption}
                                    value={
                                      finalNewState2[item[0].featurecaption] ||
                                      ""
                                    }
                                    onChange={(e) => handleSelectChange(e)}
                                  >
                                    {item.map((option, optionIndex) => {
                                      return (
                                        <option
                                          name={option.featurecaption}
                                          key={optionIndex}
                                          value={option.featurename}
                                        >
                                          {option.featurename +
                                            " " +
                                            "  " +
                                            "$ " +
                                            option.featureprice}
                                        </option>
                                      );
                                    })}
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
                  <Button variant="dark" onClick={addButton}>
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
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Quantity :</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Quantity"
                      name="customQuantity"
                      value={formik.values.customQuantity}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.customQuantity &&
                      formik.errors.customQuantity && (
                        <div className="text-danger">
                          {formik.errors.customQuantity}
                        </div>
                      )}
                  </Form.Group>

                  {/* SKU */}
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
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
                      <div className="text-danger">
                        {formik.errors.customSKU}
                      </div>
                    )}
                  </Form.Group>

                  {/* Description */}
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Description :</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter Some Description"
                      name="customDescription"
                      value={formik.values.customDescription}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.customDescription &&
                      formik.errors.customDescription && (
                        <div className="text-danger">
                          {formik.errors.customDescription}
                        </div>
                      )}
                  </Form.Group>

                  {/* Cost */}
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
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
                      <div className="text-danger">
                        {formik.errors.customCost}
                      </div>
                    )}
                  </Form.Group>
                  <Row>
                    <Col className="d-flex flex-row-reverse justify-content-between">
                      <Button variant="dark" type="submit">
                        Add Custom Data
                      </Button>
                      <Button variant="dark" onClick={handleCloseCustom}>
                        Back
                      </Button>
                    </Col>
                    <p className="mt-2 fst-italic">
                      Custom Data will be added in Table{" "}
                    </p>
                  </Row>
                </Form>
              </Modal.Body>
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
                        <td>$ {calculateTotalPrice()}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>

            {/* Custom Model Table*/}

            <Row className="my-4" style={{ padding: "8px" }}>
              <Col>
                <h5 className="fw-bold">Custom Data: </h5>
              </Col>

              <div className="table-border">
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Cost : </th>
                      <th>SKU:</th>
                      <th>Dsecription: </th>
                      <th>Quantity: </th>
                    </tr>
                  </thead>
                  <tbody>
                    <td>1</td>
                    <td>{customDataDetails.customCost}</td>
                    <td>{customDataDetails.customSKU}</td>
                    <td>{customDataDetails.customDescription}</td>
                    <td>{customDataDetails.customQuantity}</td>
                    {/* <td>
                            <Button
                              variant="dark"
                            >
                              Delete
                            </Button>
                          </td> */}
                  </tbody>
                </Table>
              </div>
            </Row>

            {/* Custom  and Next Button */}

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
