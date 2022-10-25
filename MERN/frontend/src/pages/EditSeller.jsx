import React, {useEffect} from "react";
import {Form, Button, FloatingLabel, Row, Col} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate, useSearchParams} from "react-router-dom";

export function EditSeller() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Seller");

    const [userName, setUserName] = useState("");
    const [telephoneNumber, setTelephoneNumber] = useState("");
    const navigator = useNavigate();

    useEffect(() => {
      axios.post("http://localhost:3001/user/getSingleUser", {
        id: searchParams.get("id")
      }) .then((res) => {
          console.log(res.data)
          if(res.data){
            setEmail(res.data.email);
            setUserName(res.data.username);
            setTelephoneNumber(res.data.tp);
          }
      })
    },[])

    const EditSeller = (e)=>{
        axios.post("http://localhost:3001/user/update-user", {
            id: searchParams.get("id"),
            email: email,
            username: userName,
            tp: telephoneNumber,
        }).then((res) => {
            Swal.fire({
                title: 'Success!',
                text: 'You have successfully Updated!',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigator("/");
                }
            })
        }).catch((err) => {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong!',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        })
    };

    return (

        <div className="d-flex flex-column px-5 ">
            <h1 className={"my-3"}>Edit Seller</h1>
            <Form>
                <FloatingLabel
                    controlId="floatingInputUserName"
                    label="User Name"
                    className="mb-3 "
                >
                    <Form.Control type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} placeholder="name@example.com" />
                    <Form.Control.Feedback type="invalid">
                        Please choose a username.
                    </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInputEmail"
                    label="Email Address"
                    className="mb-3"
                >
                    <Form.Control required type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" value={email} />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </FloatingLabel>
                <Row className="g-2">
                    <Col md>
                        <FloatingLabel
                            controlId="floatingInputUserName"
                            label="Telephone Number"
                            className="mb-3 "
                        >
                    <Form.Control type="text" value={telephoneNumber} onChange={(e)=>setTelephoneNumber(e.target.value)} placeholder="name@example.com" />
                    <Form.Control.Feedback type="invalid">
                        Please Enter the Number.
                    </Form.Control.Feedback>
                </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel
                            controlId="floatingSelectGrid"
                            label="Select Role"
                        >
                            <Form.Select disabled={true} aria-label="Floating label select example" onChange={(e)=>setRole(e.target.value)}>
                                <option  value="admin">Admin</option>
                                <option value="seller">Seller</option>
                                <option value="customer">Customer</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                </Row>


                <div className="mt-4 d-grid gap-2">
                    <Button variant="success" onClick={EditSeller} size="lg">Update Details</Button>
                </div>
            </Form>
        </div>
    );
}