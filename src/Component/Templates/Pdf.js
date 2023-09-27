import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function Pdf() {
  const pdfRef = useRef();
  function downloadPDF() {
    const capture = document.querySelector(".actual-receipt");
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      doc.addImage(imgData, "PNG", 0, 0);
      doc.save("1.pdf");
    });
  }

  return (
    <>
      <div ref={pdfRef} className="actual-receipt">
        <h1 style={{ color: "red" }}>Ravi Rathore</h1>
        <h2>This is created with PDF</h2>
      </div>

      <button onClick={downloadPDF}>Download Pdf </button>
    </>
  );
}

export default Pdf;
