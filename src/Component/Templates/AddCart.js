import React, { useEffect } from "react";
import { Button } from "@mui/material";
import Container from "@mui/material/Container";
import reportWebVitals from "./../../reportWebVitals";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function AddCart(props) {
  console.log(props);

  const [cartData, setCartData] = React.useState([]);
  const [cartPaper, setCartPaper] = React.useState(false);
  const [cartItem, setCartItem] = React.useState([]);
  const [nvrDetails, setNvrDetail] = React.useState([]);
  console.log("nvrState", nvrDetails);
  useEffect(() => {
    // window.localStorage.setItem("myData", JSON.stringify(props));
    if (
      !localStorage.getItem("initData") ||
      JSON.parse(localStorage.getItem("initData")).length === 0
    ) {
      window.localStorage.setItem("initData", JSON.stringify(props));
    }

    setNvrDetail(
      JSON.parse(
        JSON.parse(localStorage.getItem("persist:persist_key")).nvrInfoReducer
      )
    );

    if (props.userDetail != null) {
      setCartData({
        userDetails: props.userDetail,
        nvr_type: props.nvr_type,
        camera_Location: props.camera_Location,
        camera_number: props.camera_number,
      });
    }
  }, []);

  const showPaper = () => {
    if (cartPaper == true) {
      setCartPaper(false);
    } else {
      setCartPaper(true);
    }
  };

  const storedData = JSON.parse(localStorage.getItem("initData"));
  // console.log(storedData.userDetail[0].name);

  // console.log(JSON.parse(persist.nvrInfoReducer))

  return (
    <div>
      <h5> cart Items</h5>

      <table
        style={{
          border: "2px solid forestgreen",
          width: "800px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <tbody>
          <tr>
            <th
              style={{
                border_bottom: "1px solid black",
              }}
            >
              Name
            </th>
            <th>Business</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Camera Location</th>
            <th>Nvr Type</th>
            <th>Total Camera</th>
          </tr>
          <tr>
           
          </tr>
        </tbody>
      </table>
      <h3>NVR DETAILS</h3>
      <table
        style={{
          border: "2px solid forestgreen",
          width: "800px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <tbody>
          <tr>
            <th>Num </th>
            <th>Num 1</th>
            <th>Num 2</th>
            <th>HOD</th>
            <th>CPU</th>
            <th>Licenses</th>
          </tr>

          <tr>
           
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AddCart;
