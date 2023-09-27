import React, { useState, useEffect } from 'react';

function Test() {
  const [data, setData] = useState([]);
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Replace with the appropriate JSONPlaceholder API endpoint


let newMyArray = [];
newMyArray.push(data)

console.log(newMyArray)

  useEffect(() => {
    // Fetch data from the JSONPlaceholder API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);

      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [apiUrl]);

  return (
    <div>
      <h1>JSONPlaceholder Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Test;
