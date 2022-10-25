import React, {useEffect, useState} from "react";
import {Button, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
export function UserProfile() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [telephoneNumber, setTelephoneNumber] = useState("");
    const user=JSON.parse(sessionStorage.getItem("user")).id
    const navigate=useNavigate();
    function UpdateUser() {
        axios.post("http://localhost:3001/user/update-user", {
            id: user.id,
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
                    navigate("/");
                }
            })
        })

    }
    useEffect(() => {
        if(user){
            setUserName(user.name)
            setEmail(user.email)
            setTelephoneNumber(user.tp)
            setPassword(user.password)
        }

    },[])

    return (
        <div>
            <h1>Edit User Profile</h1>
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
                        <FloatingLabel
                            controlId="floatingInputCPassword"
                            label="Confirm Password"
                            className="mb-3"
                        >
                            <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="name@example.com" />
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
                </Row>


                <div className="mt-4 d-grid gap-2">
                    <Button variant="success" onClick={UpdateUser} size="lg">Update</Button>
                </div>
            </Form>


        </div >
    );
}