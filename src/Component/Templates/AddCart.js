import React from "react";
import { Button } from "@mui/material";
import Container from "@mui/material/Container";

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
  console.log(props.data[0].cardData);
  const [cartPaper, setCartPaper] = React.useState(false);

  const showPaper = () => {
    if (cartPaper == true) {
      setCartPaper(false);
    } else {
      setCartPaper(true);
    }
  };

  const itrateData = () => {
    for (let i = 0; i <= props.data.data.length; i++) {
      console.log("item", props.data.data[i]);
    }
  };
  return (
    <div>
      <Button onClick={showPaper}>Check Cart Item </Button>
      {cartPaper && (
        <Container
          style={{
            boxShadow: "10px 10px 10px #6a6363",
            border: "2px solid black",
            background: "#f6fcff",
          }}
        >
          <h5> cart Items</h5>
          <table>
            <tr>
              <th>Name</th>
              <th>Business</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Camera Location</th>
            </tr>
            <tr>
              <td>{props.data[0].cardData.name}</td>
              <td>{props.data[0].cardData.business}</td>
              <td>{props.data[0].cardData.phone}</td>
              <td>{props.data[0].cardData.email}</td>
              <td>{props.data[0].cardData.address}</td>
            </tr>
          </table>
        </Container>
      )}
    </div>
  );
}

export default AddCart;
