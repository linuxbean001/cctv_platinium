import React, { useEffect } from "react";

function AddCart(props) {
  const [cartData, setCartData] = React.useState([]);
  const [cartPaper, setCartPaper] = React.useState(false);

  const [nvrDetails, setNvrDetail] = React.useState([]);
  React.useEffect(() => {
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
  });

  const showPaper = () => {
    if (cartPaper == true) {
      setCartPaper(false);
    } else {
      setCartPaper(true);
    }
  };
  const storedData = JSON.parse(localStorage.getItem("initData"));
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
          <tr></tr>
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
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
}

export default AddCart;
