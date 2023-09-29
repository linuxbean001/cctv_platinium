import React, { useState, useEffect } from "react";

function Test() {
  const [data, setData] = useState([]);
  const apiUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLfB-3Bov_7YurkzIQ4N9AyRWDJ8ImKcyWMEReQGcS5q_r-Vb9gb9G0SUE04Z920kPAaHVat_OyLlG/pubhtml?gid=0&single=true"; // Replace with the appropriate JSONPlaceholder API endpoint

  useEffect(() => {
    // Fetch data from the JSONPlaceholder API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.text();
      })
      .then((jsonData) => {
        console.log("json", jsonData);

        setData(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log(data);

  return (
    <>
      <h1> Testing Page</h1>
    </>
  );
}

export default Test;
