import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Papa from "papaparse";

function Test() {
  const [productCSV, setProductCSV] = useState([]);

  // console.log(productCSV)

  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        const response = await fetch(
          "https://platinumcctvcom.sharepoint.com/:x:/r/sites/PlatinumCCTVSecuritySolutions/_layouts/15/Doc.aspx?sourcedoc=%7B4239E008-692B-4FF0-8BB2-9C224679A7F9%7D&file=categories.csv&action=default&mobileredirect=true"
        );

        if (!response.ok) {
          throw new Error(`CSV fetch failed with status: ${response.status}`);
        }

        const csvText = await response.text();
        const parsedData = Papa.parse(csvText, { header: true }).data;
        console.log('parse data', csvText)
        setProductCSV(parsedData);
      } catch (error) {
        console.log('Error :', error)
      }
    };

    fetchCSVData();
  }, []);

  return (
    <Container>
      <h1>Testing Page</h1>

    </Container>
  );
}

export default Test;
