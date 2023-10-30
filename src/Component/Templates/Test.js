import React from 'react'
import { useSelector, useDispatch } from "react-redux";

function Test() {
  const selectedNvrDetails = useSelector((state) => state.counter1.customData);
  console.log('mera redux',selectedNvrDetails)
  return (
    <div>Test</div>
  )
}

export default Test