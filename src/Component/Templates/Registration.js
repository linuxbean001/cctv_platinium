import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { setCustomerData } from "../../../src/app/features/counter/counterSlice";
import { useDispatch } from "react-redux";

const Registration = () => {
const dispatch = useDispatch();
const [show, setShow] = React.useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const validationSchema = Yup.object().shape({
customerName: Yup.string().required("Customer Name is required"),
businessName: Yup.string().required("Business Name is required"),
email: Yup.string().email("Invalid email").required("Email is required"),
phoneNumber: Yup.number().required("Phone Number is required"),
address: Yup.string().required("Address is required"),
});

const formik = useFormik({
initialValues: {
customerName: "",
businessName: "",
email: "",
phoneNumber: "",
address: "",
},
validationSchema,
onSubmit: (values) => {
console.log("Form submitted:", values);
dispatch(setCustomerData(values));
handleClose();
},
});

React.useEffect(() => {
handleShow();
}, []);

return (
<>
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Enter Customer Details :</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Container>
        <Row>
          <Col>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control type="text" name="customerName" placeholder="Enter Customer Name"
                value={formik.values.customerName} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.customerName && formik.errors.customerName && (
              <div className="text-danger">{formik.errors.customerName}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Business Name</Form.Label>
              <Form.Control type="text" name="businessName" placeholder="Enter Business Name"
                value={formik.values.businessName} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.businessName && formik.errors.businessName && (
              <div className="text-danger">{formik.errors.businessName}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter Email" value={formik.values.email}
                onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.email && formik.errors.email && (
              <div className="text-danger">{formik.errors.email}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="number" name="phoneNumber" placeholder="Enter Phone Number"
                value={formik.values.phoneNumber} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <div className="text-danger">{formik.errors.phoneNumber}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" name="address" placeholder="Enter Address" value={formik.values.address}
                onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.address && formik.errors.address && (
              <div className="text-danger">{formik.errors.address}</div>
              )}
              <Form.Text className="text-muted text-center fst-italic">
                We'll never share your info with anyone else.
              </Form.Text>
            </Form.Group>
            <Col className="d-flex justify-content-between">
            <Button variant="dark" type="submit">
              Submit
            </Button>
            <Button variant="dark" onClick={handleClose}>
              Skip
            </Button>
            </Col>
          </Form>
          </Col>
        </Row>
      </Container>
    </Modal.Body>
  </Modal>
</>
);
};

export default Registration;