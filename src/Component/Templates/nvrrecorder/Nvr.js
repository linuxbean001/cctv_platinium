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
import {
  setSelectedNVR,
  deleteNVR,
  setFinalData,
} from "../../../app/features/counter/counterSlice";
import Loader from "../Loader.js";

function MyVerticallyCenteredModal(props) {
  const [finalNewState, setFinalNewState] = useState({});
  const [finalNewState2, setFinalNewState2] = useState({});
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);  // Dropdown item price 1+2+3 = 6
  const [finalPrice, setFinalPrice] = useState(0);

  const [priceList, setPriceList] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  React.useEffect(() => {
    props.onTestChange1(finalNewState);
  }, [finalNewState]);

  React.useEffect(() => {
    props.onTestChange(finalNewState2);
  }, [finalNewState2]);

  React.useEffect(() => {
    setFinalNewState({
      NVR_Name: props.dataforProduct.id,
      NVR_Base_Price: props.mainPrice,
      NVR_Final_Price: priceList,
      NVR_Quantity: count,
      cart_final_price: priceList,
    });
  }, [props.dataforProduct.id, props.mainPrice, count, priceList]);

  const resetForm = () => {
    setFinalNewState({});
    setFinalNewState2({});
    setCount(1);
    setTotalPrice(0);
    setPriceList(0);
  };

  useEffect(() => {
    if (!props.show) {
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
      // console.log('selected', selectedOption)

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
    setPriceList(newTotalPrice * count);
  };

  function addNvrQuantity() {
    dispatch(setSelectedNVR(props.mergedState));
    dispatch(setFinalData(props.mergedState));
    props.onHide(false);
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

           <h2>{props.dataforProduct.price}</h2>
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
            </Col>

            <Col md={8}>
              <p>
                Description:
                {props.dataforProduct.description
                  ? props.dataforProduct.description
                  : "No Description found"}
              </p>
              <p className="fw-bold">Choose Options :</p>

              {props.finalData.map((item, index) => {
                return (
                  <>
                    <Form.Label> {item[0].featurecaption}</Form.Label>
                    <Form.Select
                      key={index}
                      aria-label="Default select example"
                      className="mb-3"
                      name={item[0].featurecaption}
                      value={finalNewState2[item[0].featurecaption] || ""}
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
          <Button
            variant="dark"
            onClick={addNvrQuantity}
            disabled={priceList === 0}
          >
            Add
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

function Nvr(props) {
  const [isLoading, setIsLoading] = useState(true); // Loader State

  const [formData1, setFormData1] = useState({});
  const [formData2, setFormData2] = React.useState({});
  const [mergedState, setMergedState] = useState({});

  const dispatch = useDispatch();
  const selectedNvrDetails = useSelector((state) => state.counter1.selectedNVR);
  const selectedCameraNumber = useSelector(
    (state) => state.counter1.totalCamera
  );

  const navigate = useNavigate();
  const [mainPrice, setMainPrice] = useState(0);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState([]);
  const [productCSV, setProductCSV] = useState([]);
  const [produtOption, setProductOptionCSV] = useState([]);
  const [addCart, setAddCart] = useState([]);
  const [recorderFilter, setRecorderFilter] = useState([]);
  const [dataforProduct, setdataForProduct] = useState([]);
  const [idforOptions, setIdforOptions] = useState([]);
  const [extra, setExtra] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => {
    if (selectedCameraNumber > calculateTotalLicenses()) {
      setShow2(true);
    } else {
      navigate("/cameras");
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    tableData.forEach((val) => {
      totalPrice += parseFloat(val.cart_final_price);
    });
    return totalPrice.toFixed(2);
  };

  const calculateTotalLicenses = () => {
    let totalLicenses = 0;
    tableData.forEach((val) => {
      totalLicenses +=
        parseInt(val["Number of IP Licenses"], 10) * val.NVR_Quantity;
    });
    return totalLicenses;
  };

  const updateMergedState = () => {
    setMergedState({
      ...formData1,
      ...formData2,
    });
  };

  useEffect(() => {}, [selectedNvrDetails]);

  const tableData = selectedNvrDetails;

  useEffect(() => {
    updateMergedState();
  }, [formData1, formData2]);

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
        setProductCSV(products);
        setProductOptionCSV(products2);
        setIsLoading(false);
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

  const recorderData = productCSV.filter((item) => {
    return item.id && item.id.includes("NVR");
  });

  const recorderData2 = produtOption.filter((item) => {
    return item.productid && item.productid.includes("NVR");
  });

  const handleButtonClick = (e, val, id) => {

    // Code Starts
    let result = [];
    let currentArray = [];
    for (let i = 0; i < produtOption.length; i++) {
      const item = produtOption[i];

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
    setFinalData(result1);
    // Code Ends

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

  function deleteFromTable(index) {
    dispatch(deleteNVR(index));
  }

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
                  NVR Recorders
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
                    Number of Licenses: &nbsp;
                    <span className="fw-bold">{calculateTotalLicenses()}</span>
                  </Col>
                </Row>
              </Col>
            </Row>

{/* Box Click */}
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
                        <th>Total: </th>
                        <th>Licenses: </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((val, index) => {
                        return (
                          <tr key={val}>
                            <td>{index + 1}</td>
                            <td>{val.NVR_Quantity}</td>
                            <td>
                              {val.NVR_Name} ( +
                              {val["Hard Drive Size"].substring(0, 5)})
                            </td>
                            <td> $ {val.cart_final_price}</td>
                            <td>{val["Number of IP Licenses"]}</td>
                            <td>
                              {" "}
                              <Button
                                variant="dark"
                                onClick={() => deleteFromTable(index)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                      <tr>
                        <th></th>
                        <td></td>
                        <td>
                          <b>Total (Price & Licenses) :</b>
                        </td>
                        <td>
                          <b>$ {calculateTotalPrice()}</b>
                        </td>
                        <td>
                          <b>{calculateTotalLicenses()} Licenses</b>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>

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
      )}

      {/* Warinng Model */}
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
