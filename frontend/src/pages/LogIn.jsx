import React from "react";
import {Form, Button, FloatingLabel, Row, Col} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

export function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userName, setUserName] = useState("")
    const navigator=useNavigate()

    const LogIn = (e) => {
        axios.post("http://localhost:3001/user/login", {
            password: password,
            username: userName
        }).then((res) => {
            if(res.status===200){
                sessionStorage.setItem("user",JSON.stringify(res.data.user))
                navigator('/')
                window.location.reload()
            }else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong!',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
                }
        }).catch((err) => {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong! Try Again',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        })
    };

    return (
        <div className="d-flex flex-column px-5 ">
            <h1 className={"my-3"}>Log In</h1>
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
                            controlId="floatingInputPassword"
                            label="Password"
                            className="mb-3"
                        >
                            <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="name@example.com" />
                        </FloatingLabel>
                <div className="mt-4 d-grid gap-2">
                    <Button variant="success" onClick={LogIn} size="lg">Log In</Button>
                </div>
            </Form>
        </div>
    );
}