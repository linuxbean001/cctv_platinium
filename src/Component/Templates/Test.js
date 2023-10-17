import React, { useState, useEffect } from "react";

function Test() {
  const [select, setSelect] = useState(""); 
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchedOptions = [ 'UAE' ,"Sri Lanka", "Australia", "India", "Pakistan"];
    setOptions(fetchedOptions);
    if (fetchedOptions.length > 0) {
      setSelect(fetchedOptions[0]);
    }
  }, []);

  const handleSelectChange = (e) => {
    setSelect(e.target.value);
  };

  return (
    <>
      <h2>You Selected : {select}</h2>

      <select value={select} onChange={handleSelectChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}

export default Test;