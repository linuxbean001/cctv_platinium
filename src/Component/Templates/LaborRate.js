import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from 'react-bootstrap/Modal';
import Papa from "papaparse";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import noImage from '../../no_Image.jpg'
import Form from 'react-bootstrap/Form';


const onLineImg = 'https://images.pexels.com/photos/5703527/pexels-photo-5703527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

function LaborRate() {
  const [categoryCSV, setCategoryCSV] = useState([]); // for category csv
  const [productCSV, setProductCSV] = useState([]); // for products csv
  const [productOption, setProductOptionCSV] = useState([]); // product_options.csv data

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [count, setCount] = useState(0);

  const [test, setTest] = useState([])
  const [test2, setTest2] = useState([])
  const [thumbimg, setThumbimg] = useState([])

  //
  const [filteredData, setfilteredData] = useState([])
  const [categoryName, setCategoryName] = useState([])
  const [filteredData2, setfilteredData2] = useState([])
  const [categoryName2, setCategoryName2] = useState([])


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

      // Storing CSV data in separate state
      setCategoryCSV(products1)  
      setProductCSV(products2)
      setProductOptionCSV(products3)

    } catch (error) {
      console.error('Error parsing CSV files:', error);
    }
  };
  parseCSVFiles2();
}, []);

// 


  return (
      <>
           <Container fluid className="my-4" style={{ backgroundColor: "" }}>
        <Container>
          <Row style={{ backgroundColor: "" }}>
            <Col style={{ backgroundColor: "" }}>
              <h2>
                Labor{" "}
                <span className="fst-italic fs-6">(Category)</span>
              </h2>
            </Col>
            <Col className="" style={{ backgroundColor: "" }}>
              <Row>
                <Col className="text-end">
                  Number of Cameras : <span className="fw-bold">??</span>
                </Col>
              </Row>
              <Row>
                <Col className="text-end">

                  <Link to='/'>
                    <h6>
                      Edit here <span className="fw-bold"></span>
                    </h6>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>

            
          </Container>
          </Container>
      </>
  )
}

export default LaborRate