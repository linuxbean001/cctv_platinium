import React, { useState } from 'react'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Papa from "papaparse";
import Card from "react-bootstrap/Card";
import noImage from '../../no_Image.jpg'
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';


const onlineImage = 'https://images.pexels.com/photos/3205735/pexels-photo-3205735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

function Special() {

  const [categoryCSV, setCategoriesCSV] = useState([])
  const [productCSV, setProductCSV] = useState([])
  const [productOption, setProductOptionCSV] = useState([]); // product_options.csv data


  // Filtered Data
  const [filteredData, setfilteredData] = useState([])
  const [filteredData2, setfilteredData2] = useState([])

  //modal state
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  //category name in modal
  const [categoryName, setCategoryName] = useState([])
  const [categoryName2, setCategoryName2] = useState([])

  // sir code
  const [finalData, setFinalData] = useState([])


  // Fetching APIs data
  React.useEffect(() => {
    const parseCSVFiles2 = async () => {
      try {
        //Category CSV
        const categoryCSV = await fetch('assets/CSVs/categories.csv');
        const categoryArray1 = await categoryCSV.text();
        const products1 = Papa.parse(categoryArray1, { header: true }).data;
        //Products CSV
        const productsCSV = await fetch('assets/CSVs/products.csv');
        const categoryArray2 = await productsCSV.text();
        const products2 = Papa.parse(categoryArray2, { header: true }).data;
        // Product Options CSV
        const productOptionsCSV = await fetch('assets/CSVs/products_options.csv');
        const categoryArray3 = await productOptionsCSV.text();
        const products3 = Papa.parse(categoryArray3, { header: true }).data;



        setCategoriesCSV(products1)
        setProductCSV(products2)
        setProductOptionCSV(products3)

      } catch (error) {
        console.error('Error parsing CSV files:', error);
      }
    };
    parseCSVFiles2();
  }, []);




  // Condition-1 (search in CategoryCSV for name "Special", it is available with id "101" and "107")

  const specialData = categoryCSV.filter((item) => {
    return item.category_parent && (item.category_parent.includes('101') || item.category_parent.includes('107'));
  });



  // Category name coming from CAtegory.CSV
  const handleButtonClick = (e, category_name) => {
    setCategoryName(category_name)

    // modal-1 opens
    setShow(true)

    const specialData2 = productCSV.filter((item) => {
      if (item.categories) {
        const categoriesWords = item.categories.split('/');
        return categoriesWords.some(word => category_name == word);
      }
      return false
    });
    setfilteredData(specialData2)

  }
console.log('file data',filteredData)
  //when modal-1 open , its box click funtionality below
  function modal_1(e, id) {
    setFinalData([])
    // Inner Code
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
        if (productOption[i].productid === id || productOption[i].productid === '') {
          valuesBetween.push(productOption[i]);
        }
      }
      const separatedArrays = [];
      let currentArray = [];
      valuesBetween.forEach(item => {
        if (item.optionid !== '') {
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
      setFinalData(separatedArrays)
    } else {
      console.log("No suitable data found in the data array with '83' cateId.");
    }

    // Inner Code
    setShow2(true)
    setShow(false)
    setCategoryName2(id)
    const specialData3 = filteredData.filter((item) => {
      if (item.id == id) {
        return item
      }
    });
    setfilteredData2(specialData3)
  }

  return (
    <>
      <Container fluid className="my-4" style={{ backgroundColor: "" }}>
        <Container>
          {/* Heading */}
          <Row style={{ backgroundColor: "" }}>
            <Col style={{ backgroundColor: "" }}>
              <h2>
                Special Items{" "}
                <span className="fst-italic fs-6">(Category)</span>
              </h2>
            </Col>

          </Row>

          {/* Box*/}

          <Row className="my-4" style={{ backgroundColor: '' }}>

            {
              specialData.map((val) => {
                return (

                  <>
                    <Col md={4} className="mb-4" onClick={(e) => handleButtonClick(e, val.category_name)}>
                      <Card style={{ width: "", margin: "" }}>
                        <Card.Body>
                          <Row>
                            <Col xs={7} >
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
                              <p className="camera_category_title"> {val.category_title ? val.category_title : 'No Category Found'} </p>
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

          {/* Modal Code - 1 */}
          <Modal

            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show} onHide={() => setShow(false)}>

            <Modal.Header closeButton>
              <Modal.Title>{categoryName}</Modal.Title>

            </Modal.Header>
            <Modal.Body>
              <Row className="my-4">
                {
                  filteredData.map((item) => {
                    return (
                      <>
                        <Col md={4} className="nvr_col my-2" onClick={(e) => modal_1(e, item.id)} >
                          <Card style={{ width: "", backgroundColor: "", height: '300px' }}>
                            <Card.Body>
                              <Card.Title className="fw-bold">SKU : {item.id}</Card.Title>

                              <Card.Text>Description :  {item.name.split(' ').slice(0, 10).join(' ')}...</Card.Text>


                              <Row>
                                <Col xs={8}>
                                  <Card.Img variant="top" height={100} src={item.thumbnail ? item.thumbnail : noImage} />

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
                    )
                  })
                }


              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="dark" onClick={() => setShow(false)}>Close</Button>
            </Modal.Footer>
          </Modal>


          {/* Modal-2 */}
          <Modal

            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show2} onHide={() => setShow2(false)}>
            <Modal.Header closeButton>
              <Modal.Title>{categoryName2}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row>

                  {
                    filteredData2.map((val) => {
                      return (
                        <>
                          <Col md={5} style={{ backgroundColor: '' }}>
                            <Row>
                              <Card.Img
                                variant="top"
                                height={150}
                                src={val.thumbnail}
                              />
                            </Row>
                            <Row className="my-2">
                              <Col> <Card.Img
                                variant="top"
                                height={40}
                                className="camera_thumbnail_img"
                                src={val.image1}
                              // onClick={() => { setThumbimg({ img1: val.image1 }) }}

                              /></Col>
                              <Col> <Card.Img
                                variant="top"
                                height={40}
                                className="camera_thumbnail_img"
                                src={val.image2}
                              // onClick={() => { setThumbimg({ img1: val.image2 }) }}

                              /></Col>
                              <Col> <Card.Img
                                variant="top"
                                height={40}
                                className="camera_thumbnail_img"
                                src={val.image3}
                              // onClick={() => { setThumbimg({ img1: val.image3 }) }}

                              /></Col>
                              <Col> <Card.Img
                                variant="top"
                                height={40}
                                className="camera_thumbnail_img"
                                src={val.image4}
                              // onClick={() => { setThumbimg({ img1: val.image4 }) }}
                              /></Col>

                            </Row>

                          </Col>
                          <Col md={7}>
                            <p className='fst-italic'> <span className='fw-bold'>Description 22: </span> {val.name}
                            </p>

                            {/* Add Dropdown */}
                            {
                              finalData.map((item, index) => {
                                console.log('check',item)
                                return (
                                  <>
                                    <Form.Select key={index} aria-label="Default select example" className="mb-3">
                                      <option value={2}>{item[0].featurecaption}</option>
                                      {item.map((option, optionIndex) => (
                                        <option key={optionIndex} value={option.value}>
                                          {option.featurename}
                                        </option>
                                      ))}
                                    </Form.Select>
                                  </>
                                )
                              })
                            }

                          </Col>
                        </>
                      )
                    })
                  }





                  {/* <div className="d-flex align-items-end justify-content-end" style={{ backgroundColor: '' }}>
                              <Button variant="dark" >
                                +
                              </Button>
                              <h6 className="mx-3">100</h6>
                              <Button variant="dark">
                                -
                              </Button>
                            </div> */}

                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <div className="w-100 my-4 d-flex align-items-end justify-content-between" >

                <Button className="mx-3" variant="dark" onClick={() => setShow2(false)}>
                  Back
                </Button>
                <Button variant="dark">
                  Add
                </Button>
              </div>
            </Modal.Footer>
          </Modal>

        </Container>
      </Container>
    </>
  )
}

export default Special