import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  apiDATA
} from "../../app/features/counter/counterSlice";
function Pdf() {
  const navigate = useNavigate();
  // Redux State
  const customerUserData = useSelector((state) => state.counter1.apiDATA);
  console.log('From Redux :' ,customerUserData);
  const Nvr = useSelector((state) => state.counter1.selectedNVR);
  const camera = useSelector((state) => state.counter1.selectedCamera);
  const cabling = useSelector((state) => state.counter1.selectedCabling);
  const labor = useSelector((state) => state.counter1.selectedLabor);
  const poe = useSelector((state) => state.counter1.selectedPoE);
  const hard = useSelector((state) => state.counter1.selectedHardWare);
  const special = useSelector((state) => state.counter1.selectedSpecial);
  const [isDownloadButtonVisible, setIsDownloadButtonVisible] = useState(false);

  const downloadPDF = () => {
    const input = document.getElementById("tableToConvert");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgHeight = (canvas.height * 210) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, 210, imgHeight);
      pdf.save("converted.pdf");
      setIsDownloadButtonVisible(true);
    });
  };

  const handleNext = () => {
    navigate("/");
  };

  // CSS for table headings
  const tableStyle = {
    fontFamily: "Arial, Helvetica, sans-serif",
    borderCollapse: "collapse",
    width: "100%",
  };

  const tableCellStyle = {
    border: "1px solid #ddd",
    padding: "8px",
  };

  const evenRowStyle = {
    backgroundColor: "#f2f2f2",
  };

  const hoverRowStyle = {
    backgroundColor: "#ddd",
  };

  const tableHeaderStyle = {
    paddingTop: "12px",
    paddingBottom: "12px",
    paddingLeft:'10px',
    textAlign: "left",
    backgroundColor: "#212529",
    color: "white",
  };



  const buttonStyle = {
    backgroundColor: "#4caf50",
    border: "none",
    color: "white",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 2px",
    cursor: "pointer",
  };

 
  const paddingTest = {
    tr: {
      /* Add other styles for the tr element here if needed */
      background: "lightgray",
    },
    td: {
      paddingLeft: "10px",
    },
  };

  return (
    <>
      <div id="tableToConvert" style={{width:'95%', backgroundColor:'', margin:'0 auto'}}>
        <div>
          <h4 style={{margin:'20px 0', padding:'0 10px'}}>Customer Details :</h4>
        </div>

        <table style={tableStyle} id="customers">
          <thead>
            <tr style={{margin:'20px 0', padding:'0 10px', backgroundColor:'red'}}>
              <th style={tableHeaderStyle}>Name</th>
              <th style={tableHeaderStyle}>Business Details</th>
              <th style={tableHeaderStyle}>Email</th>
              <th style={tableHeaderStyle}>Phone</th>
              <th style={tableHeaderStyle}>Address</th>
            </tr>
          </thead>
          <tbody>
            <tr style={paddingTest.tr} className="paddingTest">
              <td style={paddingTest.td}>{customerUserData.customerName}</td>
              <td>{customerUserData.businessName}</td>
              <td>{customerUserData.email}</td>
              <td>{customerUserData.phoneNumber}</td>
              <td>{customerUserData.address}</td>
            </tr>
          </tbody>
        </table>

        <div>
          <h4 style={{margin:'20px 0', padding:'0 10px'}}>Selected Items :</h4>
        </div>

        <table style={tableStyle} id="customers">
          <thead>
            <tr>
              <th style={tableHeaderStyle}>#</th>
              <th style={tableHeaderStyle}>Product Category</th>
              <th style={tableHeaderStyle}>Product Name</th>
              <th style={tableHeaderStyle}>Product QTY</th>
              <th style={tableHeaderStyle}>Product Base Price</th>
              <th style={tableHeaderStyle}>Product Final Price</th>
            </tr>
          </thead>
          <tbody>
                        {Nvr.map((item, index) => (
                          <tr key={index} style={paddingTest.tr} className="paddingTest" >
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
                            <td>$ {item.totalPriceForItem.toFixed(2)}</td>
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
                            <td>$ {item.poeFinalPrice.toFixed(2)}</td>
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
        </table>

       
      </div>

      <div style={{display:'flex', justifyContent:'center', margin:'20px 0'}}>
      <button onClick={downloadPDF} style={buttonStyle}>Download</button>
      </div>
    </>
  );
}

export default Pdf;
