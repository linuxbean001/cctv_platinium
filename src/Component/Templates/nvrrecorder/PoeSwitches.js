import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from 'react-bootstrap/Modal';
import "./index.css";
import Papa from "papaparse";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from "react-router-dom"


const onlineImageURL = 'https://images.pexels.com/photos/326508/pexels-photo-326508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';


// Modal-1 Starts
function MyVerticallyCenteredModal(props) {
    // Increment and Decrement
    const [count, setCount] = useState(0);
    const handleIncrement = () => {
        setCount(count + 1);
    };
    const handleDecrement = () => {
        setCount(count - 1);
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Switch :{props.heading.id}
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
                                    src={props.heading.thumb}
                                />
                            </Row>
                            <Row className="my-2">
                                <Col> <Card.Img
                                    variant="top"
                                    height={50}
                                    src={props.heading.img1}

                                /></Col>
                                <Col> <Card.Img
                                    variant="top"
                                    height={50}
                                    src={props.heading.img2}

                                /></Col>
                                <Col> <Card.Img
                                    variant="top"
                                    height={50}
                                    src={props.heading.img3}

                                /></Col>
                            </Row>
                        </Col>
                        <Col md={8}>
                            <p>{props.heading.desc}

                            </p>
                        Options:
                              
                        

                            <DropdownButton variant="dark" id="dropdown-basic-button" title="Options">
                                {props.productOption.map((options) => {
                                    if (options.featurecaption === "PoE Switch") {
                                        return (
                                            <Dropdown.Item>
                                                {options.featurename}
                                            </Dropdown.Item>
                                        )
                                    }
                                })}

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
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <Button variant="dark" onClick={props.onHide}>Back</Button>
                <Button variant="dark" onClick={props.onHide}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
}


// Modal-2 Starts
function MyVerticallyCenteredModal2(props) {
    const navigate = useNavigate();
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title> <h6> Warning ! There are not enough PoE Ports for cameras
                </h6> </Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure want to continue ?</Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <Button variant="dark" onClick={() => navigate("/cameras")}>
                    Yes
                </Button>
                <Button variant="dark" onClick={props.onHide}>
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

//Modal Ends

function PoeSwitches() {
    // Modal state-1
    const [modalShow, setModalShow] = React.useState(false);
    // Modal state-2
    const [modalShow2, setModalShow2] = React.useState(false);
    // Product CSV data
    const [productCSV, setProductCSV] = useState([])

    // Set Heading
    const [heading, setHeading] = useState([])
    //product option csv
    const [produtOption, setProductOptionCSV] = useState([])




    // Modal-2 Open
    function handleButtonClick2(e) {
        setModalShow2(true)
    }

    // Fetching APIs data
    React.useEffect(() => {
        const parseCSVFiles2 = async () => {
            try {
                //Products CSV
                const productsCSV = await fetch('assets/CSVs/products.csv');
                const categoryArray2 = await productsCSV.text();
                const products2 = Papa.parse(categoryArray2, { header: true }).data;

                const productsOtionCSV = await fetch('assets/CSVs/products_options.csv');
                const productOption2 = await productsOtionCSV.text();
                const productsOption2 = Papa.parse(productOption2, { header: true }).data;

                setProductCSV(products2)
                setProductOptionCSV(productsOption2)

            } catch (error) {
                console.error('Error parsing CSV files:', error);
            }
        };
        parseCSVFiles2();
    }, []);

    // Filter Condition

    const poeSwitchData = productCSV.filter((item) => {

        if (item.categories) {
            const categoriesWords = item.categories.split('/');
            return categoriesWords.some(word => word === 'PoE Switches');
        }
        return false
    });

    // console.log( 'switch data',poeSwitchData)

    // Modal-1 Open
    function handleButtonClick(e, val) {
        setModalShow(true)
        setHeading({ id: val.id, thumb: val.thumbnail, img1: val.image1, img1: val.image1, img2: val.image2, img3: val.image3, desc: val.description })
    }

    return (
        <>
            <Container fluid className="my-4" style={{ backgroundColor: "" }}>
                <Container>
                    <Row style={{ backgroundColor: "" }}>
                        <Col style={{ backgroundColor: "" }}>
                            <h2>
                                POEs Switches{" "}
                                <span className="fst-italic fs-6">(Category)</span>
                            </h2>
                        </Col>
                        {/* Right */}
                        <Col className="" style={{ backgroundColor: "" }}>
                            <Row>
                                <Col className="text-end">
                                    Total Number of Cameras : <span className="fw-bold">??</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-end">
                                    <h6>
                                        Toal Number of Ports : <span className="fw-bold">??</span>
                                    </h6>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    {/* Box Row */}
                    <Row className="my-4">

                        {
                            poeSwitchData.map((val) => {

                                //   console.log(val)
                                return (
                                    <>
                                        <Col md={4} className="nvr_col" onClick={(e) => handleButtonClick(e, val)}>
                                            <Card style={{ width: "", margin: "" }}>
                                                <Card.Body>
                                                    <Card.Title className="fw-bold">SKU : {val.id}</Card.Title>
                                                    <p className="category_para">{val.categories}</p>
                                                    <Card.Text>
                                                        {" "}
                                                        {
                                                            val.name.substring(0, 60) + '...'
                                                        }
                                                    </Card.Text>
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
                                                            ${val.price}
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </>
                                )
                            })
                        }

                    </Row>

                    {/* Table */}
                    <Row className="my-4" style={{ padding: "8px" }}>
                        <Col style={{}}>
                            <div className="table-border">
                                <Table striped hover>
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <td>Adding to Cart</td>
                                            <td>QTY</td>
                                            <td>SKU</td>
                                            <td>Description</td>
                                            <td>Total:</td>
                                            <td>Licenses:</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>QTY</td>
                                            <td>SKU</td>
                                            <td>Description</td>
                                            <td>Total:</td>
                                            <td>Licenses:</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>QTY</td>
                                            <td>SKU</td>
                                            <td>Description</td>
                                            <td>Total:</td>
                                            <td>Licenses:</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>Total:</td>
                                            <td>Total:</td>
                                            <td>Licenses:</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>

                    {/* Button */}
                    <Row className="my-4" style={{ backgroundColor: "" }}>
                        <Col className="d-flex justify-content-between">

                            <Button className="poe_next_btn" variant="dark" onClick={(e) => handleButtonClick2(e)} >Next</Button>
                        </Col>
                    </Row>
                </Container>
            </Container>


            <MyVerticallyCenteredModal
                show={modalShow}
                heading={heading}
                productOption={produtOption}
                onHide={() => setModalShow(false)}
            />

            <MyVerticallyCenteredModal2
                show={modalShow2}
                onHide={() => setModalShow2(false)}
            />
        </>
    )
}

export default PoeSwitches