import React, { useState } from 'react'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Papa from "papaparse";
import Card from "react-bootstrap/Card";
import noImage from '../../no_Image.jpg'

const onlineImage = 'https://images.pexels.com/photos/3205735/pexels-photo-3205735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

function Special() {

  const [categoryCSV, setCategoriesCSV] = useState([])
  const [productCSV, setProductCSV] = useState([])

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

        setCategoriesCSV(products1)
        setProductCSV(products2)
      } catch (error) {
        console.error('Error parsing CSV files:', error);
      }
    };
    parseCSVFiles2();
  }, []);

  // Filter Condition
  const filteredData = ['Adapters', 'Cable Management', 'Connectors', 'Displays', 'Enclosures', 'Extenders', 'Mounts', 'Power Supplies']
  const filteredData2 = categoryCSV.filter((val) => {
    return filteredData.includes(val.category_name)
  })

  // Handle Click

  const handleButtonClick = (e, category_name) => {
  }

  console.log(filteredData2)
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
              filteredData2.map((val) => {
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
        </Container>
      </Container>
    </>
  )
}

export default Special