import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import "./index.css";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedNVR } from "../../../app/features/counter/counterSlice";

//Modal Starts Here
function MyVerticallyCenteredModal(props) {

  const [finalNewState, setFinalNewState] = useState({}); // state-1
  const [finalNewState2, setFinalNewState2] = useState({}); // state-2
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0); // 1+2+3+4 = 10 (child items)
  const [finalPrice, setFinalPrice] = useState(0);

  //------------- Changes Finat Total Card Price -----------------//
  const [priceData, setPriceData] = useState(0);
  const [priceList, setPriceList] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  //------------- Chnages Finat Total Card Price -----------------//

  // Passing State-1
  React.useEffect(() => {
    props.onTestChange1(finalNewState);
  }, [finalNewState]);

  // Passing State-2
  React.useEffect(() => {
    props.onTestChange(finalNewState2);
  }, [finalNewState2]);

  React.useEffect(() => {
    setFinalNewState({
      NVR_Name: props.dataforProduct.id,
      NVR_Base_Price: props.mainPrice,
      NVR_Final_Price: "",
      NVR_Quantity: count,
      cart_final_price: priceList,
    });
  }, [props.dataforProduct.id, props.mainPrice, count, priceList]);

  const resetForm = () => {
    setFinalNewState({});
    setFinalNewState2({});
    setCount(1);
    setTotalPrice(0);
    setPriceData(0);
    setPriceList(0);
  };

  useEffect(() => {
    if (!props.show) {
      // Modal is closed, reset the form
      resetForm();
    }
  }, [props.show]);

  useEffect(() => {
    const initialSelectedOptions = {};
    props.finalData.forEach((item) => {
      if (item.length > 0) {
        const firstOption = item[0];
        initialSelectedOptions[firstOption.featurecaption] =
          firstOption.featurename;
      }
    });
    setFinalNewState2(initialSelectedOptions);
  }, [props.finalData]);


  function handleSelectChange(e) {
    const { name, value } = e.target;

    const selectedOption = props.finalData
      .flat()
      .find((option) => option.featurename === value);

    // Get the previous option's price
    const prevOptionPrice =
      finalNewState2[name] &&
      props.finalData
        .flat()
        .find((option) => option.featurename === finalNewState2[name])
        ? parseFloat(
            props.finalData
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

  // --------- Changes Code ---------//
  const handlePlusClick = () => {
    setCount(count + 1);
  };

  const handleMinusClick = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };



  const calculateTotalPrice = () => {
    setIsDisabled(true);
    const newTotalPrice =
      parseInt(props.dataforProduct.price) + parseInt(totalPrice);
      console.log('new price', newTotalPrice)

      setPriceData(newTotalPrice);

    if (priceData) {
      setPriceList(priceData * count);
    }
  };




  // Adding in Redux Store

  function addNvrQuantity() {
      dispatch(setSelectedNVR(props.mergedState));
      props.onHide(false); // Modal Close
      setPriceList(0);
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.dataforProduct.id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col md={4}>
              <Row>
                <Card.Img
                  variant="top"
                  height={150}
                  src={props.dataforProduct.thumbnail}
                />
              </Row>
              <Row className="my-2">
                <Col>
                  <Card.Img
                    variant="top"
                    height={50}
                    className="camera_thumbnail_img"
                    src={props.dataforProduct.image1}
                  />
                </Col>
                <Col>
                  <Card.Img
                    variant="top"
                    height={50}
                    className="camera_thumbnail_img"
                    src={props.dataforProduct.image2}
                  />
                </Col>
                <Col>
                  <Card.Img
                    variant="top"
                    height={50}
                    className="camera_thumbnail_img"
                    src={props.dataforProduct.image3}
                  />
                </Col>
              </Row>
              {/*------------------- Chnages Today ------------------*/}
           
              {/* Final Price */}
              <Row className="tops">
                <div className="w-100 d-flex align-items-start">
                  <Button variant="dark" onClick={calculateTotalPrice}>
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

              {/*------------------- Chnages Today ------------------*/}
            </Col>

            <Col md={8}>
              <p>
                Description:
                {props.dataforProduct.description
                  ? props.dataforProduct.description
                  : "No Description found"}
              </p>
              <p className="fw-bold">Choose Options :</p>
              {/* Options */}

              {/* Form Section */}
              {props.finalData.map((item, index) => {
                return (
                  <>
                    <Form.Label>{item[0].featurecaption}</Form.Label>
                    <Form.Select
                      key={index}
                      aria-label="Default select example"
                      className="mb-3"
                      name={item[0].featurecaption}
                      // value={props.formDataState[item[0].featurecaption] || ""}
                      value={finalNewState2[item[0].featurecaption] || ""}
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
              {/* Form Section */}
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
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <div className="w-100 my-4 d-flex align-items-end justify-content-between">
          <Button
            className="mx-3"
            variant="dark"
            onClick={() => props.onHide(false)}
          >
            Back
          </Button>
          <Button variant="dark" onClick={addNvrQuantity}>
            Add
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
//Modal Ends Here

function Nvr(props) {
  const [formData1, setFormData1] = useState({}); // Receivng value from Modal State
  const [formData2, setFormData2] = React.useState({}); // Receiving value from Modal State
  const [mergedState, setMergedState] = useState({});
  const countCamera = useSelector((state) => state.counter1.selectedNVR);
  const navigate = useNavigate();
  const [mainPrice, setMainPrice] = useState(0);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState([]);
  const [productCSV, setProductCSV] = useState([]); // product csv data
  const [produtOption, setProductOptionCSV] = useState([]); // product_option csv data
  const [addCart, setAddCart] = useState([]);
  const [recorderFilter, setRecorderFilter] = useState([]);
  const [dataforProduct, setdataForProduct] = useState([]);
  const [idforOptions, setIdforOptions] = useState([]);
  const [extra, setExtra] = useState([]);
  const [finalData, setFinalData] = useState([]);
  // Warning Modals state
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);


  // Merging Start

  const updateMergedState = () => {
    setMergedState({
      ...formData1,
      ...formData2,
    });
  };

  // Everytime Product added, it'll console the value (Just for console)

  useEffect(() => {
    // console.log(countCamera);
  }, [countCamera]);

  // Ends

  const tableData = countCamera;

  useEffect(() => {
    updateMergedState();
  }, [formData1, formData2]);

  // Merging Done

  React.useEffect(() => {
    const parseCSVFiles = async () => {
      try {
        const productData = await fetch("assets/CSVs/products.csv");
        const productOptionData = await fetch(
          "assets/CSVs/products_options.csv"
        );
        const productArray = await productData.text();
        const productArray2 = await productOptionData.text();
        const products = Papa.parse(productArray, { header: true }).data;
        const products2 = Papa.parse(productArray2, { header: true }).data;
        setProductCSV(products); // product csv data
        setProductOptionCSV(products2); // product_options data
      } catch (error) {
        console.error("Error parsing CSV files:", error);
      }
    };
    parseCSVFiles();
  }, []);

  const handleTestChange = (newValue) => {
    setFormData2(newValue);
  };

  const handleTestChange1 = (newValue) => {
    setFormData1(newValue);
  };

  // useEffect(() => {
  //   dispatch(setSelectedNVR(mergedState));
  // }, [dispatch, mergedState]);

  // It'll search for NVR from ProductCSV (only from column "id") and Sending Filter Data in a state
  const recorderData = productCSV.filter((item) => {
    return item.id && item.id.includes("NVR");
  });

  // Data coming from Product_Option csv below and apply a filter condition

  const recorderData2 = produtOption.filter((item) => {
    return item.productid && item.productid.includes("NVR");
  });

  // Box Button Click
  const handleButtonClick = (e, val, id) => {
    let firstIndex = -1;
    let lastIndex = -1;
    // Find the index of the first '83' value and the index of the last '83' value
    for (let i = 0; i < produtOption.length; i++) {
      if (produtOption[i].productid === id && firstIndex === -1) {
        firstIndex = i;
      }
      if (produtOption[i].productid === id) {
        lastIndex = i;
      }
    }
    if (firstIndex !== -1 && lastIndex !== -1) {
      const valuesBetween = [];
      for (let i = firstIndex; i <= lastIndex; i++) {
        if (
          produtOption[i].productid === id ||
          produtOption[i].productid === ""
        ) {
          valuesBetween.push(produtOption[i]);
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

    setIdforOptions(id);
    setModalShow(true);
    setRecorderFilter(recorderData);
    setdataForProduct({
      id: val.id,
      image1: val.image1,
      image2: val.image2,
      image3: val.image3,
      thumbnail: val.thumbnail,
      description: val.description,
      price: val.price,
    });
    setExtra(isIdInRecorderData2);
  };

  const isIdInRecorderData2 = recorderData2.filter((item) => {
    if (item.productid == idforOptions) {
      return idforOptions.includes(item.productid);
    }
  });

  return (
    <>
      <Container fluid className="my-4" style={{ backgroundColor: "" }}>
        <Container>
          <Row style={{ backgroundColor: "" }}>
            <Col style={{ backgroundColor: "" }}>
              <h2>
                NVR Recorders
                <span className="fst-italic fs-6">(Category)</span>
              </h2>
            </Col>
            {/* Right */}
            <Col className="" style={{ backgroundColor: "" }}>
              <Row>
                <Col className="text-end">
                  Number of Cameras:
                  {/* <span className="fw-bold">{countCamera.totalCamera}</span> */}
                  <span className="fw-bold">5</span>
                </Col>
              </Row>
              <Row>
                <Col className="text-end">
                  Number of Options:
                  {/* <span className="fw-bold">{countCamera.totalOptions}</span> */}
                  <span className="fw-bold">3</span>
                </Col>
              </Row>
              <Row>
                <Col className="text-end">
                  <h6>
                    Number of Licenses :
                    {/* <span className="fw-bold">{countCamera.totalCamera}</span> */}
                    <span className="fw-bold">5</span>
                  </h6>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Box Row */}
          <Row className="my-4">
            {recorderData.map((val) => {
              return (
                <>
                  <Col
                    md={4}
                    className="nvr_col my-3"
                    onClick={(e) => {
                      handleButtonClick(e, val, val.id);
                      setMainPrice(val.price);
                    }}
                  >
                    <Card style={{ width: "", margin: "" }}>
                      <Card.Body>
                        <Card.Title className="fw-bold">
                          SKU : {val.id}
                        </Card.Title>
                        <Card.Text> Description : {val.name}</Card.Text>
                        <Row>
                          <Col xs={8}>
                            <Card.Img
                              variant="top"
                              height={150}
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

            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              modalTitle={modalTitle}
              dataforProduct={dataforProduct}
              finalData={finalData}
              extra={extra}
              state={setAddCart}
              setRedux={props}
              mainPrice={mainPrice}
              formData1={setFormData1}
              formDataState={formData1}
              onTestChange1={handleTestChange}
              onTestChange={handleTestChange1}
              mergedState={mergedState}
            />
          </Row>
          {/* Table */}

          <Row className="my-4" style={{ padding: "8px" }}>
            <Col>
              <h5 className="fw-bold">Add to Cart: </h5>

              <div className="table-border">
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th> {/* Add a new column for the serial number */}
                      <th>QTY: </th>
                      <th>SKU: </th>
                      <th>Total: </th>
                      <th>Licenses: </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((val, index) => {
                      return (
                        <tr key={val}>
                          <td>{index + 1}</td> {/* Display the serial number */}
                          <td>{val.NVR_Quantity}</td>
                          <td>
                            {val.NVR_Name} ( +
                            {val["Hard Drive Size"].substring(0, 5)})
                          </td>
                          <td> $ {val.cart_final_price}</td>
                          <td>{val["Number of IP Licenses"]}</td>
                        </tr>
                      );
                    })}
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

      {/* Warnign Model */}

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h6> Warning ! Less Licenses than number of cameras</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to continue</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose2}>
            Go Back
          </Button>
          <Button variant="dark" onClick={() => navigate("/cameras")}>
            Continue Anyways
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Nvr;
