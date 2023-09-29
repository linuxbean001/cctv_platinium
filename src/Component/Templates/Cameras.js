import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Papa from "papaparse";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import noImage from "../../no_Image.jpg";
import Form from "react-bootstrap/Form";
import {
  setSelectedCamera,
  deleteCamera,
  setFinalData,
} from "../../../src/app/features/counter/counterSlice";
import { useSelector, useDispatch } from "react-redux";

function Cameras(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedCameraNumber = useSelector(
    (state) => state.counter1.totalCamera
  );
  const [categoryCSV, setCategoryCSV] = useState([]);
  const [productCSV, setProductCSV] = useState([]);
  const [productOption, setProductOptionCSV] = useState([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [shows, setShows] = useState(false);
  const [count, setCount] = useState(1);
  const [thumbimg, setThumbimg] = useState([]);
  const [totalPriceInTable, setTotalPriceInTable] = useState(0);
  const [filteredData, setfilteredData] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [filteredData2, setfilteredData2] = useState([]);
  const [categoryName2, setCategoryName2] = useState([]);
  const [finalDatas, setFinalDatas] = useState([]);
  const [dataProduct, setdataProduct] = useState({});
  const [finalNewState, setFinalNewState] = useState({});
  const [finalNewState2, setFinalNewState2] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [priceList, setPriceList] = useState(0);
  const [mergedState, setMergedState] = useState({});
  const [bracketNumber, setBracketNumber] = useState("");
  const [totalBracket, setTotalBracket] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const countCamera = useSelector((state) => state.counter1.selectedCamera);
  const tableData = countCamera;

  React.useEffect(() => {
    let totalCty = 0;
    tableData.forEach((item) => {
      totalCty += parseInt(item.Camera_Quantity, 10);
    });
    setTotalQty(totalCty);
  }, [tableData]);

  // React.useEffect(() => {
  //   let totalBkt = 0;
  //   tableData.forEach((item) => {
  //     totalBkt += parseInt(item.Bracket_Selected, 10);
  //   });
  //   setTotalBracket(totalBkt);
  // }, [tableData]);

  React.useEffect(() => {
    let totalBkt = 0;
    tableData.forEach((item) => {
      const bracketSelected = parseInt(item.Bracket_Selected, 10);
      if (!isNaN(bracketSelected)) {
        totalBkt += bracketSelected;
      }
    });
    setTotalBracket(totalBkt);
  }, [tableData]);

  const handleClose2 = () => setShows(false);
  const handleShow2 = () => {
    if (selectedCameraNumber > totalQty) {
      setShows(true);
    } else {
      navigate("/Poe-switch");
    }
  };

  React.useEffect(() => {
    let total = 0;
    tableData.forEach((item) => {
      total += parseFloat(item.Camera_Final_Price);
    });
    setTotalPriceInTable(total);
  }, [tableData]);

  const handleBracketChange = (event) => {
    setBracketNumber(event.target.value);
  };

  const updateMergedState = () => {
    setMergedState({
      ...finalNewState,
      ...finalNewState2,
    });
  };

  const resetState = () => {
    setBracketNumber("");
    setFinalNewState({});
    setFinalNewState2({});
    setTotalPrice(0);
    setIsDisabled(false);
    setPriceList(0);
    setCount(1);
  };

  React.useEffect(() => {
    updateMergedState();
    if (!show2) {
      resetState();
    }
  }, [show2]);

  React.useEffect(() => {
    updateMergedState();
  }, [finalNewState, finalNewState2]);

  function modal_3() {
    dispatch(setSelectedCamera(mergedState));
    dispatch(setFinalData(mergedState));
    setShow2(false);
  }

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
      } catch (error) {
        console.error("Error parsing CSV files:", error);
      }
    };
    parseCSVFiles2();
  }, []);

  const handleButtonClick = (e, category_name) => {
    setCategoryName(category_name);
    setShow(true);

    const cameraData2 = productCSV.filter((item) => {
      if (item.categories) {
        const categoriesWords = item.categories.split("/");
        return categoriesWords.some((word) => category_name == word);
      }
      return false;
    });
    setfilteredData(cameraData2);
  };

  function modal_1(e, item, id) {
    let firstIndex = -1;
    let lastIndex = -1;
    // Find the index of the first '83' value and the index of the last '83' value
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
      setFinalDatas(separatedArrays);
    } else {
      console.log("No suitable data found in the data array with '83' cateId.");
    }
    setShow2(true);
    setShow(false);
    setCategoryName2(id);
    const cameraData3 = filteredData.filter((item) => {
      if (item.id == id) {
        return item;
      }
    });
    setfilteredData2(cameraData3);

    setdataProduct(item);
  }
  //****************************** Modal_1 ****************************//

  const cameraData = categoryCSV.filter((item) => {
    return item.category_parent && item.category_parent.includes("45");
  });

  React.useEffect(() => {
    // storing data
    setFinalNewState({
      Camera_Name: dataProduct.id,
      Camera_Base_Price: dataProduct.price,
      Camera_Final_Price: priceList,
      Camera_Quantity: count,
      Bracket_Selected: bracketNumber,
    });
  }, [dataProduct.id, dataProduct.price, count, priceList, bracketNumber]);

  //***** Below Code is responsible for filling finalNewState-2 *******//
  React.useEffect(() => {
    const initialSelectedOptions = {};
    finalDatas.forEach((item) => {
      if (item.length > 0) {
        const firstOption = item[0];
        initialSelectedOptions[firstOption.featurecaption] =
          firstOption.featurename;
      }
    });
    setFinalNewState2(initialSelectedOptions);
  }, [finalDatas]);
  //***** Below Code is responsible for filling finalNewState-2 *******//

  //************************** HandleChange ***************************//
  function handleSelectChange(e) {
    const { name, value } = e.target;
    const selectedOption = finalDatas
      .flat()
      .find((option) => option.featurename === value);

    //
    const prevOptionPrice =
      finalNewState2[name] &&
      finalDatas
        .flat()
        .find((option) => option.featurename === finalNewState2[name])
        ? parseFloat(
            finalDatas
              .flat()
              .find((option) => option.featurename === finalNewState2[name])
              .featureprice
          )
        : 0;
    // Calculate the price difference between the new and old option
    const optionPrice = selectedOption
      ? parseFloat(selectedOption.featureprice)
      : 0;
    const priceDifference = optionPrice - prevOptionPrice;

    setTotalPrice((prevTotalPrice) => prevTotalPrice + priceDifference);
    setFinalNewState2((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  //************************** HandleChange ***************************//

  //*************** Increasing & Decrease Count Value *****************//
  const handlePlusClick = () => {
    setCount(count + 1);
  };

  const handleMinusClick = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  //*************** Increasing & Decrease Count Value *****************//

  //************************ calculate price **************************//
  const calculateTotalPrice = () => {
    setIsDisabled(true);
    const newTotalPrice = parseInt(dataProduct.price) + parseInt(totalPrice);
    setPriceList(newTotalPrice * count);
  };
  //************************ calculate price **************************//

  //************************* Delete Camera ***************************//
  const deleteFromCamera = (index) => {
    dispatch(deleteCamera(index));
  };
  //************************* Delete Camera ***************************//

  return (
    <>
      <Container fluid className="my-4" style={{ backgroundColor: "" }}>
        <Container>
          <Row style={{ backgroundColor: "" }}>
            <Col style={{ backgroundColor: "" }}>
              <h2>
                Camera <span className="fst-italic fs-6">(Category)</span>
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
                  <Link to="/">
                    <h6>
                      Edit here <span className="fw-bold"></span>
                    </h6>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Box */}
          <Row className="my-4" style={{ backgroundColor: "" }}>
            {cameraData.map((item) => {
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

          <Row className="my-4" style={{ padding: "8px" }}>
            <Col>
              <h5 className="fw-bold">Add to Cart: </h5>

              <div className="table-border">
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th> {/* Add a new column for the serial number */}
                      <th>Camera Selected:</th>
                      <th>QTY:</th>
                      <th>Brackets: </th>
                      <th>Total: </th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((val, index) => {
                      return (
                        <tr key={val}>
                          <td>{index + 1}</td> {/* Display the serial number */}
                          <td>{val.Camera_Name}</td>
                          <td>{val.Camera_Quantity}</td>
                          <td>
                            {" "}
                            {val.Bracket_Selected ? val.Bracket_Selected : 0}
                          </td>
                          <td>$ {val.Camera_Final_Price}</td>
                          <td>
                            {" "}
                            <Button
                              variant="dark"
                              onClick={() => deleteFromCamera(index)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                    {/* Final Section */}
                    <tr>
                      <th></th>
                      <td>
                        {" "}
                        <b>Total Price</b>{" "}
                      </td>
                      <td>{totalQty}</td>
                      <td>{totalBracket}</td>
                      <td>$ {totalPriceInTable}</td>
                      <td></td>
                    </tr>
                    {/* Final Section */}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>

          {/* Next Page Code */}
          <Row className="my-4" style={{ backgroundColor: "" }}>
            <Col className="d-flex justify-content-end">
              <Button variant="dark" onClick={handleShow2}>
                Next
              </Button>
            </Col>
          </Row>

          {/* Modal Code - 1 */}
          <Modal
            {...props}
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
                              Description :{" "}
                              {item.description
                                .split(" ")
                                .slice(0, 10)
                                .join(" ")}
                              ...
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

          {/* Modal-2 */}
          <Modal
            {...props}
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
                              src={thumbimg.img1}
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
                                onClick={() => {
                                  setThumbimg({ img1: val.image1 });
                                }}
                              />
                            </Col>
                            <Col>
                              {" "}
                              <Card.Img
                                variant="top"
                                height={40}
                                className="camera_thumbnail_img"
                                src={val.image2}
                                onClick={() => {
                                  setThumbimg({ img1: val.image2 });
                                }}
                              />
                            </Col>
                            <Col>
                              {" "}
                              <Card.Img
                                variant="top"
                                height={40}
                                className="camera_thumbnail_img"
                                src={val.image3}
                                onClick={() => {
                                  setThumbimg({ img1: val.image3 });
                                }}
                              />
                            </Col>
                            <Col>
                              {" "}
                              <Card.Img
                                variant="top"
                                height={40}
                                className="camera_thumbnail_img"
                                src={val.image4}
                                onClick={() => {
                                  setThumbimg({ img1: val.image4 });
                                }}
                              />
                            </Col>
                          </Row>

                          {/* Final Price */}
                          <Row className="tops">
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
                                        <b>$</b> {priceList}
                                      </th>
                                    </tr>
                                  </thead>
                                </Table>
                              </div>
                            </div>
                          </Row>
                          {/* Final Price */}
                        </Col>
                        <Col md={7}>
                          <p className="fst-italic">
                            {" "}
                            <span className="fw-bold">Description : </span>{" "}
                            {val.name}
                          </p>

                          {/* Add Dropdown */}

                          {finalDatas.map((item, index) => {
                            // if (item[0].featurecaption === "Mounting Bracket") {
                            //   return null;
                            // }

                            return (
                              <>
                                {/* <Form.Select key={index} aria-label="Default select example" className="mb-3">
                        <option value={2}>{item[0].featurecaption}</option>
                        {item.map((option, optionIndex) => (
                          <option key={optionIndex} value={option.value}>
                            {option.featurename}
                          </option>
                        ))}
                      </Form.Select> */}

                                <Form.Label>
                                  {item[0].featurecaption}
                                </Form.Label>
                                <Form.Select
                                  key={index}
                                  aria-label="Default select example"
                                  className="mb-3"
                                  name={item[0].featurecaption}
                                  value={
                                    finalNewState2[item[0].featurecaption] || ""
                                  }
                                  onChange={(e) => handleSelectChange(e)}
                                >
                                  {/* <option>Select a option</option> */}
                                  {item.map((option, optionIndex) => {
                                    return (
                                      <>
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
                                      </>
                                    );
                                  })}
                                </Form.Select>
                              </>
                            );
                          })}
                          <Form.Label>Mounting Bracket</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter a value"
                            value={bracketNumber}
                            onChange={handleBracketChange}
                          />
                          <div
                            className="d-flex align-items-end justify-content-end my-4"
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
                  onClick={modal_3}
                  disabled={priceList === 0}
                >
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
            show={show3}
            onHide={() => setShow3(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Warning ! </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>Less Brackets Than Camera !</Container>
            </Modal.Body>
            <Modal.Footer>
              <div className="w-100 my-4 d-flex align-items-end justify-content-between">
                <Button
                  className="mx-3"
                  variant="dark"
                  onClick={() => setShow3(false)}
                >
                  Go Back
                </Button>
                <Button variant="dark" onClick={() => setShow3(false)}>
                  Continue Anyways
                </Button>
              </div>
            </Modal.Footer>
          </Modal>

          {/***************************** Warning Modal(27sep) ****************************/}
          <Modal show={shows} onHide={handleClose2}>
            <Modal.Header closeButton>
              <Modal.Title>
                <h6>
                  {" "}
                  <span style={{ color: "red" }}>Warning!</span>&nbsp; Number of
                  cameras is not equal to quantity of cameras.
                </h6>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure want to continue</Modal.Body>
            <Modal.Footer>
              <Button variant="dark" onClick={handleClose2}>
                Go Back
              </Button>
              <Button variant="dark" onClick={() => navigate("/Poe-switch")}>
                Continue Anyways
              </Button>
            </Modal.Footer>
          </Modal>
          {/***************************** Warning Modal(27sep) ****************************/}
        </Container>
      </Container>
    </>
  );
}

export default Cameras;
