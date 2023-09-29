import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Pdf() {
  const navigate = useNavigate();
  // const customerData = useSelector((state) => state.counter.customerData) || {};
  // console.log(customerData);

  const Nvr = useSelector((state) => state.counter1.selectedNVR);
  const camera = useSelector((state) => state.counter1.selectedCamera);
  const cabling = useSelector((state) => state.counter1.selectedCabling);
  const labor = useSelector((state) => state.counter1.selectedLabor);
  const poe = useSelector((state) => state.counter1.selectedPoE);
  const hard = useSelector((state) => state.counter1.selectedHardWare);
  const special = useSelector((state) => state.counter1.selectedSpecial);
  console.log("special", hard.length);

  const downloadPDF = () => {
    const input = document.getElementById("tableToConvert");
    const downloadButton = document.getElementById("downloadButton");
    const downloadButtons = document.getElementById("downloadButtons");

    downloadButton.style.display = "none";
    downloadButtons.style.display = "none";

    const pdfWidth = 210;
    const pdfHeight = 297; 

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); 
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
      pdf.save("converted.pdf");
      downloadButton.style.display = "block";
      downloadButtons.style.display = "block";

    });
  };

  const handleNext = () =>{
     navigate("/")
  }

  return (
    <div className="p-3">
      <div id="tableToConvert">
        <div className="border border-indigo-600 mt-5">
          <Container fluid style={{ backgroundColor: "#21252938" }}>
            <h2>Platinum CCTV</h2>
          </Container>
          <div>
            <Container fluid>
              <Row className="my-4">
                <Col>
                  <h5 className="fw-bold">Items</h5>
                  <div>
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Product Category:</th>
                          <th>Product Name:</th>
                          <th>Product QTY:</th>
                          <th>Product Base_Price: </th>
                          <th>Product Final_Price: </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Nvr.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>NVR</td>
                            <td>{item.NVR_Name}</td>
                            <td>{item.NVR_Quantity}</td>
                            <td>$ {item.NVR_Base_Price}</td>
                            <td>$ {item.NVR_Final_Price}</td>
                          </tr>
                        ))}
                        {camera.map((item, index) => (
                          <tr key={index}>
                            <td>{Nvr.length + index + 1}</td>
                            <td>Camera</td>
                            <td>{item.Camera_Name}</td>
                            <td>{item.Camera_Quantity}</td>
                            <td>$ {item.Camera_Base_Price}</td>
                            <td>$ {item.Camera_Final_Price}</td>
                          </tr>
                        ))}
                        {cabling.map((item, index) => (
                          <tr key={index}>
                            <td>{Nvr.length + camera.length + index + 1}</td>
                            <td>Cabling</td>
                            <td>{item.id}</td>
                            <td>{item.quantity}</td>
                            <td>$ {item.pricePerItem}</td>
                            <td>$ {item.totalPriceForItem}</td>
                          </tr>
                        ))}
                        {labor.map((item, index) => (
                          <tr key={index}>
                            <td>
                              {Nvr.length +
                                camera.length +
                                cabling.length +
                                index +
                                1}
                            </td>
                            <td>Labor</td>
                            <td>{item.id}</td>
                            <td>{item.quantity}</td>
                            <td>$ {item.pricePerItem}</td>
                            <td>$ {item.totalPriceForItem}</td>
                          </tr>
                        ))}
                        {poe.map((item, index) => (
                          <tr key={index}>
                            <td>
                              {Nvr.length +
                                camera.length +
                                cabling.length +
                                labor.length +
                                index +
                                1}
                            </td>
                            <td>Poe</td>
                            <td>{item.Port_Name}</td>
                            <td>{item.Port_Quantity}</td>
                            <td>$ {item.Port_Base_Price}</td>
                            <td>$ {item.poeFinalPrice}</td>
                          </tr>
                        ))}
                        {special.map((item, index) => (
                          <tr key={index}>
                            <td>
                              {Nvr.length +
                                camera.length +
                                cabling.length +
                                labor.length +
                                poe.length +
                                index +
                                1}
                            </td>
                            <td>Special</td>
                            <td>{item.id}</td>
                            <td>{item.quantity}</td>
                            <td>$ {item.pricePerItem}</td>
                            <td>$ {item.totalPriceForItem}</td>
                          </tr>
                        ))}
                        {hard.HardWare_Final_Price && (
                          <tr>
                            <td>
                              {" "}
                              {Nvr.length +
                                camera.length +
                                cabling.length +
                                labor.length +
                                poe.length +
                                special.length +
                                +1}
                            </td>
                            <td>Hardware</td>
                            <td>{hard.HardWare_Name}</td>
                            <td>{hard.HardWare_Quantity}</td>
                            <td>$ {hard.HardWare_Base_Price}</td>
                            <td>$ {hard.HardWare_Final_Price}</td>
                          </tr>
                        )}
                        {/* <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                              <b>Total Price</b>
                            </td>
                            <td>
                              <b>$</b>{" "}
                            </td>
                          </tr> */}
                      </tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <Container className="d-flex justify-content-center mb-5">
            <Button id="downloadButton" variant="dark" onClick={downloadPDF}>
              Download
            </Button>
          </Container>
          <Row className="my-4" style={{ backgroundColor: "", marginRight:"15px" }}>
            <Col className="d-flex justify-content-end">
              <Button variant="dark" onClick={handleNext} id="downloadButtons">
                Next
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Pdf;
